'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmationToCustomer, sendBookingNotificationToAdmin } from '@/lib/email'
import { SERVICES, LOCATIONS, TIME_SLOTS } from '@/lib/constants'
import { guardSubmission, describeError } from '@/lib/form-guard'

// Most booking requests one email address can make in 24 hours. Stops the form being used
// to flood someone else's inbox with confirmation emails.
const MAX_BOOKINGS_PER_EMAIL_PER_DAY = 3

const schema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6).max(20),
  locationId: z.string().min(1),
  serviceId: z.string().min(1),
  date: z.string().min(1).refine((d) => {
    const parsed = new Date(d)
    const today = new Date(); today.setHours(0,0,0,0)
    return !isNaN(parsed.getTime()) && parsed >= today
  }, { message: 'Please select a valid future date.' }),
  timeSlot: z.enum(TIME_SLOTS),
  notes: z.string().max(1000).optional(),
})

type BookingResult =
  | { success: true; reference: string }
  | { success: false; error: string }

export async function submitBooking(
  _prev: BookingResult | null,
  formData: FormData
): Promise<BookingResult> {
  const guard = await guardSubmission('booking', formData)
  if (!guard.ok) {
    // A caught bot is told it worked, with a throwaway reference, so it doesn't learn it was spotted.
    return guard.silent
      ? { success: true, reference: 'PENDING' }
      : { success: false, error: guard.error ?? 'Please try again.' }
  }

  const parsed = schema.safeParse({
    customerName: formData.get('customerName'),
    customerEmail: formData.get('customerEmail'),
    customerPhone: formData.get('customerPhone'),
    locationId: formData.get('locationId'),
    serviceId: formData.get('serviceId'),
    date: formData.get('date'),
    timeSlot: formData.get('timeSlot'),
    notes: formData.get('notes') || undefined,
  })

  if (!parsed.success) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  const { customerName, customerEmail, customerPhone, locationId, serviceId, date, timeSlot, notes } =
    parsed.data

  const service = SERVICES.find((s) => s.slug === serviceId)
  const location = LOCATIONS.find((l) => l.id === locationId)

  if (!service || !location) {
    return { success: false, error: 'Invalid service or location selected.' }
  }

  try {
    const recent = await prisma.booking.count({
      where: {
        customerEmail: { equals: customerEmail, mode: 'insensitive' },
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    })
    if (recent >= MAX_BOOKINGS_PER_EMAIL_PER_DAY) {
      return {
        success: false,
        error: 'We already have several booking requests from this email address today. Please call us to arrange anything further.',
      }
    }

    let dbLocation = await prisma.location.findUnique({ where: { slug: locationId } })
    if (!dbLocation) {
      dbLocation = await prisma.location.create({
        data: {
          name: location.name,
          slug: location.id,
          phone: location.phone,
          address: location.address,
          email: location.email,
          isHeadOffice: location.isHeadOffice,
        },
      })
    }

    let dbService = await prisma.service.findUnique({ where: { slug: serviceId } })
    if (!dbService) {
      dbService = await prisma.service.create({
        data: {
          name: service.name,
          slug: service.slug,
          shortDescription: service.shortDescription,
          category: service.category,
        },
      })
    }

    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        notes,
        date: new Date(date),
        timeSlot,
        locationId: dbLocation.id,
        serviceId: dbService.id,
      },
    })

    const formattedDate = new Date(date).toLocaleDateString('en-AU', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const emailResults = await Promise.allSettled([
      sendBookingConfirmationToCustomer({
        customerName,
        customerEmail,
        service: service.name,
        location: location.name,
        date: formattedDate,
        time: timeSlot,
        bookingRef: booking.reference,
      }),
      sendBookingNotificationToAdmin({
        customerName,
        customerEmail,
        customerPhone,
        service: service.name,
        location: location.name,
        date: formattedDate,
        time: timeSlot,
        notes,
        bookingRef: booking.reference,
      }),
    ])

    // The booking is saved either way; make a failed email visible in the logs instead of silent.
    const labels = ['customer confirmation', 'admin notification']
    emailResults.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.error(`[booking] ${labels[i]} email failed`, { reference: booking.reference, error: describeError(result.reason) })
      }
    })

    return { success: true, reference: booking.reference }
  } catch {
    return { success: false, error: 'Failed to create booking. Please call us directly.' }
  }
}

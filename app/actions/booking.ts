'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmationToCustomer, sendBookingNotificationToAdmin } from '@/lib/email'
import { SERVICES, LOCATIONS } from '@/lib/constants'
import { headers } from 'next/headers'
import { bookingLimiter } from '@/lib/rate-limit'

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
  timeSlot: z.string().min(1),
  notes: z.string().max(1000).optional(),
})

type BookingResult =
  | { success: true; reference: string }
  | { success: false; error: string }

export async function submitBooking(
  _prev: BookingResult | null,
  formData: FormData
): Promise<BookingResult> {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') ?? 'unknown'

  const { success: allowed } = bookingLimiter.check(10, ip)
  if (!allowed) {
    return { success: false, error: 'Too many requests. Please try again in a minute.' }
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

    await Promise.allSettled([
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

    return { success: true, reference: booking.reference }
  } catch {
    return { success: false, error: 'Failed to create booking. Please call us directly.' }
  }
}

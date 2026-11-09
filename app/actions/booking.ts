'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendBookingReceivedToCustomer, sendBookingNotificationToAdmin } from '@/lib/email'
import { SERVICES, LOCATIONS, TIME_SLOTS } from '@/lib/constants'
import { todayInCanberra, latestBookingDate, isRealDate } from '@/lib/dates'
import { screenSubmission, checkRateLimit, describeError } from '@/lib/form-guard'
import {
  type FieldErrors,
  type FormValues,
  FIX_FIELDS_MESSAGE,
  fieldErrorsFrom,
  readValues,
  text,
} from '@/lib/form-state'

// Most booking requests one email address can make in 24 hours. Stops the form being used
// to flood someone else's inbox with acknowledgement emails.
const MAX_BOOKINGS_PER_EMAIL_PER_DAY = 3

const FIELDS = ['customerName', 'customerPhone', 'customerEmail', 'locationId', 'serviceId', 'date', 'timeSlot', 'notes']

const schema = z.object({
  customerName: z
    .string()
    .min(2, 'Please enter your full name')
    .max(100, 'Please keep your name under 100 characters')
    // Anything a real name or business contact might contain, but no control characters or markup.
    .refine((n) => !/[<>\p{Cc}]/u.test(n), { message: 'Please remove any < or > characters from your name' }),
  customerEmail: z
    .string()
    .max(254, 'Please enter a valid email address, like jane@company.com.au')
    .email('Please enter a valid email address, like jane@company.com.au')
    // Stored in lower case so the "3 requests per day" limit cannot be dodged with Jane@ vs jane@.
    .transform((e) => e.toLowerCase()),
  customerPhone: z
    .string()
    .max(20, 'Please keep your phone number under 20 characters')
    .regex(/^\+?[\d\s()-]+$/, 'Please use only numbers, spaces, + ( ) and - in your phone number')
    .refine((p) => p.replace(/\D/g, '').length >= 8, {
      message: 'Please enter a phone number we can reach you on, with the area code',
    }),
  locationId: z.string().min(1, 'Please choose a location'),
  serviceId: z.string().min(1, 'Please choose a service'),
  date: z
    .string()
    .refine(isRealDate, { message: 'Please choose a real date' })
    .refine((d) => !isRealDate(d) || d >= todayInCanberra(), { message: 'Please choose today or a later date' })
    .refine((d) => !isRealDate(d) || d <= latestBookingDate(), {
      message: 'Please choose a date within the next 12 months, or call us for longer-term arrangements',
    }),
  timeSlot: z.enum(TIME_SLOTS, 'Please choose a time'),
  notes: z.string().max(1000, 'Please keep your notes under 1,000 characters').optional(),
})

type BookingResult =
  | { success: true; reference: string }
  | { success: false; error?: string; fieldErrors?: FieldErrors; values?: FormValues }

export async function submitBooking(_prev: BookingResult | null, formData: FormData): Promise<BookingResult> {
  const values = readValues(formData, FIELDS)

  const screen = screenSubmission(formData)
  if (!screen.ok) {
    // A caught bot is told it worked, with a throwaway reference, so it doesn't learn it was spotted.
    return screen.silent
      ? { success: true, reference: 'PENDING' }
      : { success: false, error: screen.error ?? 'Please try again.', values }
  }

  const parsed = schema.safeParse({
    customerName: text(formData, 'customerName'),
    customerEmail: text(formData, 'customerEmail'),
    customerPhone: text(formData, 'customerPhone'),
    locationId: text(formData, 'locationId'),
    serviceId: text(formData, 'serviceId'),
    date: text(formData, 'date'),
    timeSlot: text(formData, 'timeSlot'),
    notes: text(formData, 'notes') || undefined,
  })

  if (!parsed.success) {
    return { success: false, error: FIX_FIELDS_MESSAGE, fieldErrors: fieldErrorsFrom(parsed.error), values }
  }

  const { customerName, customerEmail, customerPhone, locationId, serviceId, date, timeSlot, notes } =
    parsed.data

  const service = SERVICES.find((s) => s.slug === serviceId)
  const location = LOCATIONS.find((l) => l.id === locationId)

  if (!service || !location) {
    const fieldErrors: FieldErrors = {}
    if (!location) fieldErrors.locationId = 'Please choose one of the locations listed'
    if (!service) fieldErrors.serviceId = 'Please choose one of the services listed'
    return { success: false, error: FIX_FIELDS_MESSAGE, fieldErrors, values }
  }

  const limit = await checkRateLimit('booking')
  if (!limit.ok) return { success: false, error: limit.error, values }

  try {
    const recent = await prisma.booking.count({
      where: {
        customerEmail: { equals: customerEmail, mode: 'insensitive' },
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    })
    if (recent >= MAX_BOOKINGS_PER_EMAIL_PER_DAY) {
      const message =
        'We already have several booking requests from this email address today. Please call us to arrange anything further.'
      return { success: false, error: message, fieldErrors: { customerEmail: message }, values }
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

    // The date is a calendar day stored as midnight UTC, so format it in UTC or it can shift by a day.
    const formattedDate = new Date(date).toLocaleDateString('en-AU', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
    })

    const emailResults = await Promise.allSettled([
      sendBookingReceivedToCustomer({
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
    const labels = ['customer acknowledgement', 'admin notification']
    emailResults.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.error(`[booking] ${labels[i]} email failed`, { reference: booking.reference, error: describeError(result.reason) })
      }
    })

    return { success: true, reference: booking.reference }
  } catch (error) {
    console.error('[booking] could not create the booking', describeError(error))
    return { success: false, error: 'Failed to create booking. Please call us directly.', values }
  }
}

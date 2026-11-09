'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendContactEmail } from '@/lib/email'
import { screenSubmission, checkRateLimit, describeError } from '@/lib/form-guard'
import { CONTACT_SUBJECTS } from '@/lib/constants'
import {
  type ActionResult,
  FIX_FIELDS_MESSAGE,
  fieldErrorsFrom,
  readValues,
  text,
} from '@/lib/form-state'

const FIELDS = ['name', 'email', 'phone', 'subject', 'message']

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name').max(100, 'Please keep your name under 100 characters'),
  email: z.string().email('Please enter a valid email address, like jane@company.com.au'),
  phone: z.string().max(20, 'Please keep your phone number under 20 characters').optional(),
  subject: z.enum(CONTACT_SUBJECTS, 'Please choose a subject'),
  message: z
    .string()
    .min(10, 'Please write at least 10 characters so we know how to help')
    .max(2000, 'Please keep your message under 2,000 characters'),
})

export async function submitContact(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const values = readValues(formData, FIELDS)

  const screen = screenSubmission(formData)
  if (!screen.ok) return screen.silent ? { success: true } : { success: false, error: screen.error, values }

  const parsed = schema.safeParse({
    name: text(formData, 'name'),
    email: text(formData, 'email'),
    phone: text(formData, 'phone') || undefined,
    subject: text(formData, 'subject'),
    message: text(formData, 'message'),
  })
  if (!parsed.success) {
    return { success: false, error: FIX_FIELDS_MESSAGE, fieldErrors: fieldErrorsFrom(parsed.error), values }
  }

  const limit = await checkRateLimit('contact')
  if (!limit.ok) return { success: false, error: limit.error, values }

  // 1. Save first, so the enquiry survives even if the email can't be sent.
  let enquiryId: string | null = null
  try {
    const { name, email, phone, subject, message } = parsed.data
    const row = await prisma.enquiry.create({ data: { name, email, phone: phone ?? null, subject, message } })
    enquiryId = row.id
  } catch (error) {
    console.error('[contact] could not save the enquiry', describeError(error))
  }

  // 2. Email the office, and record whether it worked.
  let emailError: string | null = null
  try {
    await sendContactEmail(parsed.data)
  } catch (error) {
    emailError = describeError(error)
    console.error('[contact] notification email failed', { enquiryId, error: emailError })
  }

  if (enquiryId) {
    await prisma.enquiry
      .update({ where: { id: enquiryId }, data: { emailSent: !emailError, emailError } })
      .catch((error) => console.error('[contact] could not record the email result', describeError(error)))
  }

  // Only a failure if the message was neither saved nor emailed.
  if (!enquiryId && emailError) {
    return { success: false, error: 'Failed to send message. Please call us directly.', values }
  }
  return { success: true }
}

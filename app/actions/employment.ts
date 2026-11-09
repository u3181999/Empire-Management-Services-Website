'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendContactEmail } from '@/lib/email'
import { screenSubmission, checkRateLimit, describeError } from '@/lib/form-guard'
import { SECURITY_CLEARANCES, SHIFT_OPTIONS, WORK_DAYS } from '@/lib/constants'
import {
  type ActionResult,
  FIX_FIELDS_MESSAGE,
  fieldErrorsFrom,
  readValues,
  text,
} from '@/lib/form-state'

const SINGLES = ['name', 'phone', 'email', 'startDate', 'shift', 'citizen', 'clearance', 'hasExperience', 'message', 'privacyConsent']
const MULTIS = ['days']

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name').max(100, 'Please keep your name under 100 characters'),
  email: z.string().email('Please enter a valid email address, like jane@example.com'),
  phone: z
    .string()
    .min(6, 'Please enter a phone number we can reach you on')
    .max(20, 'Please keep your phone number under 20 characters'),
  days: z.array(z.enum(WORK_DAYS)).min(1, 'Please choose at least one day you can work'),
  shift: z.enum(SHIFT_OPTIONS, 'Please choose a preferred shift'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose the date you could start'),
  citizen: z.enum(['Yes', 'No'], 'Please say whether you are an Australian citizen'),
  clearance: z.enum(SECURITY_CLEARANCES, 'Please choose your highest security clearance'),
  hasExperience: z.string().optional(),
  message: z.string().max(1000, 'Please keep this under 1,000 characters').optional(),
  privacyConsent: z
    .preprocess((v) => v === 'true', z.boolean())
    .refine((v) => v === true, { message: 'Please tick the box to accept the privacy policy' }),
})

export async function submitEmploymentApplication(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const values = readValues(formData, SINGLES, MULTIS)

  const screen = screenSubmission(formData)
  if (!screen.ok) return screen.silent ? { success: true } : { success: false, error: screen.error, values }

  const parsed = schema.safeParse({
    name: text(formData, 'name'),
    email: text(formData, 'email'),
    phone: text(formData, 'phone'),
    days: formData.getAll('days').filter((d): d is string => typeof d === 'string'),
    shift: text(formData, 'shift'),
    startDate: text(formData, 'startDate'),
    citizen: text(formData, 'citizen'),
    clearance: text(formData, 'clearance'),
    hasExperience: text(formData, 'hasExperience') || undefined,
    message: text(formData, 'message') || undefined,
    privacyConsent: text(formData, 'privacyConsent'),
  })
  if (!parsed.success) {
    return { success: false, error: FIX_FIELDS_MESSAGE, fieldErrors: fieldErrorsFrom(parsed.error), values }
  }

  const limit = await checkRateLimit('employment')
  if (!limit.ok) return { success: false, error: limit.error, values }

  const { name, email, phone, days, shift, startDate, citizen, clearance, hasExperience, message } = parsed.data
  const daysAvailable = days.join(', ')

  // 1. Save first, so the application survives even if the email can't be sent.
  let applicationId: string | null = null
  try {
    const row = await prisma.jobApplication.create({
      data: {
        name,
        email,
        phone,
        shift,
        days: daysAvailable,
        startDate,
        citizen,
        clearance,
        hasExperience: hasExperience === 'yes',
        message: message ?? null,
      },
    })
    applicationId = row.id
  } catch (error) {
    console.error('[employment] could not save the application', describeError(error))
  }

  // 2. Email the office, and record whether it worked.
  let emailError: string | null = null
  try {
    await sendContactEmail({
      name,
      email,
      phone,
      subject: `Employment Application — ${name}`,
      message: [
        `Phone: ${phone}`,
        `Days Available: ${daysAvailable}`,
        `Preferred Shift: ${shift}`,
        `Available Start Date: ${startDate}`,
        `Australian Citizen: ${citizen}`,
        `Highest Security Clearance: ${clearance}`,
        `Previous Experience: ${hasExperience === 'yes' ? 'Yes' : 'No'}`,
        message ? `\nAdditional Info:\n${message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })
  } catch (error) {
    emailError = describeError(error)
    console.error('[employment] notification email failed', { applicationId, error: emailError })
  }

  if (applicationId) {
    await prisma.jobApplication
      .update({ where: { id: applicationId }, data: { emailSent: !emailError, emailError } })
      .catch((error) => console.error('[employment] could not record the email result', describeError(error)))
  }

  // Only a failure if the application was neither saved nor emailed.
  if (!applicationId && emailError) {
    return { success: false, error: 'Failed to submit application. Please email us directly.', values }
  }
  return { success: true }
}

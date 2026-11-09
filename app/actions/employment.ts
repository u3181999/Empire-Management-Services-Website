'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendContactEmail } from '@/lib/email'
import { guardSubmission, describeError } from '@/lib/form-guard'
import { SECURITY_CLEARANCES } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  shift: z.enum(['AM', 'PM', 'Either']),
  startDate: z.string().min(1),
  citizen: z.enum(['Yes', 'No']),
  clearance: z.enum(SECURITY_CLEARANCES),
  hasExperience: z.string().optional(),
  message: z.string().max(1000).optional(),
  days: z.union([z.string(), z.array(z.string())]).optional(),
  privacyConsent: z
    .preprocess((v) => v === 'true' || v === true, z.boolean())
    .refine((v) => v === true, { message: 'You must accept the privacy policy.' }),
})

export async function submitEmploymentApplication(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const guard = await guardSubmission('employment', formData)
  if (!guard.ok) return guard.silent ? { success: true } : { success: false, error: guard.error }

  const days = formData.getAll('days')

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    shift: formData.get('shift'),
    startDate: formData.get('startDate'),
    citizen: formData.get('citizen'),
    clearance: formData.get('clearance'),
    hasExperience: formData.get('hasExperience') || undefined,
    message: formData.get('message') || undefined,
    days,
    privacyConsent: formData.get('privacyConsent'),
  })

  if (!parsed.success) {
    return { success: false, error: 'Please check your form entries and try again.' }
  }

  const { name, email, phone, shift, startDate, citizen, clearance, hasExperience, message } = parsed.data
  const daysAvailable = days.length > 0 ? days.join(', ') : 'Not specified'

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
    return { success: false, error: 'Failed to submit application. Please email us directly.' }
  }
  return { success: true }
}

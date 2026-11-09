'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendContactEmail } from '@/lib/email'
import { guardSubmission, describeError } from '@/lib/form-guard'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(2000),
})

export async function submitContact(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const guard = await guardSubmission('contact', formData)
  if (!guard.ok) return guard.silent ? { success: true } : { success: false, error: guard.error }

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    return { success: false, error: 'Please check your form entries and try again.' }
  }

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
    return { success: false, error: 'Failed to send message. Please call us directly.' }
  }
  return { success: true }
}

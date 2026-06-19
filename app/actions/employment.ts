'use server'

import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'
import { headers } from 'next/headers'
import { contactLimiter } from '@/lib/rate-limit'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  shift: z.enum(['AM', 'PM', 'Either']),
  startDate: z.string().min(1),
  hasExperience: z.string().optional(),
  message: z.string().max(1000).optional(),
  days: z.union([z.string(), z.array(z.string())]).optional(),
})

export async function submitEmploymentApplication(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') ?? 'unknown'

  const { success: allowed } = contactLimiter.check(5, ip)
  if (!allowed) {
    return { success: false, error: 'Too many requests. Please try again in a minute.' }
  }

  const days = formData.getAll('days')

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    shift: formData.get('shift'),
    startDate: formData.get('startDate'),
    hasExperience: formData.get('hasExperience') || undefined,
    message: formData.get('message') || undefined,
    days,
  })

  if (!parsed.success) {
    return { success: false, error: 'Please check your form entries and try again.' }
  }

  const { name, email, phone, shift, startDate, hasExperience, message } = parsed.data
  const daysAvailable = Array.isArray(days) ? days.join(', ') : (days ?? 'Not specified')

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
        `Previous Experience: ${hasExperience === 'yes' ? 'Yes' : 'No'}`,
        message ? `\nAdditional Info:\n${message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to submit application. Please email us directly.' }
  }
}

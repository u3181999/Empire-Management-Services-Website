'use server'

import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'
import { headers } from 'next/headers'
import { contactLimiter } from '@/lib/rate-limit'

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
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') ?? 'unknown'

  const { success: allowed } = contactLimiter.check(5, ip)
  if (!allowed) {
    return { success: false, error: 'Too many requests. Please try again in a minute.' }
  }

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

  try {
    await sendContactEmail(parsed.data)
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to send message. Please call us directly.' }
  }
}

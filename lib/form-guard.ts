import { createHmac } from 'node:crypto'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { COMPANY } from '@/lib/constants'
import { HONEYPOT_FIELD, STARTED_FIELD } from '@/lib/form-guard-fields'

// Anti-spam for the public forms (contact, booking, employment).
//   1. Honeypot — a field real people never see; bots fill it in.
//   2. Fill time — a person needs a moment to type; a bot submits instantly.
//   3. Rate limit — counted in the database so it works across serverless instances
//      (an in-memory counter resets whenever the function cold-starts).
// Only a one-way hash of the visitor's IP is stored, never the IP itself.

export type FormKind = 'contact' | 'booking' | 'employment'

const MIN_FILL_MS = 2_000

const LIMITS: Record<FormKind, { max: number; windowMs: number }> = {
  contact: { max: 5, windowMs: 60 * 60 * 1000 },
  booking: { max: 5, windowMs: 60 * 60 * 1000 },
  employment: { max: 3, windowMs: 60 * 60 * 1000 },
}

export type GuardResult = { ok: true } | { ok: false; silent: boolean; error?: string }

async function clientIpHash() {
  const h = await headers()
  const ip =
    h.get('x-real-ip') ?? h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? 'dev-only-salt'
  return createHmac('sha256', secret).update(ip).digest('hex').slice(0, 32)
}

export async function guardSubmission(kind: FormKind, formData: FormData): Promise<GuardResult> {
  // 1. Honeypot: pretend it worked so the bot doesn't learn it was caught.
  if (String(formData.get(HONEYPOT_FIELD) ?? '').trim() !== '') return { ok: false, silent: true }

  // 2. Fill time (the form stamps itself when it loads in the browser).
  const age = Date.now() - Number(formData.get(STARTED_FIELD))
  if (!Number.isFinite(age) || age < 0) {
    return {
      ok: false,
      silent: false,
      error: `Something went wrong sending the form. Please try again, or call us on ${COMPANY.phone}.`,
    }
  }
  if (age < MIN_FILL_MS) {
    return { ok: false, silent: false, error: 'That was very quick — please check your details and submit again.' }
  }

  // 3. Rate limit. If the database check itself fails we let the visitor through:
  //    losing a real enquiry is worse than letting one spam message by.
  try {
    const { max, windowMs } = LIMITS[kind]
    const ipHash = await clientIpHash()
    const recent = await prisma.formHit.count({
      where: { kind, ipHash, createdAt: { gte: new Date(Date.now() - windowMs) } },
    })
    if (recent >= max) {
      return {
        ok: false,
        silent: false,
        error: `Too many submissions from your connection. Please try again later, or call us on ${COMPANY.phone}.`,
      }
    }
    await prisma.formHit.create({ data: { kind, ipHash } })
  } catch (error) {
    console.error('[form-guard] rate-limit check failed; allowing the submission', error)
  }

  return { ok: true }
}

/** Short, PII-free description of a failure for logs and the admin list. */
export function describeError(error: unknown) {
  return (error instanceof Error ? error.message : String(error)).slice(0, 300)
}

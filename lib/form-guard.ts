import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { COMPANY } from '@/lib/constants'
import { HONEYPOT_FIELD, STARTED_FIELD } from '@/lib/form-guard-fields'
import { hashKey, ipFromHeaders } from '@/lib/client-ip'

// Anti-spam for the public forms (contact, booking, employment). Used in this order by each action:
//   1. screenSubmission  - honeypot + fill time (instant, no database)
//   2. validate the form - so a typo never uses up someone's allowance
//   3. checkRateLimit    - counted in the database so it works across serverless instances
// Only a one-way hash of the visitor's IP is stored, never the IP itself.

export type FormKind = 'contact' | 'booking' | 'employment'

const MIN_FILL_MS = 2_000

const LIMITS: Record<FormKind, { max: number; windowMs: number }> = {
  contact: { max: 5, windowMs: 60 * 60 * 1000 },
  booking: { max: 5, windowMs: 60 * 60 * 1000 },
  employment: { max: 3, windowMs: 60 * 60 * 1000 },
}

export type GuardResult = { ok: true } | { ok: false; silent: boolean; error?: string }

/** Honeypot and fill-time checks. A caught bot is told it worked so it does not learn it was spotted. */
export function screenSubmission(formData: FormData): GuardResult {
  if (String(formData.get(HONEYPOT_FIELD) ?? '').trim() !== '') return { ok: false, silent: true }

  // The form stamps itself when it loads in the browser.
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
  return { ok: true }
}

/**
 * Per-connection limit on submissions that passed validation. If the database check itself fails we let
 * the visitor through: losing a real enquiry is worse than letting one spam message by.
 */
export async function checkRateLimit(kind: FormKind): Promise<GuardResult> {
  try {
    const { max, windowMs } = LIMITS[kind]
    const ipHash = hashKey(ipFromHeaders(await headers()))
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

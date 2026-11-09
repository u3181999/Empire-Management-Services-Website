import { CredentialsSignin } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { hashKey, ipFromHeaders } from '@/lib/client-ip'

// Brute-force protection for the admin login.
//
// What it replaces: a counter in memory keyed by email alone. That had two flaws: anyone could lock the
// real administrator out just by failing five times, and it reset whenever the serverless function
// restarted, so it barely slowed an attacker down.
//
// What this does instead (counted in the database, so it works across serverless instances):
//   - only FAILED attempts count
//   - 5 failures per IP + email pair in 15 minutes blocks that pair. The pair includes the IP, so an
//     attacker can only ever lock out themselves; the real administrator, on a different connection,
//     is unaffected
//   - 20 failures per IP in 15 minutes blocks that IP, so one machine cannot work through many emails
//   - a successful login clears that pair's failures
// Only keyed hashes are stored (never the IP or the email), in the form_hits table that the daily
// cleanup job already empties.
//
// A distributed attack (many IPs) is limited by bcrypt's cost and the password's strength, not by this.
// Use a long unique password and consider adding two-factor sign-in.

const WINDOW_MS = 15 * 60 * 1000
const MAX_FAILURES_PER_IP_AND_EMAIL = 5
const MAX_FAILURES_PER_IP = 20

const PAIR_KIND = 'login-pair'
const IP_KIND = 'login-ip'

/** Thrown from authorize(); the login page reads `code` to show an accurate message. */
export class TooManyAttempts extends CredentialsSignin {
  code = 'too_many_attempts'
}

function keysFor(headers: Headers, email: string) {
  const ip = ipFromHeaders(headers)
  return {
    pair: hashKey(`${ip}|${email.trim().toLowerCase()}`),
    ip: hashKey(ip),
  }
}

/** Throws TooManyAttempts if this IP + email, or this IP overall, has failed too often recently. */
export async function assertLoginAllowed(headers: Headers, email: string) {
  const { pair, ip } = keysFor(headers, email)
  const since = new Date(Date.now() - WINDOW_MS)
  let pairFailures = 0
  let ipFailures = 0
  try {
    ;[pairFailures, ipFailures] = await Promise.all([
      prisma.formHit.count({ where: { kind: PAIR_KIND, ipHash: pair, createdAt: { gte: since } } }),
      prisma.formHit.count({ where: { kind: IP_KIND, ipHash: ip, createdAt: { gte: since } } }),
    ])
  } catch (error) {
    // If the database is down, signing in fails anyway; don't add a second confusing failure.
    console.error('[login-guard] could not check recent failures', error instanceof Error ? error.message : error)
    return
  }
  if (pairFailures >= MAX_FAILURES_PER_IP_AND_EMAIL || ipFailures >= MAX_FAILURES_PER_IP) {
    console.warn('[login-guard] sign-in blocked after repeated failures', { pairFailures, ipFailures })
    throw new TooManyAttempts()
  }
}

export async function recordFailedLogin(headers: Headers, email: string) {
  const { pair, ip } = keysFor(headers, email)
  try {
    await prisma.formHit.createMany({
      data: [
        { kind: PAIR_KIND, ipHash: pair },
        { kind: IP_KIND, ipHash: ip },
      ],
    })
  } catch (error) {
    console.error('[login-guard] could not record a failed sign-in', error instanceof Error ? error.message : error)
  }
}

export async function clearFailedLogins(headers: Headers, email: string) {
  const { pair } = keysFor(headers, email)
  await prisma.formHit.deleteMany({ where: { kind: PAIR_KIND, ipHash: pair } }).catch(() => {})
}

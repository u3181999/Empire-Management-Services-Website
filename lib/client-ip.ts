import { createHmac } from 'node:crypto'

/**
 * The visitor's IP address as reported by the hosting platform. On Vercel, x-real-ip and
 * x-forwarded-for are set by the platform itself (a visitor cannot choose them).
 */
export function ipFromHeaders(headers: Headers): string {
  return headers.get('x-real-ip') ?? headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

/**
 * One-way keyed hash (HMAC), shortened. Used wherever we need to count or compare something about a
 * visitor (their IP, or an IP + email pair) without storing the raw value in the database.
 */
export function hashKey(value: string): string {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? 'dev-only-salt'
  return createHmac('sha256', secret).update(value).digest('hex').slice(0, 32)
}

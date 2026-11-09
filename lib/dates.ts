// Date helpers for the booking form. Safe to import from both server and client code.
// A booking date is a calendar day (YYYY-MM-DD) with no time of day, and it is always read in Canberra time:
// the server runs in UTC, which can be a day behind Canberra.

export const BOOKING_TIME_ZONE = 'Australia/Canberra'

/** Furthest ahead a booking can be requested. Anything later is almost certainly a typo or junk. */
export const MAX_BOOKING_DAYS_AHEAD = 365

/** Today's date in Canberra as YYYY-MM-DD. */
export function todayInCanberra(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: BOOKING_TIME_ZONE }).format(now)
}

/** The date `days` days after a YYYY-MM-DD date, as YYYY-MM-DD (calendar arithmetic, no time zone drift). */
export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** True for a real calendar day. Rejects 2026-02-31, 2026-13-01 and anything not in YYYY-MM-DD form. */
export function isRealDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const d = new Date(`${date}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date
}

/** Last day a booking can be requested for, as YYYY-MM-DD. */
export function latestBookingDate(now: Date = new Date()): string {
  return addDays(todayInCanberra(now), MAX_BOOKING_DAYS_AHEAD)
}

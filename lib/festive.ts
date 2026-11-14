// When the festive Santa hat shows on the logo. It repeats every year on its own: only the month and day are compared,
// never the year, so nothing needs changing each December. To change the dates, edit the two lines below.
//
// Dates are in Canberra time (the business is in Canberra, and a server or visitor elsewhere must not shift the day).
export const FESTIVE_START = { month: 12, day: 1 } // 1 December
export const FESTIVE_END = { month: 12, day: 26 } // 26 December (Boxing Day) is the last day

const TIME_ZONE = 'Australia/Canberra'
const key = ({ month, day }: { month: number; day: number }) => month * 100 + day

/** Today's month (1-12) and day of month in Canberra. */
export function canberraMonthDay(now: Date = new Date()): { month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone: TIME_ZONE, month: 'numeric', day: 'numeric' }).formatToParts(now)
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  return { month: get('month'), day: get('day') }
}

/** True from FESTIVE_START to FESTIVE_END inclusive, in any year. Also works for a season that spans New Year. */
export function isFestiveSeason(now: Date = new Date()): boolean {
  const today = key(canberraMonthDay(now))
  const start = key(FESTIVE_START)
  const end = key(FESTIVE_END)
  return start <= end ? today >= start && today <= end : today >= start || today <= end
}

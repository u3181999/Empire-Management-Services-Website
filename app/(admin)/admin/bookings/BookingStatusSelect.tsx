'use client'

import { useRef } from 'react'

const STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const

/**
 * The status dropdown on the bookings list. It saves as soon as a new status is chosen.
 *
 * This has to be a client component: the bookings page itself is rendered on the server, and a server-rendered page
 * cannot hand an onChange handler to a form control. Doing that made the whole page return a 500 error as soon as
 * the first booking existed (an empty list never rendered a dropdown, so it went unnoticed).
 */
export default function BookingStatusSelect({
  bookingId,
  status,
  customer,
  action,
}: {
  bookingId: string
  status: string
  customer: string
  action: (formData: FormData) => void | Promise<void>
}) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <select
        name="status"
        defaultValue={status}
        aria-label={`Status for ${customer}'s booking`}
        onChange={() => formRef.current?.requestSubmit()}
        className="text-xs border border-gray-200 rounded px-2 py-1 bg-white focus:ring-1 focus:ring-[#d4a017] focus:outline-none"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </form>
  )
}

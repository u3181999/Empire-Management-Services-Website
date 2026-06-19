'use client'

import { useActionState } from 'react'
import { submitBooking } from '@/app/actions/booking'
import { SERVICES, LOCATIONS, TIME_SLOTS } from '@/lib/constants'

export default function BookingForm() {
  const [state, action, pending] = useActionState(submitBooking, null)

  if (state?.success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-[#102a43]">Booking Request Received!</h3>
        <p className="mt-2 text-gray-600">
          Your reference number is <strong>{state.reference}</strong>.
          <br />
          We&apos;ll confirm your booking via email within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-6">
      <h2 className="text-xl font-bold text-[#102a43]">Your Details</h2>

      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            required
            autoComplete="name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="customerPhone"
            name="customerPhone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="customerEmail"
          name="customerEmail"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
        />
      </div>

      <hr className="border-gray-100" />
      <h2 className="text-xl font-bold text-[#102a43]">Service Details</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="locationId" className="block text-sm font-medium text-gray-700 mb-1.5">
            Location <span aria-hidden="true">*</span>
          </label>
          <select
            id="locationId"
            name="locationId"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent bg-white"
          >
            <option value="">Select location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1.5">
            Service <span aria-hidden="true">*</span>
          </label>
          <select
            id="serviceId"
            name="serviceId"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent bg-white"
          >
            <option value="">Select service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Time <span aria-hidden="true">*</span>
          </label>
          <select
            id="timeSlot"
            name="timeSlot"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent bg-white"
          >
            <option value="">Select time slot</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent resize-none"
          placeholder="Site size, access requirements, special instructions..."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 px-6 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] text-base"
      >
        {pending ? 'Submitting…' : 'Submit Booking Request'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Submitting this form is a booking request only. We will contact you to confirm availability.
      </p>
    </form>
  )
}

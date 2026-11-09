'use client'

import { useActionState } from 'react'
import { submitBooking } from '@/app/actions/booking'
import Link from 'next/link'
import { SERVICES, LOCATIONS, TIME_SLOTS } from '@/lib/constants'
import FormGuardFields from '@/components/features/FormGuardFields'
import { ErrorSummary, FieldError, FormSuccess, controlClass, errorProps } from '@/components/features/FormErrors'

// Field names in the order they appear, with the names used in the error summary.
const LABELS = {
  customerName: 'Full name',
  customerPhone: 'Phone',
  customerEmail: 'Email',
  locationId: 'Location',
  serviceId: 'Service',
  date: 'Preferred date',
  timeSlot: 'Preferred time',
  notes: 'Additional notes',
}

export default function BookingForm() {
  const [state, action, pending] = useActionState(submitBooking, null)

  if (state?.success) {
    return (
      <FormSuccess className="text-center py-8">
        <div className="text-green-500 text-5xl mb-4" aria-hidden="true">✓</div>
        <h3 className="text-xl font-bold text-[#102a43]">Booking Request Received!</h3>
        <p className="mt-2 text-gray-600">
          Your reference number is <strong>{state.reference}</strong>.
          <br />
          We&apos;ll confirm your booking via email within 1 business day.
        </p>
      </FormSuccess>
    )
  }

  const failure = state && !state.success ? state : null
  const errors = failure?.fieldErrors ?? {}
  // React clears a form after every submission, so a rejected form refills itself from what was sent.
  const v = failure?.values ?? {}
  const text = (name: string) => (typeof v[name] === 'string' ? (v[name] as string) : undefined)

  return (
    <form action={action} className="space-y-6">
      <FormGuardFields />
      <h2 className="text-xl font-bold text-[#102a43]">Your Details</h2>

      <ErrorSummary error={failure?.error} fieldErrors={failure?.fieldErrors} labels={LABELS} />

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
            defaultValue={text('customerName')}
            {...errorProps('customerName', errors.customerName)}
            className={controlClass(!!errors.customerName)}
          />
          <FieldError name="customerName" message={errors.customerName} />
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
            defaultValue={text('customerPhone')}
            {...errorProps('customerPhone', errors.customerPhone)}
            className={controlClass(!!errors.customerPhone)}
          />
          <FieldError name="customerPhone" message={errors.customerPhone} />
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
          defaultValue={text('customerEmail')}
          {...errorProps('customerEmail', errors.customerEmail)}
          className={controlClass(!!errors.customerEmail)}
        />
        <FieldError name="customerEmail" message={errors.customerEmail} />
      </div>

      <hr className="border-gray-100" />
      <h2 className="text-xl font-bold text-[#102a43]">Service Details</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="locationId" className="block text-sm font-medium text-gray-700 mb-1.5">
            Location <span aria-hidden="true">*</span>
          </label>
          <select
            // A dropdown only reads its default when it is created, so rebuild it when the refilled value changes.
            key={text('locationId') ?? 'none'}
            id="locationId"
            name="locationId"
            required
            defaultValue={text('locationId') ?? ''}
            {...errorProps('locationId', errors.locationId)}
            className={controlClass(!!errors.locationId, 'bg-white')}
          >
            <option value="">Select location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
          <FieldError name="locationId" message={errors.locationId} />
        </div>
        <div>
          <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1.5">
            Service <span aria-hidden="true">*</span>
          </label>
          <select
            key={text('serviceId') ?? 'none'}
            id="serviceId"
            name="serviceId"
            required
            defaultValue={text('serviceId') ?? ''}
            {...errorProps('serviceId', errors.serviceId)}
            className={controlClass(!!errors.serviceId, 'bg-white')}
          >
            <option value="">Select service</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
          <FieldError name="serviceId" message={errors.serviceId} />
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
            defaultValue={text('date')}
            {...errorProps('date', errors.date)}
            className={controlClass(!!errors.date)}
          />
          <FieldError name="date" message={errors.date} />
        </div>
        <div>
          <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Time <span aria-hidden="true">*</span>
          </label>
          <select
            key={text('timeSlot') ?? 'none'}
            id="timeSlot"
            name="timeSlot"
            required
            defaultValue={text('timeSlot') ?? ''}
            {...errorProps('timeSlot', errors.timeSlot)}
            className={controlClass(!!errors.timeSlot, 'bg-white')}
          >
            <option value="">Select time slot</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FieldError name="timeSlot" message={errors.timeSlot} />
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
          defaultValue={text('notes')}
          {...errorProps('notes', errors.notes)}
          className={controlClass(!!errors.notes, 'resize-none')}
          placeholder="Site size, access requirements, special instructions..."
        />
        <FieldError name="notes" message={errors.notes} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3.5 px-6 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] text-base"
      >
        {pending ? 'Submitting…' : 'Submit Booking Request'}
      </button>

      <p className="text-xs text-gray-600 text-center leading-relaxed">
        Submitting this form is a booking request only. We will contact you to confirm availability. We use the
        details you give here only to handle your booking — see our{' '}
        <Link href="/privacy" className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}

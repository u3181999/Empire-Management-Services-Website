'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { submitEmploymentApplication } from '@/app/actions/employment'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function EmploymentForm() {
  const [state, action, pending] = useActionState(submitEmploymentApplication, null)

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-600 text-4xl mb-3">✓</div>
        <h3 className="font-bold text-green-800 text-lg">Application Submitted!</h3>
        <p className="text-green-700 text-sm mt-2">
          Thank you for your interest. We&apos;ll review your application and be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
        />
      </div>

      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Days Available <span aria-hidden="true">*</span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DAYS.map((day) => (
              <label key={day} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="days"
                  value={day}
                  className="w-4 h-4 text-[#d4a017] border-gray-300 rounded focus:ring-[#d4a017]"
                />
                <span className="text-gray-600">{day}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Shift <span aria-hidden="true">*</span>
          </legend>
          <div className="flex gap-4">
            {['AM', 'PM', 'Either'].map((shift) => (
              <label key={shift} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="shift"
                  value={shift}
                  required
                  className="w-4 h-4 text-[#d4a017] border-gray-300 focus:ring-[#d4a017]"
                />
                <span className="text-gray-600">{shift}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1.5">
          Available Start Date <span aria-hidden="true">*</span>
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="hasExperience"
            value="yes"
            className="w-4 h-4 mt-0.5 text-[#d4a017] border-gray-300 rounded focus:ring-[#d4a017]"
          />
          <span className="text-gray-600">I have previous cleaning experience</span>
        </label>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          Additional Information
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent resize-none"
          placeholder="Tell us about your experience or anything else relevant..."
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="privacyConsent"
            value="true"
            required
            className="w-4 h-4 mt-0.5 text-[#d4a017] border-gray-300 rounded focus:ring-[#d4a017] shrink-0"
          />
          <span className="text-gray-600">
            I consent to Empire Management Services storing and using my personal information to
            process this employment application. Data will be retained for 6 months if unsuccessful.
            Read our{' '}
            <Link href="/privacy" className="text-[#d4a017] hover:underline">
              Privacy Policy
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-6 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
      >
        {pending ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  )
}

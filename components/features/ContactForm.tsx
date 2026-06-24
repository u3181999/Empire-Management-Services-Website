'use client'

import { useActionState } from 'react'
import { submitContact } from '@/app/actions/contact'

const SUBJECTS = [
  'General Enquiry',
  'Request a Quote',
  'Booking Enquiry',
  'Employment',
  'Complaint or Feedback',
  'Other',
]

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, null)

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-600 text-4xl mb-3">✓</div>
        <h3 className="font-bold text-green-800 text-lg">Message Sent!</h3>
        <p className="text-green-700 text-sm mt-2">
          Thank you for reaching out. We&apos;ll get back to you within 1 business day.
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
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
            placeholder="02 1234 5678"
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
          placeholder="jane@company.com.au"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
          Subject <span aria-hidden="true">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent bg-white"
        >
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent resize-none"
          placeholder="Tell us about your cleaning requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-6 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
      >
        {pending ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        We typically respond within 1 business day.
      </p>
    </form>
  )
}

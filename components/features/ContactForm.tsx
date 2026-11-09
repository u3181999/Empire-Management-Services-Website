'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitContact } from '@/app/actions/contact'
import Link from 'next/link'
import { CONTACT_SUBJECTS, SERVICES } from '@/lib/constants'
import FormGuardFields from '@/components/features/FormGuardFields'
import { ErrorSummary, FieldError, FormSuccess, controlClass, errorProps } from '@/components/features/FormErrors'

// Field names in the order they appear, with the names used in the error summary.
const LABELS = { name: 'Full name', phone: 'Phone', email: 'Email', subject: 'Subject', message: 'Message' }

const COMPLIANCE_REQUEST = 'Please send me copies of your current ISO certificates and public liability certificate of currency.'

/**
 * Pre-fills the form from the link that brought the visitor here:
 *   ?service=<slug>    (a "Get a Quote" button)
 *   ?subject=<subject> (e.g. the "Request a copy" button on the Certifications page)
 * Both are looked up in our own lists, so nothing from the URL is ever echoed into the page.
 */
export function PrefilledContactForm() {
  const params = useSearchParams()
  const service = SERVICES.find((s) => s.slug === params.get('service'))
  const subject = CONTACT_SUBJECTS.find((s) => s === params.get('subject'))
  return <ContactForm serviceName={service?.name} presetSubject={subject} />
}

export default function ContactForm({ serviceName, presetSubject }: { serviceName?: string; presetSubject?: string }) {
  const [state, action, pending] = useActionState(submitContact, null)
  const errors = state?.fieldErrors ?? {}
  // React clears a form after every submission, so a rejected form refills itself from what was sent.
  const v = state?.values ?? {}
  const text = (name: string) => (typeof v[name] === 'string' ? (v[name] as string) : undefined)

  if (state?.success) {
    return (
      <FormSuccess className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-600 text-4xl mb-3" aria-hidden="true">✓</div>
        <h3 className="font-bold text-green-800 text-lg">Message Sent!</h3>
        <p className="text-green-700 text-sm mt-2">
          Thank you for reaching out. We&apos;ll get back to you within 1 business day.
        </p>
      </FormSuccess>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <FormGuardFields />
      <ErrorSummary error={state?.error} fieldErrors={state?.fieldErrors} labels={LABELS} />

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
            defaultValue={text('name')}
            {...errorProps('name', errors.name)}
            className={controlClass(!!errors.name)}
            placeholder="Jane Smith"
          />
          <FieldError name="name" message={errors.name} />
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
            defaultValue={text('phone')}
            {...errorProps('phone', errors.phone)}
            className={controlClass(!!errors.phone)}
            placeholder="02 1234 5678"
          />
          <FieldError name="phone" message={errors.phone} />
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
          defaultValue={text('email')}
          {...errorProps('email', errors.email)}
          className={controlClass(!!errors.email)}
          placeholder="jane@company.com.au"
        />
        <FieldError name="email" message={errors.email} />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
          Subject <span aria-hidden="true">*</span>
        </label>
        <select
          // A dropdown only reads its default when it is created, so rebuild it when the refilled value changes.
          key={text('subject') ?? 'none'}
          id="subject"
          name="subject"
          required
          defaultValue={text('subject') ?? presetSubject ?? (serviceName ? 'Request a Quote' : '')}
          {...errorProps('subject', errors.subject)}
          className={controlClass(!!errors.subject, 'bg-white')}
        >
          <option value="">Select a subject</option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <FieldError name="subject" message={errors.subject} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          defaultValue={
            text('message') ??
            (presetSubject === 'Compliance Documents'
              ? COMPLIANCE_REQUEST
              : serviceName
                ? `I'd like a quote for ${serviceName}.`
                : '')
          }
          rows={5}
          {...errorProps('message', errors.message)}
          className={controlClass(!!errors.message, 'resize-none')}
          placeholder="Tell us about your cleaning requirements..."
        />
        <FieldError name="message" message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 px-6 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
      >
        {pending ? 'Sending…' : 'Send Message'}
      </button>

      <p className="text-xs text-gray-600 text-center leading-relaxed">
        We typically respond within 1 business day. We use the details you give here only to respond to your
        enquiry — see our{' '}
        <Link href="/privacy" className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}

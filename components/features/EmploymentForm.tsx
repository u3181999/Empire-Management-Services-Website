'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { submitEmploymentApplication } from '@/app/actions/employment'
import { SECURITY_CLEARANCES, SHIFT_OPTIONS, WORK_DAYS } from '@/lib/constants'
import FormGuardFields from '@/components/features/FormGuardFields'
import { ErrorSummary, FieldError, FormSuccess, controlClass, errorProps } from '@/components/features/FormErrors'

// Field names in the order they appear, with the names used in the error summary.
const LABELS = {
  name: 'Full name',
  phone: 'Phone',
  email: 'Email',
  days: 'Days available',
  shift: 'Preferred shift',
  startDate: 'Available start date',
  citizen: 'Australian citizen',
  clearance: 'Highest security clearance',
  message: 'Additional information',
  privacyConsent: 'Privacy consent',
}

const radioClass = 'w-4 h-4 text-[#d4a017] border-gray-300 focus:ring-[#d4a017]'

export default function EmploymentForm() {
  const [state, action, pending] = useActionState(submitEmploymentApplication, null)
  const errors = state?.fieldErrors ?? {}
  // React clears a form after every submission, so a rejected form refills itself from what was sent.
  const v = state?.values ?? {}
  const text = (name: string) => (typeof v[name] === 'string' ? (v[name] as string) : undefined)
  const chosenDays = Array.isArray(v.days) ? v.days : []

  // A group of boxes has no single input to mark invalid, so the group points at its message instead.
  const group = (name: string) => (errors[name] ? ({ 'aria-describedby': `${name}-error` } as const) : {})

  if (state?.success) {
    return (
      <FormSuccess className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-green-600 text-4xl mb-3" aria-hidden="true">✓</div>
        <h3 className="font-bold text-green-800 text-lg">Application Submitted!</h3>
        <p className="text-green-700 text-sm mt-2">
          Thank you for your interest. We&apos;ll review your application and be in touch soon.
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
          />
          <FieldError name="name" message={errors.name} />
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
            defaultValue={text('phone')}
            {...errorProps('phone', errors.phone)}
            className={controlClass(!!errors.phone)}
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
        />
        <FieldError name="email" message={errors.email} />
      </div>

      <div>
        <fieldset {...group('days')}>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Days Available <span aria-hidden="true">*</span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {WORK_DAYS.map((day) => (
              <label key={day} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="days"
                  value={day}
                  defaultChecked={chosenDays.includes(day)}
                  className="w-4 h-4 text-[#d4a017] border-gray-300 rounded focus:ring-[#d4a017]"
                />
                <span className="text-gray-600">{day}</span>
              </label>
            ))}
          </div>
          <FieldError name="days" message={errors.days} />
        </fieldset>
      </div>

      <div>
        <fieldset {...group('shift')}>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Shift <span aria-hidden="true">*</span>
          </legend>
          <div className="flex gap-4">
            {SHIFT_OPTIONS.map((shift) => (
              <label key={shift} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="shift"
                  value={shift}
                  required
                  defaultChecked={text('shift') === shift}
                  className={radioClass}
                />
                <span className="text-gray-600">{shift}</span>
              </label>
            ))}
          </div>
          <FieldError name="shift" message={errors.shift} />
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
          defaultValue={text('startDate')}
          {...errorProps('startDate', errors.startDate)}
          className={controlClass(!!errors.startDate)}
        />
        <FieldError name="startDate" message={errors.startDate} />
      </div>

      <div>
        <fieldset {...group('citizen')}>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Australian Citizen? <span aria-hidden="true">*</span>
          </legend>
          <div className="flex gap-4">
            {['Yes', 'No'].map((answer) => (
              <label key={answer} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="citizen"
                  value={answer}
                  required
                  defaultChecked={(text('citizen') ?? 'Yes') === answer}
                  className={radioClass}
                />
                <span className="text-gray-600">{answer}</span>
              </label>
            ))}
          </div>
          <FieldError name="citizen" message={errors.citizen} />
        </fieldset>
      </div>

      <div>
        <fieldset {...group('clearance')}>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Highest Security Clearance? <span aria-hidden="true">*</span>
          </legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {SECURITY_CLEARANCES.map((level) => (
              <label key={level} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="clearance"
                  value={level}
                  required
                  defaultChecked={(text('clearance') ?? 'None') === level}
                  className={radioClass}
                />
                <span className="text-gray-600">{level}</span>
              </label>
            ))}
          </div>
          <FieldError name="clearance" message={errors.clearance} />
        </fieldset>
      </div>

      <div>
        <label className="flex items-start gap-3 py-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="hasExperience"
            value="yes"
            defaultChecked={text('hasExperience') === 'yes'}
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
          defaultValue={text('message')}
          {...errorProps('message', errors.message)}
          className={controlClass(!!errors.message, 'resize-none')}
          placeholder="Tell us about your experience or anything else relevant..."
        />
        <FieldError name="message" message={errors.message} />
      </div>

      <div>
        <label className="flex items-start gap-3 py-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="privacyConsent"
            value="true"
            required
            defaultChecked={text('privacyConsent') === 'true'}
            {...errorProps('privacyConsent', errors.privacyConsent)}
            className="w-4 h-4 mt-0.5 text-[#d4a017] border-gray-300 rounded focus:ring-[#d4a017] shrink-0"
          />
          <span className="text-gray-600">
            I consent to Empire Management Services storing and using my personal information to
            process this employment application. Data will be retained for 6 months if unsuccessful.
            Read our{' '}
            <Link href="/privacy" className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800">
              Privacy Policy
            </Link>
            . <span aria-hidden="true">*</span>
          </span>
        </label>
        <FieldError name="privacyConsent" message={errors.privacyConsent} />
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

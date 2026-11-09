'use client'

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import type { FieldErrors } from '@/lib/form-state'

// Accessible form feedback shared by the contact, booking and employment forms.
//
//  - ErrorSummary   a box above the form listing what to fix. It takes focus when it appears, so
//                   keyboard and screen-reader users are told straight away, and each item links to its field.
//  - FieldError     the message next to a field; the field points at it with aria-describedby.
//  - FormSuccess    the "thank you" panel; it takes focus so it is announced (the form it replaces is gone).
//  - controlClass   input styling, with a red border when invalid (colour is never the only cue: the text and
//                   aria-invalid say so too).

/** Moves focus to a field by its name; works for single fields and for the first box of a radio/checkbox group. */
function focusField(name: string) {
  return (event: MouseEvent) => {
    const el = document.querySelector<HTMLElement>(`[name="${name}"]`) ?? document.getElementById(name)
    if (!el) return
    event.preventDefault()
    el.focus()
    el.scrollIntoView({ block: 'center' })
  }
}

export function ErrorSummary({
  error,
  fieldErrors,
  labels,
}: {
  error?: string
  fieldErrors?: FieldErrors
  /** Human names for the fields, in the order they appear on the form. */
  labels: Record<string, string>
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Runs each time a new failure arrives (every response is a new object), not on first render.
  useEffect(() => {
    if (error) ref.current?.focus()
  }, [error, fieldErrors])

  if (!error) return null

  // List in form order, not the order the server happened to report them.
  const items = Object.keys(labels).filter((name) => fieldErrors?.[name])

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="form-error-summary-title"
      className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
    >
      <p id="form-error-summary-title" className="font-semibold">
        {error}
      </p>
      {items.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {items.map((name) => (
            <li key={name}>
              <a href={`#${name}`} onClick={focusField(name)} className="font-medium underline underline-offset-2">
                {labels[name]}: {fieldErrors![name]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null
  return (
    <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-red-700">
      <span className="sr-only">Error: </span>
      {message}
    </p>
  )
}

/** aria attributes that tie a field to its error message. Spread onto the input, select or fieldset. */
export function errorProps(name: string, message?: string) {
  return message ? ({ 'aria-invalid': true, 'aria-describedby': `${name}-error` } as const) : {}
}

export function controlClass(invalid: boolean, extra = '') {
  return [
    'w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent',
    invalid ? 'border-red-600' : 'border-gray-300',
    extra,
  ]
    .filter(Boolean)
    .join(' ')
}

export function FormSuccess({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div ref={ref} tabIndex={-1} role="status" className={`${className} focus:outline-none`}>
      {children}
    </div>
  )
}

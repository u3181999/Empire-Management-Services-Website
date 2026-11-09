'use client'

import { signIn } from 'next-auth/react'
import { useRef, useState, FormEvent } from 'react'

const MESSAGES = {
  invalid: 'Invalid email or password.',
  // Matches TooManyAttempts in lib/login-guard.ts
  too_many_attempts: 'Too many failed sign-in attempts from this connection. Please wait 15 minutes and try again.',
} as const

export default function AdminLoginPage() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError('')
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) {
      setError(res.code === 'too_many_attempts' ? MESSAGES.too_many_attempts : MESSAGES.invalid)
      setPending(false)
      // Clear the wrong password and put the cursor back on it, ready for another try.
      if (passwordRef.current) {
        passwordRef.current.value = ''
        passwordRef.current.focus()
      }
    } else {
      // Full page load so the new session cookie is used and no cached
      // signed-out redirect from the router can send us back to the login page.
      window.location.assign('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#102a43] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-[#d4a017] font-bold text-xl">Empire</h1>
          <p className="text-[#102a43] font-semibold text-sm mt-0.5">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* role="alert" makes screen readers announce the message as soon as it appears */}
          <div role="alert" id="login-error">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 text-center">
                {error}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'login-error' : undefined}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'login-error' : undefined}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 bg-[#102a43] text-white font-bold rounded-lg hover:bg-[#0b1f31] transition-colors disabled:opacity-60"
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

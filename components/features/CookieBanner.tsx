'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const COOKIE_KEY = 'empire_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!Cookies.get(COOKIE_KEY)) setVisible(true)
  }, [])

  function accept() {
    Cookies.set(COOKIE_KEY, 'accepted', { expires: 365 })
    setVisible(false)
  }

  function decline() {
    Cookies.set(COOKIE_KEY, 'declined', { expires: 365 })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900 text-white px-4 py-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1">
          We use essential cookies to keep the site running and analytics cookies to understand how
          visitors use our site. See our{' '}
          <a href="/privacy" className="text-gold-500 hover:underline">
            Privacy Policy
          </a>{' '}
          for details.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-sm px-4 py-2 rounded-lg border border-white/30 text-gray-300 hover:bg-white/10 transition-colors min-h-[40px]"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm px-4 py-2 rounded-lg bg-gold-500 text-navy-900 font-semibold hover:bg-gold-400 transition-colors min-h-[40px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

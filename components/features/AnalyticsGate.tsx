'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Cookies from 'js-cookie'
import { CONSENT_COOKIE, CONSENT_EVENT } from '@/lib/consent'

/**
 * Vercel Web Analytics is cookieless and anonymous, so it runs by default, but a visitor who
 * presses "Decline" in the cookie banner switches it off. Renders nothing until the choice has
 * been read, so a visitor who declined is never counted even for one page view.
 */
export default function AnalyticsGate() {
  const [enabled, setEnabled] = useState<boolean | null>(null)

  useEffect(() => {
    const read = () => setEnabled(Cookies.get(CONSENT_COOKIE) !== 'declined')
    read()
    window.addEventListener(CONSENT_EVENT, read)
    return () => window.removeEventListener(CONSENT_EVENT, read)
  }, [])

  // The analytics script only exists on Vercel, so skip it in local development.
  if (!enabled || process.env.NODE_ENV !== 'production') return null
  return <Analytics />
}

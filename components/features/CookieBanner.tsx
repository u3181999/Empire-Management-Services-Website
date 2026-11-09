'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { CONSENT_COOKIE, CONSENT_EVENT, type ConsentChoice } from '@/lib/consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!Cookies.get(CONSENT_COOKIE)) setVisible(true)
  }, [])

  // Publish the banner's real height so the chat and back-to-top buttons can sit above it
  // instead of covering the Accept / Decline buttons.
  useEffect(() => {
    const root = document.documentElement
    if (!visible || !ref.current) {
      root.style.setProperty('--cookie-banner-h', '0px')
      return
    }
    const el = ref.current
    const update = () => root.style.setProperty('--cookie-banner-h', `${el.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      observer.disconnect()
      root.style.setProperty('--cookie-banner-h', '0px')
    }
  }, [visible])

  function choose(choice: ConsentChoice) {
    Cookies.set(CONSENT_COOKIE, choice, {
      expires: 365,
      sameSite: 'lax',
      secure: window.location.protocol === 'https:',
    })
    window.dispatchEvent(new Event(CONSENT_EVENT))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Cookie and analytics notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900 text-white px-4 py-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1">
          We use privacy-friendly analytics (no cookies, no advertising, no cross-site tracking) to see which pages
          are useful. <strong className="font-semibold text-white">Decline</strong> switches it off. Either way we
          store one small cookie to remember your choice. See our{' '}
          <Link href="/privacy" className="text-gold-500 underline underline-offset-2 hover:text-gold-400">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose('declined')}
            className="text-sm px-4 py-2 rounded-lg border border-white/40 text-gray-200 hover:bg-white/10 transition-colors min-h-[44px]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="text-sm px-4 py-2 rounded-lg bg-gold-500 text-navy-900 font-semibold hover:bg-gold-400 transition-colors min-h-[44px]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

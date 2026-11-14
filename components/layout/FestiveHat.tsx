'use client'

import { useSyncExternalStore } from 'react'
import { isFestiveSeason } from '@/lib/festive'

const noSubscribe = () => () => {}

/**
 * Preview and testing: add ?festive=1 to any address to see the hat out of season, or ?festive=0 to hide it in
 * season. Otherwise the hat follows the dates in lib/festive.ts.
 */
function festiveNow(): boolean {
  const forced = new URLSearchParams(window.location.search).get('festive')
  if (forced === '1') return true
  if (forced === '0') return false
  return isFestiveSeason()
}

/**
 * A Santa hat perched on the logo during the festive season. Put it inside a `relative` wrapper around the logo.
 *
 * The pages are built ahead of time, so the date is checked in the visitor's browser each time the page is shown
 * (the server version always renders nothing, which keeps the two in step). Nothing is stored, so when the season
 * ends the hat simply stops appearing. Purely decorative: hidden from screen readers and not clickable.
 */
export default function FestiveHat({ className = '' }: { className?: string }) {
  const festive = useSyncExternalStore(noSubscribe, festiveNow, () => false)
  if (!festive) return null

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 64 56"
      className={`pointer-events-none absolute ${className}`}
    >
      {/* hat body */}
      <path d="M9 42 C10 20 24 7 42 8 C52 9 59 15 58 24 C52 19 44 21 40 29 C38 34 38 39 40 42 Z" fill="#d62828" />
      {/* soft shading on the underside of the fold */}
      <path d="M40 42 C38 39 38 34 40 29 C44 21 52 19 58 24 C57 31 50 36 46 42 Z" fill="#a61c1c" opacity="0.55" />
      {/* white fur brim */}
      <rect x="4" y="38" width="46" height="13" rx="6.5" fill="#ffffff" stroke="#d9dde3" strokeWidth="1" />
      {/* pom-pom */}
      <circle cx="58" cy="25" r="6.5" fill="#ffffff" stroke="#d9dde3" strokeWidth="1" />
    </svg>
  )
}

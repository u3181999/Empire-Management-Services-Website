'use client'

import Image from 'next/image'
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
 * The picture is /public/festive/santa-hat.png (swap that file to change the hat).
 *
 * The pages are built ahead of time, so the date is checked in the visitor's browser each time the page is shown
 * (the server version always renders nothing, which keeps the two in step). Nothing is stored, so when the season
 * ends the hat simply stops appearing. Purely decorative: hidden from screen readers and not clickable.
 */
export default function FestiveHat({ className = '' }: { className?: string }) {
  const festive = useSyncExternalStore(noSubscribe, festiveNow, () => false)
  if (!festive) return null

  return (
    <Image
      src="/festive/santa-hat.png"
      alt=""
      aria-hidden="true"
      width={480}
      height={417}
      sizes="40px"
      className={`pointer-events-none absolute h-auto ${className}`}
    />
  )
}

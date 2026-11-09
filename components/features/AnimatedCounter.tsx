'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

function format(n: number) {
  return Math.round(n).toLocaleString('en-AU')
}

/**
 * Counts up from 0 to `end` the first time it scrolls into view.
 * Server render and reduced-motion users get the final number straight away.
 */
export default function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  duration = 1600,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(end)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
        setValue(end * eased)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    // Off-screen now: reset to 0 so the count-up is visible when it arrives.
    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight
    if (!alreadyVisible) setValue(0)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          setValue(0)
          run()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">
        {prefix}
        {format(end)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {format(value)}
        {suffix}
      </span>
    </span>
  )
}

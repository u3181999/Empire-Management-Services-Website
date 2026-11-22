'use client'

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * A row of reviews that swipes on a phone (scroll-snap) and has arrows and dots for everyone else.
 * Nothing moves by itself. The arrows and dots only appear when there are more reviews than fit on screen.
 * Built for the dark home-page section, so the controls are light-on-navy.
 */
export default function TestimonialsCarousel({ children, label }: { children: ReactNode; label: string }) {
  const items = Children.toArray(children)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [overflowing, setOverflowing] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setOverflowing(el.scrollWidth > el.clientWidth + 4)
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    setAtEnd(end)
    // The review nearest the left edge counts as the current one; at the very end, the last one.
    let nearest = 0
    let best = Infinity
    Array.from(el.children).forEach((child, i) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - el.scrollLeft)
      if (distance < best) {
        best = distance
        nearest = i
      }
    })
    setActive(end ? el.children.length - 1 : nearest)
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', measure, { passive: true })
    // The observer also reports the first size, so the controls are right as soon as the page loads.
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [measure])

  function goTo(index: number) {
    const el = track.current
    const target = el?.children[Math.max(0, Math.min(index, items.length - 1))] as HTMLElement | undefined
    if (!el || !target) return
    el.scrollTo({ left: target.offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-[#d4a017] hover:bg-[#d4a017] hover:text-[#102a43] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017]'

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        tabIndex={0}
        aria-label={`${label}: scroll sideways to see more`}
        className="relative -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-6 pt-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4a017] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`Review ${i + 1} of ${items.length}`}
            className="min-w-0 shrink-0 basis-[88%] snap-start sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
          >
            {child}
          </div>
        ))}
      </div>

      {overflowing && (
        <div className="mt-2 flex items-center justify-center gap-3">
          <button type="button" className={arrow} onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous review">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex items-center">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                className="group flex h-11 w-6 items-center justify-center focus-visible:outline-2 focus-visible:outline-[#d4a017]"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    i === active ? 'w-6 bg-[#d4a017]' : 'w-2 bg-white/30 group-hover:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
          <button type="button" className={arrow} onClick={() => goTo(active + 1)} disabled={atEnd} aria-label="Next review">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}

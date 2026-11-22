'use client'

import { useId, useState } from 'react'
import { ChevronDown, ExternalLink, Quote, Star } from 'lucide-react'
import { PREVIEW_CHARS, type TestimonialData } from '@/lib/testimonials'

export type { TestimonialData }

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-4 w-4 ${i <= rating ? 'fill-[#d4a017] text-[#d4a017]' : 'fill-gray-100 text-gray-300'}`}
        />
      ))}
    </div>
  )
}

// "Michael Haddad" -> "MH". Gives each review a quiet visual anchor without needing a photo.
function initials(name: string) {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0][0]
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

/**
 * One review. A long quote starts shortened and opens in place with "Read more", so nobody has to leave the page.
 * `featured` is a larger version for when there is only one review to show.
 */
export default function TestimonialCard({ t, featured = false }: { t: TestimonialData; featured?: boolean }) {
  const [open, setOpen] = useState(false)
  const quoteId = useId()
  const isLong = t.content.length > PREVIEW_CHARS
  const byline = [t.authorTitle, t.company].filter(Boolean).join(', ')

  return (
    <figure
      id={`t-${t.id}`}
      className={`group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[#d4a017]/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        featured ? 'p-7 sm:p-10' : 'p-6 sm:p-7'
      }`}
    >
      {/* Gold line that grows across the top on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-[#d4a017] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
      />
      <Quote
        aria-hidden="true"
        className={`absolute right-5 top-5 fill-[#d4a017]/15 text-[#d4a017]/15 ${featured ? 'h-14 w-14' : 'h-10 w-10'}`}
      />

      <StarRating rating={t.rating} />

      <blockquote className="mt-4 flex-1">
        <p
          id={quoteId}
          className={`leading-relaxed text-gray-700 ${featured ? 'text-lg sm:text-xl' : 'text-[15px]'} ${
            isLong && !open ? 'line-clamp-5' : ''
          }`}
        >
          &ldquo;{t.content}&rdquo;
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={quoteId}
            className="mt-2 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-gold-700 transition-colors hover:text-[#102a43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017]"
          >
            {open ? 'Show less' : 'Read more'}
            <span className="sr-only"> of {t.authorName}&apos;s review</span>
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full bg-[#102a43] font-bold text-[#d4a017] ${
            featured ? 'h-12 w-12 text-base' : 'h-10 w-10 text-sm'
          }`}
        >
          {initials(t.authorName)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#102a43]">{t.authorName}</p>
          {byline && <p className="text-xs leading-snug text-gray-600">{byline}</p>}
        </div>
        {/* A platform name is only shown when there is a link to that review, so it can be checked. */}
        {t.reviewUrl && (
          <a
            href={t.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-2 text-xs font-medium text-gray-600 transition-colors hover:text-[#102a43]"
            aria-label={`View ${t.authorName}'s original ${t.source} review (opens in a new tab)`}
          >
            {t.source}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </figcaption>
    </figure>
  )
}

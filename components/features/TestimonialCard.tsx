import Link from 'next/link'
import { Star, ExternalLink } from 'lucide-react'

export type TestimonialData = {
  id: string
  rating: number
  content: string
  authorName: string
  authorTitle: string | null
  company: string | null
  source: string
  reviewUrl: string | null
}

// A quote longer than this is cut short on the home page, with a link to read all of it.
export const PREVIEW_CHARS = 300

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'fill-[#d4a017] text-[#d4a017]' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

/**
 * One review. `preview` is for the home page: a long quote is shortened and links through to the full review on
 * the Reviews page. On the Reviews page itself the whole quote is shown.
 */
export default function TestimonialCard({ t, preview = false }: { t: TestimonialData; preview?: boolean }) {
  const isLong = preview && t.content.length > PREVIEW_CHARS

  return (
    <div
      id={`t-${t.id}`}
      className="scroll-mt-28 bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <StarRating rating={t.rating} />
        {/* A platform name is only shown when there is a link to that review, so it can be checked. */}
        {t.reviewUrl && <span className="text-xs text-gray-600 font-medium">{t.source} review</span>}
      </div>

      <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
        <p className={isLong ? 'line-clamp-6' : undefined}>&ldquo;{t.content}&rdquo;</p>
        {isLong && (
          <Link
            href={`/testimonials#t-${t.id}`}
            className="mt-2 inline-block py-1 text-sm font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800"
          >
            Read full review<span className="sr-only"> from {t.authorName}</span>
          </Link>
        )}
      </blockquote>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="font-semibold text-[#102a43] text-sm">{t.authorName}</p>
          {(t.authorTitle || t.company) && (
            <p className="text-xs text-gray-600">{[t.authorTitle, t.company].filter(Boolean).join(', ')}</p>
          )}
        </div>
        {t.reviewUrl && (
          <a
            href={t.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-700 hover:text-[#102a43] transition-colors shrink-0 p-1"
            aria-label={`View ${t.authorName}'s original review (opens in a new tab)`}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}

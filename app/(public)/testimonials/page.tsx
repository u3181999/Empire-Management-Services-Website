import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import TestimonialCard from '@/components/features/TestimonialCard'
import { fitTitle, pageSeo } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageSeo('/testimonials'),
  title: fitTitle('Client Reviews'),
  description:
    'What clients say about Empire Management Services: reviews and testimonials from organisations across Canberra and New South Wales.',
}

const PAGE_SIZE = 12

// Shown to the public, so keep the search short and the page number a sane whole number.
const cleanQuery = (v: unknown) => (typeof v === 'string' ? v.trim().slice(0, 80) : '')
const cleanPage = (v: unknown) => {
  const n = typeof v === 'string' ? Number.parseInt(v, 10) : NaN
  return Number.isFinite(n) && n >= 1 && n <= 1000 ? n : 1
}

function href(q: string, page: number) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (page > 1) params.set('page', String(page))
  const s = params.toString()
  return s ? `/testimonials?${s}` : '/testimonials'
}

export default async function TestimonialsPage(props: PageProps<'/testimonials'>) {
  const searchParams = await props.searchParams
  const q = cleanQuery(searchParams?.q)
  const requestedPage = cleanPage(searchParams?.page)

  const where = {
    isPublished: true,
    ...(q
      ? {
          OR: [
            { authorName: { contains: q, mode: 'insensitive' as const } },
            { authorTitle: { contains: q, mode: 'insensitive' as const } },
            { company: { contains: q, mode: 'insensitive' as const } },
            { content: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const [total, totalAll] = await Promise.all([
    prisma.testimonial.count({ where }),
    prisma.testimonial.count({ where: { isPublished: true } }),
  ])
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const page = Math.min(requestedPage, pages)

  const testimonials = await prisma.testimonial.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  })

  return (
    <>
      <section className="bg-navy-900 text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Client Reviews</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            What our clients say about working with Empire Management Services.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search: only worth showing once there are enough reviews to need it */}
          {totalAll > 3 && (
            <form method="GET" role="search" className="mb-8 flex max-w-xl gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  name="q"
                  type="search"
                  defaultValue={q}
                  maxLength={80}
                  aria-label="Search reviews by name, company or keyword"
                  placeholder="Search by name, company or keyword"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-[#102a43] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0b1f31]"
              >
                Search
              </button>
            </form>
          )}

          <p className="mb-6 text-sm text-gray-600" aria-live="polite">
            {q
              ? `${total} ${total === 1 ? 'review matches' : 'reviews match'} “${q}”`
              : `${total} ${total === 1 ? 'review' : 'reviews'}`}
            {pages > 1 && ` · page ${page} of ${pages}`}
          </p>

          {testimonials.length === 0 ? (
            <div className="py-16 text-center text-gray-600">
              <p className="text-lg font-medium">{q ? 'No reviews match your search.' : 'No reviews to show yet.'}</p>
              {q && (
                <Link href="/testimonials" className="mt-3 inline-block py-1 text-sm text-gold-700 underline">
                  Show all reviews
                </Link>
              )}
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                testimonials.length === 1
                  ? 'grid-cols-1 max-w-xl'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          )}

          {/* Previous / next */}
          {pages > 1 && (
            <nav aria-label="Review pages" className="mt-10 flex items-center justify-between">
              {page > 1 ? (
                <Link
                  href={href(q, page - 1)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-[#102a43] hover:border-gold-500"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Newer
                </Link>
              ) : (
                <span />
              )}
              {page < pages && (
                <Link
                  href={href(q, page + 1)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-[#102a43] hover:border-gold-500"
                >
                  Older <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </nav>
          )}

          <div className="mt-14 rounded-2xl bg-gray-50 p-8 text-center">
            <h2 className="text-xl font-bold text-[#102a43]">Ready to talk about your site?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
              Tell us what you need cleaned and how often, and we&apos;ll come back with a quote.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#d4a017] px-6 py-3 text-sm font-bold text-[#102a43] hover:bg-[#e8b81a]"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

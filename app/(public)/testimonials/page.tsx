import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { toTestimonialData } from '@/lib/testimonials'
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

const pagerLink =
  'inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#102a43] transition-colors hover:border-[#d4a017] hover:bg-[#d4a017]/10'

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

  const rows = await prisma.testimonial.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  })
  const testimonials = rows.map(toTestimonialData)

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 py-14 text-white lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-72 w-[36rem] max-w-full rounded-full bg-[#d4a017]/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-300">What Our Clients Say</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Client Reviews</h1>
          <span aria-hidden="true" className="mt-5 block h-1 w-12 rounded-full bg-[#d4a017]" />
          <p className="mt-5 max-w-2xl text-lg text-gray-300">
            What our clients say about working with Empire Management Services.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search: only worth showing once there are enough reviews to need it */}
          {totalAll > 3 && (
            <form method="GET" role="search" className="mx-auto mb-8 flex max-w-xl items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <input
                  name="q"
                  type="search"
                  defaultValue={q}
                  maxLength={80}
                  aria-label="Search reviews by name, company or keyword"
                  placeholder="Search by name, company or keyword"
                  className="min-h-[44px] w-full rounded-full border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-sm shadow-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
                />
              </div>
              <button
                type="submit"
                className="min-h-[44px] rounded-full bg-[#102a43] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d4a017] hover:text-[#102a43]"
              >
                Search
              </button>
            </form>
          )}

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600" aria-live="polite">
            <span className="rounded-full bg-white px-4 py-1.5 font-medium shadow-sm ring-1 ring-gray-100">
              {q
                ? `${total} ${total === 1 ? 'review matches' : 'reviews match'} “${q}”`
                : `${total} ${total === 1 ? 'review' : 'reviews'}`}
              {pages > 1 && ` · page ${page} of ${pages}`}
            </span>
            {q && (
              <Link
                href="/testimonials"
                className="inline-flex min-h-[44px] items-center gap-1 rounded-full px-3 font-semibold text-gold-700 hover:text-[#102a43]"
              >
                <X className="h-4 w-4" aria-hidden="true" /> Clear search
              </Link>
            )}
          </div>

          {testimonials.length === 0 ? (
            <div className="py-16 text-center text-gray-600">
              <p className="text-lg font-medium">{q ? 'No reviews match your search.' : 'No reviews to show yet.'}</p>
              {q && (
                <Link href="/testimonials" className="mt-3 inline-block py-1 text-sm text-gold-700 underline">
                  Show all reviews
                </Link>
              )}
            </div>
          ) : testimonials.length === 1 ? (
            <div className="mx-auto max-w-3xl">
              <TestimonialCard t={testimonials[0]} featured />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          )}

          {/* Previous / next */}
          {pages > 1 && (
            <nav aria-label="Review pages" className="mt-10 flex items-center justify-between">
              {page > 1 ? (
                <Link href={href(q, page - 1)} className={pagerLink}>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Newer
                </Link>
              ) : (
                <span />
              )}
              {page < pages && (
                <Link href={href(q, page + 1)} className={pagerLink}>
                  Older <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </nav>
          )}

          <div className="relative mt-16 overflow-hidden rounded-3xl bg-navy-900 p-8 text-center text-white sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-[30rem] max-w-full -translate-x-1/2 rounded-full bg-[#d4a017]/15 blur-3xl"
            />
            <div className="relative">
              <h2 className="text-2xl font-bold">Ready to talk about your site?</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-300">
                Tell us what you need cleaned and how often, and we&apos;ll come back with a quote.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#d4a017] px-7 py-3 text-sm font-bold text-[#102a43] transition-colors hover:bg-[#e8b81a]"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

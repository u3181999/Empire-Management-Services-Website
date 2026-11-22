import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { toTestimonialData } from '@/lib/testimonials'
import TestimonialCard from './TestimonialCard'
import TestimonialsCarousel from './TestimonialsCarousel'

// How many reviews the home page shows. Anything beyond this is on the Reviews page (/testimonials).
const HOME_LIMIT = 6

export default async function TestimonialsSection() {
  const where = { isPublished: true }
  const [rows, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: HOME_LIMIT,
    }),
    prisma.testimonial.count({ where }),
  ])

  if (rows.length === 0) return null
  const testimonials = rows.map(toTestimonialData)

  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 text-white" aria-labelledby="reviews-heading">
      {/* A soft gold glow behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[44rem] max-w-full -translate-x-1/2 rounded-full bg-[#d4a017]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold-300">What Our Clients Say</p>
          <h2 id="reviews-heading" className="text-3xl font-bold sm:text-4xl">
            Reviews &amp; Testimonials
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[#d4a017]" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-navy-200">
            Trusted by leading organisations across Canberra and New South Wales.
          </p>
        </div>

        {/* One or two reviews are centred and larger so the section never looks half empty; three or more slide. */}
        {testimonials.length === 1 ? (
          <div className="mx-auto max-w-3xl">
            <TestimonialCard t={testimonials[0]} featured />
          </div>
        ) : testimonials.length === 2 ? (
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        ) : (
          <TestimonialsCarousel label="Client reviews">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </TestimonialsCarousel>
        )}

        {/* Only appears once there are more reviews than the home page can show. */}
        {total > testimonials.length && (
          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#d4a017] hover:bg-[#d4a017] hover:text-[#102a43]"
            >
              Read all {total} reviews <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

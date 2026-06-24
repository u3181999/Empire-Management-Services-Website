import { prisma } from '@/lib/prisma'
import { Star, ExternalLink } from 'lucide-react'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'fill-[#d4a017] text-[#d4a017]' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

export default async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    take: 6,
  })

  if (testimonials.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#d4a017] mb-2">
            What Our Clients Say
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102a43]">Reviews & Testimonials</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm">
            Trusted by leading organisations across Canberra and New South Wales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <StarRating rating={t.rating} />
                <span className="text-xs text-gray-400 font-medium">{t.source}</span>
              </div>

              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="font-semibold text-[#102a43] text-sm">{t.authorName}</p>
                  {(t.authorTitle || t.company) && (
                    <p className="text-xs text-gray-500">
                      {[t.authorTitle, t.company].filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
                {t.reviewUrl && (
                  <a
                    href={t.reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4a017] hover:text-[#102a43] transition-colors shrink-0"
                    aria-label="View original review"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

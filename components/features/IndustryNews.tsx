import { ArrowUpRight } from 'lucide-react'
import { getCleaningNews } from '@/lib/news'

export default async function IndustryNews({ limit = 5 }: { limit?: number }) {
  const items = await getCleaningNews(limit)

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg font-medium">Industry news is temporarily unavailable.</p>
        <p className="mt-2 text-sm">Please check back soon.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-[#d4a017] hover:shadow-md transition-all flex flex-col"
          >
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-wider">
              {item.source}
            </span>
            {/* Headline and link only: the publishers' article text is not reproduced here. */}
            <h3 className="mt-2 flex-1 font-bold text-[#102a43] group-hover:text-gold-700 transition-colors line-clamp-4">
              {item.title}
            </h3>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
              <time dateTime={item.publishedAt.toISOString()}>
                {item.publishedAt.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span className="inline-flex items-center gap-1 text-[#102a43] font-medium">
                Read at {item.source} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-600">
        Headlines link to the original publisher, whose copyright applies to the articles. Empire Management
        Services is not responsible for the content of external websites.
      </p>
    </>
  )
}

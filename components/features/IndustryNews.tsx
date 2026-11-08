import { ArrowUpRight, Newspaper } from 'lucide-react'
import { getCleaningNews } from '@/lib/news'

export default async function IndustryNews() {
  const items = await getCleaningNews(6)

  // If every feed is unreachable the section simply does not appear.
  if (items.length === 0) return null

  return (
    <section className="py-14 bg-white border-t border-gray-100" aria-labelledby="industry-news-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Newspaper className="w-6 h-6 text-[#d4a017]" aria-hidden="true" />
          <h2 id="industry-news-heading" className="text-2xl font-bold text-[#102a43]">
            Cleaning Industry News
          </h2>
        </div>
        <p className="text-gray-500 text-sm mb-8 sm:ml-9">
          The latest headlines from trusted cleaning industry publications, updated automatically.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-[#d4a017] hover:shadow-md transition-all flex flex-col"
            >
              <span className="text-xs font-semibold text-[#d4a017] uppercase tracking-wider">
                {item.source}
              </span>
              <h3 className="mt-2 font-bold text-[#102a43] group-hover:text-[#d4a017] transition-colors line-clamp-3">
                {item.title}
              </h3>
              {item.summary && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-3 flex-1">{item.summary}</p>
              )}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
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

        <p className="mt-6 text-xs text-gray-400">
          Headlines link to the original publishers. Empire Management Services is not responsible for
          the content of external websites.
        </p>
      </div>
    </section>
  )
}

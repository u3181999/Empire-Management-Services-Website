import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Search } from 'lucide-react'
import IndustryNews from '@/components/features/IndustryNews'
import type { Metadata } from 'next'
import { fitTitle, pageSeo } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageSeo('/blog'),
  title: fitTitle('Cleaning Tips & Industry News'),
  description:
    'Commercial cleaning tips, industry news and practical insights from the Empire Management Services team in Canberra, for building and facility managers.',
}

export default async function BlogPage(props: PageProps<'/blog'>) {
  const searchParams = await props.searchParams
  const query = typeof searchParams?.q === 'string' ? searchParams.q : ''
  const categorySlug = typeof searchParams?.category === 'string' ? searchParams.category : undefined
  // The "Industry News" button also shows automatic Australian headlines (not while searching).
  const showNews = categorySlug === 'industry-news' && !query

  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        isPublished: true,
        ...(categorySlug ? { category: { slug: categorySlug } } : {}),
        ...(query
          ? {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { excerpt: { contains: query, mode: 'insensitive' } },
                { content: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
      take: 20,
    }),
    prisma.blogCategory.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Blog</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Cleaning tips, industry news, and insights from our team.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <form method="GET" className="flex gap-3 mb-8 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
              <input
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#102a43] text-white font-semibold text-sm rounded-lg hover:bg-[#0b1f31] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href="/blog"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !categorySlug
                    ? 'bg-[#102a43] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog?category=${cat.slug}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    categorySlug === cat.slug
                      ? 'bg-[#102a43] text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Posts */}
          {posts.length === 0 ? (
            showNews ? null : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg font-medium">No posts found.</p>
              {query && (
                <Link href="/blog" className="mt-3 text-gold-700 underline text-sm">
                  Clear search
                </Link>
              )}
            </div>
            )
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#d4a017] hover:shadow-md transition-all flex flex-col"
                >
                  {post.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    {post.category && (
                      <span className="text-xs font-semibold text-gold-700 uppercase tracking-wider mb-2">
                        {post.category.name}
                      </span>
                    )}
                    <h2 className="font-bold text-[#102a43] group-hover:text-[#d4a017] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-gray-600">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Automatic Australian headlines, shown under the Industry News button */}
          {showNews && (
            <div className={posts.length > 0 ? 'mt-14' : ''}>
              <h2 className="text-2xl font-bold text-[#102a43]">Latest Australian cleaning industry headlines</h2>
              <p className="mt-1 mb-8 text-sm text-gray-500">
                Updated automatically from Australian cleaning industry publications.
              </p>
              <IndustryNews limit={5} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

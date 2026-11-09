import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { LOCATIONS, SERVICES } from '@/lib/constants'
import { SITE_URL } from '@/lib/site'

const BASE_URL = SITE_URL

// Pages and services come from the code (the same lists that build the pages), so they are always in the sitemap,
// whatever state the database is in. Only blog posts come from the database.
//
// `lastModified` is given only where it is true: a blog post's own updated date. Pages built from code have no
// real "last changed" date, and saying "just now" on every visit teaches Google to ignore the field.
// `changeFrequency` and `priority` are hints that Google ignores; they are kept only as a rough order of importance.
const STATIC_PATHS: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/booking', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/employment', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/compliance', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/accessibility', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // If the database is unreachable the sitemap still lists every page that comes from code. The failure is logged
  // (Vercel > Logs) rather than hidden; saving or deleting a blog post regenerates the sitemap.
  const blogPosts = await prisma.blogPost
    .findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })
    .catch((error) => {
      console.error('[sitemap] could not read blog posts, listing the other pages only', error instanceof Error ? error.message : error)
      return []
    })

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency,
    priority,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.id}`,
    changeFrequency: 'monthly' as const,
    priority: loc.isHeadOffice ? 0.8 : 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...locationRoutes, ...serviceRoutes, ...blogRoutes]
}

import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { LOCATIONS } from '@/lib/constants'

const BASE_URL = 'https://empirecleaning.com.au'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, services] = await Promise.all([
    prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    }).catch(() => []),
    prisma.service.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    }).catch(() => []),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/booking`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/employment`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: loc.isHeadOffice ? 0.8 : 0.6,
  }))

  return [...staticRoutes, ...locationRoutes, ...blogRoutes, ...serviceRoutes]
}

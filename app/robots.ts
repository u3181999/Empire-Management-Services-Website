import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /admin is deliberately not listed: robots.txt is public, so listing it only advertises where the login is.
        // Every admin page already says noindex (app/(admin)/admin/layout.tsx) and requires a signed-in session, and a
        // page blocked here could never be crawled to read its noindex. /api holds only machine endpoints.
        disallow: ['/api'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

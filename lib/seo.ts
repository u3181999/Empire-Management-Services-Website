import type { Metadata } from 'next'
import { COMPANY } from '@/lib/constants'
import { SITE_URL } from '@/lib/site'

/** Absolute URL on the public domain for a path like "/about". */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === '/' ? '' : path}`
}

/**
 * A page's canonical URL plus the matching og:url.
 *
 * Pass the page's own clean path, with no query string. That is the point of a canonical:
 * /contact?service=carpet-cleaning and /blog?category=news are the same pages as /contact and /blog,
 * so search engines should treat the clean URL as the one to index and rank.
 *
 * Every page sets its own: a site-wide canonical in the root layout would be inherited by every page
 * and tell Google they are all the homepage. `siteName`/`locale` are repeated because a page's
 * `openGraph` replaces (rather than merges with) the layout's.
 *
 * Pass `article` for a blog post so it is described as an article with its dates.
 */
export function pageSeo(
  path: string,
  article?: { publishedTime?: Date | null; modifiedTime?: Date | null },
): Pick<Metadata, 'alternates' | 'openGraph'> {
  const base = { url: path, siteName: COMPANY.name, locale: 'en_AU' }
  return {
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...base,
          type: 'article',
          publishedTime: article.publishedTime?.toISOString(),
          modifiedTime: article.modifiedTime?.toISOString(),
        }
      : { ...base, type: 'website' },
  }
}

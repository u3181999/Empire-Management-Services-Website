import type { Metadata } from 'next'
import { COMPANY, OFFICE_HOURS, SERVICES } from '@/lib/constants'
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

// ─── Titles and descriptions that fit in search results ───────────────────────────────────────────
// Google shows roughly 60 characters of a title and 155 of a description, then cuts them off with "...".
// These helpers choose the fullest wording that still fits, so a long page name is never chopped mid-word.

export const TITLE_MAX = 60
export const DESCRIPTION_MAX = 155

const BRAND_LONG = ' | Empire Management Services'
const BRAND_SHORT = ' | Empire'

/** Cut at a word boundary and add an ellipsis. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), 1)).replace(/[ ,;:.—–-]+$/, '') + '…'
}

/**
 * A page title with the company name on the end, using the longest form that fits in 60 characters:
 * "<name> | Empire Management Services", then "<name> | Empire", then the name alone, then a clipped name.
 * Returned as { absolute } so the layout's title template does not add the company name a second time.
 * Pass `extra` (e.g. "Canberra") to try "<name> <extra>" first; it is dropped if it does not fit.
 */
export function fitTitle(name: string, extra?: string): { absolute: string } {
  const bases = extra ? [`${name} ${extra}`, name] : [name]
  for (const base of bases) {
    for (const brand of [BRAND_LONG, BRAND_SHORT]) {
      if ((base + brand).length <= TITLE_MAX) return { absolute: base + brand }
    }
  }
  const last = bases[bases.length - 1]
  return { absolute: clip(last, TITLE_MAX) }
}

/**
 * A meta description: the page's own sentence, plus the first of the optional `extras` that keeps it within 155
 * characters. List the most helpful (and longest) ending first.
 */
export function fitDescription(base: string, extras: string[] = []): string {
  for (const extra of extras) {
    const full = `${base} ${extra}`
    if (full.length <= DESCRIPTION_MAX) return full
  }
  return clip(base, DESCRIPTION_MAX)
}

// ─── Structured data (schema.org JSON-LD) ──────────────────────────────────────────────────────────
// Only describe what is actually visible on the page the data sits on (Google's rule), and only claim
// what we can stand behind: no star ratings (a single self-published testimonial does not qualify),
// no headcount. Builders return plain objects without "@context"; <JsonLd> adds it.

type Thing = Record<string, unknown>

/** Stable id so the business can be referred to from other schema blocks. */
export const ORG_ID = `${SITE_URL}/#organization`

// 02 6228 1777 -> +61 2 6228 1777 (international format, which is what search engines prefer)
const TELEPHONE = `+61 ${COMPANY.phone.replace(/^0/, '')}`

const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Australian Capital Territory' },
  { '@type': 'AdministrativeArea', name: 'New South Wales' },
]

/** The cleaning business itself: address, phone, hours, area served and the services it offers. */
export function localBusinessSchema(): Thing {
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': ORG_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: absoluteUrl('/logo.png'),
    image: [absoluteUrl('/logo.png'), absoluteUrl('/parliament-house.jpg')],
    description: COMPANY.description,
    telephone: TELEPHONE,
    email: COMPANY.email,
    foundingDate: String(COMPANY.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address,
      addressLocality: COMPANY.suburb,
      addressRegion: COMPANY.state,
      postalCode: COMPANY.postcode,
      addressCountry: 'AU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: COMPANY.geo.latitude, longitude: COMPANY.geo.longitude },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...OFFICE_HOURS.schema.days],
        opens: OFFICE_HOURS.schema.opens,
        closes: OFFICE_HOURS.schema.closes,
      },
    ],
    areaServed: AREA_SERVED,
    sameAs: [COMPANY.social.facebook, COMPANY.social.linkedin].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commercial cleaning services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.shortDescription,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
  }
}

export function websiteSchema(): Thing {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY.name,
    inLanguage: 'en-AU',
    publisher: { '@id': ORG_ID },
  }
}

/** One cleaning service, offered by the business, on its own page. */
export function serviceSchema(service: { slug: string; name: string; shortDescription: string; category: string }): Thing {
  const url = absoluteUrl(`/services/${service.slug}`)
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    description: service.shortDescription,
    serviceType: service.name,
    category: service.category,
    url,
    areaServed: AREA_SERVED,
    provider: { '@type': 'LocalBusiness', '@id': ORG_ID, name: COMPANY.name, url: SITE_URL, telephone: TELEPHONE },
  }
}

/** Breadcrumb trail, e.g. Home > Services > Carpet Cleaning. Paths are the clean page paths. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  }
}

export function blogPostSchema(post: {
  title: string
  slug: string
  excerpt: string
  imageUrl: string | null
  publishedAt: Date | null
  updatedAt: Date
  categoryName?: string | null
}): Thing {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title.slice(0, 110), // Google truncates anything longer
    description: post.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: [post.imageUrl ?? absoluteUrl('/opengraph-image')],
    datePublished: (post.publishedAt ?? post.updatedAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    inLanguage: 'en-AU',
    ...(post.categoryName ? { articleSection: post.categoryName } : {}),
    author: { '@type': 'Organization', name: COMPANY.name, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: COMPANY.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png') },
    },
  }
}

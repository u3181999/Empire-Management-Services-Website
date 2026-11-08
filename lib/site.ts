// Single source of truth for the public domain. To move the site to a different
// domain, set NEXT_PUBLIC_SITE_URL in the hosting environment (no code change).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://empirecleaning.com.au').replace(/\/$/, '')

export const SITE_DOMAIN = new URL(SITE_URL).hostname.replace(/^www\./, '')

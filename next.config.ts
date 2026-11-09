import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

// Stop a live deployment going out with a sign-in address that points at a developer's computer. With
// NEXTAUTH_URL=http://localhost:3000 left in the Vercel settings, admin sign-in would bounce visitors to localhost.
// Only checked for real production deployments on Vercel (VERCEL_ENV), never for local builds or previews.
if (process.env.VERCEL_ENV === 'production') {
  for (const name of ['NEXTAUTH_URL', 'AUTH_URL', 'NEXT_PUBLIC_SITE_URL']) {
    if (/localhost|127\.0\.0\.1/.test(process.env[name] ?? '')) {
      throw new Error(
        `${name} is "${process.env[name]}" in this production deployment. Set it to the live address ` +
          '(for example https://empirecleaning.com.au) in Vercel > Settings > Environment Variables, then redeploy.',
      )
    }
  }
}

// Content-Security-Policy (production only: the dev server needs eval and websockets for hot reload).
//
// 'unsafe-inline' is kept for scripts and styles because Next.js writes small inline <script> blocks
// to hydrate pages and a nonce-based policy would force every page to render dynamically (no static
// pages, slower, costlier). The other directives still do real work: no plugins, no framing of this
// site, no base-tag or form hijacking, and frames/connections only to the places we use.
//
// What each source is for:
//   img-src https:   OpenStreetMap map tiles (Leaflet), blog images, link previews
//   frame-src google the Google Maps embed on the NSW location page
//   connect-src self Vercel Web Analytics reports to our own domain (/_vercel/insights)
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ')

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', 'prisma'],
  poweredByHeader: false, // don't advertise "X-Powered-By: Next.js"
  async redirects() {
    // The news now lives under Blog > Industry News.
    return [
      { source: '/industry-news', destination: '/blog?category=industry-news', permanent: false },
      // The old case-study page made claims we could not substantiate, so it was removed.
      { source: '/commercial', destination: '/services', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // No `preload`: that is a long-lived commitment for the domain and every subdomain.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          ...(isProd ? [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }] : []),
        ],
      },
    ]
  },
};

export default nextConfig;

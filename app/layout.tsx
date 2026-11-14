import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import SessionProvider from '@/components/layout/SessionProvider'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Empire Management Services | Commercial Cleaning Canberra',
    template: '%s | Empire Management Services',
  },
  description:
    'Professional commercial and industrial cleaning services in Canberra (ACT) and New South Wales. 30+ years experience. Strata cleaning and management, government, medical.',
  keywords: [
    'commercial cleaning Canberra',
    'strata management Canberra',
    'strata cleaning',
    'government cleaning',
    'medical centre cleaning',
    'Empire Management Services',
  ],
  authors: [{ name: 'Empire Management Services' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png' },
    // The 192px and 512px Android icons are listed in app/manifest.ts.
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Empire Management Services',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // data-scroll-behavior: the page uses smooth scrolling (globals.css). This tells Next.js to switch it off just while
    // moving between pages, so a link to a spot on another page (like /testimonials#...) lands in the right place.
    <html lang="en-AU" data-scroll-behavior="smooth" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* WCAG 2.4.1: lets keyboard and screen-reader users jump past the header on every page */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}

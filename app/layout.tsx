import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import SessionProvider from '@/components/layout/SessionProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Empire Management Services | Commercial Cleaning Canberra',
    template: '%s | Empire Management Services',
  },
  description:
    'Professional commercial and industrial cleaning services in Canberra, NSW and Queensland. 30+ years experience. Strata, government, medical, industrial cleaning.',
  keywords: [
    'commercial cleaning Canberra',
    'industrial cleaning ACT',
    'strata cleaning',
    'government cleaning',
    'medical centre cleaning',
    'Empire Management Services',
  ],
  authors: [{ name: 'Empire Management Services' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Empire Management Services',
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
    <html lang="en-AU" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
          <SessionProvider>{children}</SessionProvider>
        </body>
    </html>
  )
}

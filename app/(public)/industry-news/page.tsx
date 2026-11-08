import Link from 'next/link'
import IndustryNews from '@/components/features/IndustryNews'
import type { Metadata } from 'next'

// Headlines refresh automatically about every 3 hours.
export const revalidate = 10800

export const metadata: Metadata = {
  title: 'Cleaning Industry News Australia',
  description:
    'The latest Australian commercial cleaning industry news, updated automatically. Headlines link to the original publishers.',
}

export default function IndustryNewsPage() {
  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Industry News</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            The latest Australian cleaning industry headlines, updated automatically. Looking for tips from
            our own team?{' '}
            <Link href="/blog" className="text-[#d4a017] underline underline-offset-2 hover:no-underline">
              Visit our blog
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IndustryNews limit={12} />
        </div>
      </section>
    </>
  )
}

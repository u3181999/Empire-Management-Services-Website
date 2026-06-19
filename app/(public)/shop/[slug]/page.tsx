import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, Mail, ShoppingCart } from 'lucide-react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export async function generateMetadata(props: PageProps<'/shop/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return {}
  return {
    title: `${product.name} — Shop`,
    description: product.description,
  }
}

export default async function ProductPage(props: PageProps<'/shop/[slug]'>) {
  const { slug } = await props.params
  const product = await prisma.product.findUnique({ where: { slug, isActive: true } })
  if (!product) notFound()

  const categoryLabel =
    product.category === 'chemicals' ? 'Cleaning Chemicals' : 'Toiletries & Hygiene'

  return (
    <>
      <section className="bg-[#102a43] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <p className="text-[#d4a017] text-sm font-semibold uppercase tracking-wider">{categoryLabel}</p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1">{product.name}</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">

            <div className="h-80 bg-gradient-to-br from-[#102a43] to-[#1e3a5f] rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-20 h-20 text-white/20" />
            </div>

            <div>
              <p className="text-3xl font-bold text-[#d4a017]">
                ${(product.price / 100).toFixed(2)}
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:info@empiremanagement.com.au?subject=Order Enquiry — ${encodeURIComponent(product.name)}&body=Hi, I'd like to enquire about ordering: ${encodeURIComponent(product.name)}%0A%0AQuantity:%0ADelivery address:%0AContact name:%0APhone:`}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#102a43] text-white font-bold rounded-lg hover:bg-[#0b1f31] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order via Email
                </a>
                <a
                  href="tel:0262281777"
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-[#102a43] text-[#102a43] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call to Order — 02 6228 1777
                </a>
                <a
                  href={`mailto:info@empiremanagement.com.au?subject=Bulk Quote — ${encodeURIComponent(product.name)}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm text-gray-500 hover:text-[#d4a017] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Request a bulk quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AddToCartButton from '@/components/features/AddToCartButton'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata(props: PageProps<'/shop/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage(props: PageProps<'/shop/[slug]'>) {
  const { slug } = await props.params
  const product = await prisma.product.findUnique({ where: { slug, isActive: true } })

  if (!product) notFound()

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
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-6xl">
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-xl" />
              ) : '🧹'}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d4a017]">
                {product.type === 'GIFT_CERTIFICATE' ? 'Gift Certificate' : 'Cleaning Supply'}
              </span>
              <h1 className="text-3xl font-bold text-[#102a43] mt-2">{product.name}</h1>
              <p className="text-3xl font-bold text-[#d4a017] mt-3">
                ${(product.price / 100).toFixed(2)}
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
              {product.type === 'GIFT_CERTIFICATE' && (
                <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
                  Gift certificates are delivered digitally via email with a unique redemption code.
                  Valid for 12 months from purchase.
                </div>
              )}
              <div className="mt-6">
                <AddToCartButton
                  productId={product.id}
                  productName={product.name}
                  price={product.price}
                  type={product.type}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

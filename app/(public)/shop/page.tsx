import Link from 'next/link'
import { ShoppingCart, Droplets, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Shop — Toiletries & Cleaning Chemicals',
  description:
    'Order professional-grade toiletries and cleaning chemicals from Empire Management Services. Available for sale and bulk order across Canberra and NSW.',
}

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true, type: 'PHYSICAL' },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  })

  const toiletries = products.filter((p) => p.category === 'toiletries')
  const chemicals = products.filter((p) => p.category === 'chemicals')

  return (
    <>
      <section className="bg-[#102a43] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold">Shop</h1>
          <p className="mt-4 text-gray-300 max-w-2xl text-lg">
            Professional-grade toiletries and cleaning chemicals available for purchase or bulk order.
            Delivered across Canberra and NSW.
          </p>
        </div>
      </section>

      <div className="bg-[#d4a017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-medium text-[#102a43]">
          <span>Need a custom bulk order or can't find what you're looking for?</span>
          <a
            href="tel:0262281777"
            className="flex items-center gap-1.5 underline underline-offset-2 hover:no-underline whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" /> Call 02 6228 1777
          </a>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <ProductSection
            title="Toiletries & Hygiene"
            subtitle="Restroom consumables and hygiene products for commercial facilities."
            icon={<Droplets className="w-6 h-6 text-[#d4a017]" aria-hidden="true" />}
            products={toiletries}
            categoryLabel="Toiletries"
          />

          <ProductSection
            title="Cleaning Chemicals"
            subtitle="Professional-grade chemicals for commercial and industrial cleaning applications."
            icon={<ShoppingCart className="w-6 h-6 text-[#d4a017]" aria-hidden="true" />}
            products={chemicals}
            categoryLabel="Chemical"
          />
        </div>
      </section>
    </>
  )
}

type Product = { id: string; slug: string; name: string; description: string; price: number }

function ProductSection({
  title,
  subtitle,
  icon,
  products,
  categoryLabel,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  products: Product[]
  categoryLabel: string
}) {
  if (products.length === 0) return null

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-2xl font-bold text-[#102a43]">{title}</h2>
      </div>
      <p className="text-gray-500 text-sm mb-8 ml-9">{subtitle}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} category={categoryLabel} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product, category }: { product: Product; category: string }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-[#d4a017] hover:shadow-md transition-all flex flex-col"
    >
      <div className="h-40 bg-gradient-to-br from-[#102a43] to-[#1e3a5f] flex items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-white/30" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-xs font-semibold text-[#d4a017] uppercase tracking-wider">{category}</span>
        <h3 className="font-bold text-[#102a43] mt-1 group-hover:text-[#d4a017] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-2 flex-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-[#102a43]">
            ${(product.price / 100).toFixed(2)}
          </p>
          <span className="text-xs bg-[#102a43] text-white px-3 py-1 rounded-full group-hover:bg-[#d4a017] group-hover:text-[#102a43] transition-colors font-semibold">
            Order Now
          </span>
        </div>
      </div>
    </Link>
  )
}

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Pencil } from 'lucide-react'
import type { Metadata } from 'next'
import DeleteProductButton from './DeleteProductButton'

export const metadata: Metadata = { title: 'Products — Admin' }

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    where: { type: 'PHYSICAL' },
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  })

  const toiletries = products.filter((p) => p.category === 'toiletries')
  const chemicals = products.filter((p) => p.category === 'chemicals')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#102a43] text-white text-sm font-semibold rounded-lg hover:bg-[#0b1f31] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="space-y-8">
        <ProductGroup title="Toiletries & Hygiene" products={toiletries} />
        <ProductGroup title="Cleaning Chemicals" products={chemicals} />
      </div>
    </div>
  )
}

type Product = Awaited<ReturnType<typeof prisma.product.findMany>>[number]

function ProductGroup({ title, products }: { title: string; products: Product[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-400">{products.length} products</span>
      </div>

      {products.length === 0 ? (
        <p className="px-6 py-8 text-sm text-gray-400">No products in this category yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-6 py-3 text-gray-500 font-medium">Slug</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Price</th>
                <th className="text-center px-6 py-3 text-gray-500 font-medium">Status</th>
                <th className="text-right px-6 py-3 text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{p.slug}</td>
                  <td className="px-6 py-4 text-right text-gray-700">
                    ${(p.price / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {p.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} name={p.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

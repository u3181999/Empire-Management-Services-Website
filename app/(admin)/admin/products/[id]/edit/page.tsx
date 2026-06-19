import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { updateProduct } from '@/app/actions/admin'
import ProductForm from '../../ProductForm'

export const metadata: Metadata = { title: 'Edit Product — Admin' }

export default async function EditProductPage(props: PageProps<'/admin/products/[id]/edit'>) {
  const { id } = await props.params
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Product</h1>
      <p className="text-sm text-gray-400 mb-8">{product.name}</p>
      <ProductForm action={updateProduct} product={product} />
    </div>
  )
}

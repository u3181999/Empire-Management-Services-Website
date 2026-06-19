import type { Metadata } from 'next'
import { createProduct } from '@/app/actions/admin'
import ProductForm from '../ProductForm'

export const metadata: Metadata = { title: 'Add Product — Admin' }

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Add Product</h1>
      <ProductForm action={createProduct} />
    </div>
  )
}

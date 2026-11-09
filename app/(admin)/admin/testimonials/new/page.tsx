import { createTestimonial } from '@/app/actions/admin'
import TestimonialForm from '../TestimonialForm'
import type { Metadata } from 'next'
import { requireAdminPage } from '@/lib/admin-guard'

export const metadata: Metadata = { title: 'New Testimonial — Admin' }

export default async function NewTestimonialPage() {
  await requireAdminPage()
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  )
}

import { createTestimonial } from '@/app/actions/admin'
import TestimonialForm from '../TestimonialForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'New Testimonial — Admin' }

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Testimonial</h1>
      <TestimonialForm action={createTestimonial} />
    </div>
  )
}

import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { updateTestimonial } from '@/app/actions/admin'
import TestimonialForm from '../TestimonialForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Edit Testimonial — Admin' }

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const testimonial = await prisma.testimonial.findUnique({ where: { id } })
  if (!testimonial) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Testimonial</h1>
      <TestimonialForm action={updateTestimonial} testimonial={testimonial} />
    </div>
  )
}

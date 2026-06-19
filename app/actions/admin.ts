'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

async function requireAdmin() {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')
}

const bookingStatusSchema = z.object({
  bookingId: z.string().cuid(),
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
})

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin()

  const parsed = bookingStatusSchema.safeParse({
    bookingId: formData.get('bookingId'),
    status: formData.get('status'),
  })

  if (!parsed.success) return

  await prisma.booking.update({
    where: { id: parsed.data.bookingId },
    data: { status: parsed.data.status },
  })

  revalidatePath('/admin/bookings')
}

const blogPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(10),
  imageUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
  categoryId: z.string().optional().or(z.literal('')),
})

export async function saveBlogPost(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  const parsed = blogPostSchema.safeParse({
    id: formData.get('id') || undefined,
    title: formData.get('title'),
    slug: formData.get('slug'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    imageUrl: formData.get('imageUrl') || undefined,
    isPublished: formData.get('isPublished') === 'true',
    categoryId: formData.get('categoryId') || undefined,
  })

  if (!parsed.success) {
    return { success: false, error: 'Invalid form data.' }
  }

  const { id, ...data } = parsed.data

  const postData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    imageUrl: data.imageUrl || null,
    isPublished: data.isPublished,
    publishedAt: data.isPublished ? new Date() : null,
    categoryId: data.categoryId || null,
  }

  if (id) {
    await prisma.blogPost.update({ where: { id }, data: postData })
  } else {
    await prisma.blogPost.create({ data: postData })
  }

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  return { success: true }
}

// ── Product CRUD ──────────────────────────────────────────────────────────────

const productSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers and hyphens'),
  description: z.string().min(5),
  price: z.coerce.number().int().min(0),
  category: z.enum(['toiletries', 'chemicals']),
  isActive: z.preprocess((v) => v === 'true' || v === true, z.boolean()).default(true),
})

export async function createProduct(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  const parsed = productSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    isActive: formData.get('isActive'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  try {
    await prisma.product.create({ data: parsed.data })
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') {
      return { success: false, error: 'A product with this slug already exists.' }
    }
    throw e
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  return { success: true }
}

export async function updateProduct(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  const id = formData.get('id') as string
  if (!id) return { success: false, error: 'Missing product ID.' }

  const parsed = productSchema.safeParse({
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    price: formData.get('price'),
    category: formData.get('category'),
    isActive: formData.get('isActive'),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message }
  }

  try {
    await prisma.product.update({ where: { id }, data: parsed.data })
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') {
      return { success: false, error: 'A product with this slug already exists.' }
    }
    throw e
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  revalidatePath(`/shop/${parsed.data.slug}`)
  return { success: true }
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin()
  const id = z.string().parse(formData.get('id'))
  await prisma.product.delete({ where: { id } })
  revalidatePath('/admin/products')
  revalidatePath('/shop')
}

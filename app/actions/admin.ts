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
  id: z.string().cuid().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.').max(200, 'Title must be 200 characters or fewer.'),
  slug: z
    .string()
    .min(3, 'Web address must be at least 3 characters.')
    .max(200, 'Web address must be 200 characters or fewer.')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Web address can only use lowercase letters, numbers and single hyphens (for example: my-first-post).'
    ),
  excerpt: z
    .string()
    .min(10, 'Summary must be at least 10 characters.')
    .max(500, 'Summary must be 500 characters or fewer.'),
  content: z.string().min(10, 'The post body must be at least 10 characters.'),
  imageUrl: z.string().url('Image address must be a full link starting with https://').optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
  categoryId: z.string().optional().or(z.literal('')),
})

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// If the author typed plain text (no HTML tags), turn blank-line separated
// paragraphs into <p> tags so the post keeps its paragraph breaks.
function toHtml(content: string) {
  if (/<[a-z][\s\S]*>/i.test(content)) return content
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n')
}

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
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' }
  }

  const { id, ...data } = parsed.data

  const existing = id ? await prisma.blogPost.findUnique({ where: { id } }) : null
  if (id && !existing) return { success: false, error: 'This post no longer exists.' }

  const postData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: toHtml(data.content),
    imageUrl: data.imageUrl || null,
    isPublished: data.isPublished,
    // Keep the original publish date when editing an already-published post.
    publishedAt: data.isPublished ? (existing?.publishedAt ?? new Date()) : null,
    categoryId: data.categoryId || null,
  }

  try {
    if (id) {
      await prisma.blogPost.update({ where: { id }, data: postData })
    } else {
      await prisma.blogPost.create({ data: postData })
    }
  } catch (e: unknown) {
    if ((e as { code?: string }).code === 'P2002') {
      return { success: false, error: 'Another post already uses this web address. Please change it.' }
    }
    throw e
  }

  revalidatePath('/blog')
  revalidatePath(`/blog/${data.slug}`)
  if (existing && existing.slug !== data.slug) revalidatePath(`/blog/${existing.slug}`)
  revalidatePath('/admin/blog')
  revalidatePath('/sitemap.xml')
  return { success: true }
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin()
  const id = z.string().cuid().parse(formData.get('id'))
  const post = await prisma.blogPost.delete({ where: { id } })
  revalidatePath('/blog')
  revalidatePath(`/blog/${post.slug}`)
  revalidatePath('/admin/blog')
  revalidatePath('/sitemap.xml')
}

// ── Testimonial CRUD ──────────────────────────────────────────────────────────

const testimonialSchema = z.object({
  authorName: z.string().min(2).max(100),
  authorTitle: z.string().max(100).optional().or(z.literal('')),
  company: z.string().max(100).optional().or(z.literal('')),
  content: z.string().min(10).max(1000),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  source: z.string().min(1).max(50).default('Google'),
  reviewUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.preprocess((v) => v === 'true' || v === true, z.boolean()).default(false),
  sortOrder: z.coerce.number().int().default(0),
})

export async function createTestimonial(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  const parsed = testimonialSchema.safeParse({
    authorName: formData.get('authorName'),
    authorTitle: formData.get('authorTitle') || undefined,
    company: formData.get('company') || undefined,
    content: formData.get('content'),
    rating: formData.get('rating'),
    source: formData.get('source'),
    reviewUrl: formData.get('reviewUrl') || undefined,
    isPublished: formData.get('isPublished'),
    sortOrder: formData.get('sortOrder'),
  })

  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

  await prisma.testimonial.create({
    data: {
      ...parsed.data,
      authorTitle: parsed.data.authorTitle || null,
      company: parsed.data.company || null,
      reviewUrl: parsed.data.reviewUrl || null,
    },
  })

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return { success: true }
}

export async function updateTestimonial(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  await requireAdmin()

  const idResult = z.string().cuid().safeParse(formData.get('id'))
  if (!idResult.success) return { success: false, error: 'Invalid testimonial ID.' }
  const id = idResult.data

  const parsed = testimonialSchema.safeParse({
    authorName: formData.get('authorName'),
    authorTitle: formData.get('authorTitle') || undefined,
    company: formData.get('company') || undefined,
    content: formData.get('content'),
    rating: formData.get('rating'),
    source: formData.get('source'),
    reviewUrl: formData.get('reviewUrl') || undefined,
    isPublished: formData.get('isPublished'),
    sortOrder: formData.get('sortOrder'),
  })

  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message }

  await prisma.testimonial.update({
    where: { id },
    data: {
      ...parsed.data,
      authorTitle: parsed.data.authorTitle || null,
      company: parsed.data.company || null,
      reviewUrl: parsed.data.reviewUrl || null,
    },
  })

  revalidatePath('/admin/testimonials')
  revalidatePath('/')
  return { success: true }
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin()
  const id = z.string().cuid().parse(formData.get('id'))
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath('/admin/testimonials')
  revalidatePath('/')
}

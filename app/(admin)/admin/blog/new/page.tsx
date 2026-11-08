import { prisma } from '@/lib/prisma'
import { saveBlogPost } from '@/app/actions/admin'
import BlogPostForm from '../BlogPostForm'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'New Post — Admin' }

export default async function NewBlogPostPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Blog Post</h1>
      <BlogPostForm action={saveBlogPost} categories={categories} />
    </div>
  )
}

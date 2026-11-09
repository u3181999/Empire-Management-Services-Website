import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { saveBlogPost } from '@/app/actions/admin'
import BlogPostForm from '../BlogPostForm'
import type { Metadata } from 'next'
import { requireAdminPage } from '@/lib/admin-guard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Edit Post — Admin' }

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage()
  const { id } = await params

  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!post) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Blog Post</h1>
      <BlogPostForm
        action={saveBlogPost}
        categories={categories}
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          imageUrl: post.imageUrl,
          isPublished: post.isPublished,
          categoryId: post.categoryId,
        }}
      />
    </div>
  )
}

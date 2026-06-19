import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Eye, EyeOff } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Blog — Admin' }

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#d4a017] text-[#102a43] font-bold text-sm rounded-lg hover:bg-[#e8b81a] transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Title', 'Category', 'Published', 'Date', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                  <p className="text-xs text-gray-400">/blog/{post.slug}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{post.category?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  {post.isPublished ? (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <Eye className="w-3.5 h-3.5" /> Published
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                      <EyeOff className="w-3.5 h-3.5" /> Draft
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(post.createdAt).toLocaleDateString('en-AU')}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs text-[#d4a017] hover:underline"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  No posts yet. <Link href="/admin/blog/new" className="text-[#d4a017] hover:underline">Create your first post</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

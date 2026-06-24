import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit, Eye, EyeOff, Star } from 'lucide-react'
import { deleteTestimonial } from '@/app/actions/admin'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Testimonials — Admin' }

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#d4a017] text-[#102a43] font-bold text-sm rounded-lg hover:bg-[#e8b81a] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Author', 'Content', 'Rating', 'Source', 'Published', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-gray-500 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{t.authorName}</p>
                  {(t.authorTitle || t.company) && (
                    <p className="text-xs text-gray-400">{[t.authorTitle, t.company].filter(Boolean).join(', ')}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-xs">
                  <p className="line-clamp-2 text-xs">{t.content}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= t.rating ? 'fill-[#d4a017] text-[#d4a017]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{t.source}</td>
                <td className="px-4 py-3">
                  {t.isPublished ? (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <Eye className="w-3.5 h-3.5" /> Published
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                      <EyeOff className="w-3.5 h-3.5" /> Hidden
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/testimonials/${t.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#d4a017] hover:underline"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <button
                        type="submit"
                        className="text-xs text-red-500 hover:underline"
                        onClick={(e) => { if (!confirm('Delete this testimonial?')) e.preventDefault() }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                  No testimonials yet.{' '}
                  <Link href="/admin/testimonials/new" className="text-[#d4a017] hover:underline">
                    Add your first testimonial
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

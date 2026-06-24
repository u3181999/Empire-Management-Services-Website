'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { Testimonial } from '@prisma/client'

type Action = (
  prev: { success: boolean; error?: string } | null,
  formData: FormData
) => Promise<{ success: boolean; error?: string }>

export default function TestimonialForm({
  action,
  testimonial,
}: {
  action: Action
  testimonial?: Testimonial
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) router.push('/admin/testimonials')
  }, [state, router])

  return (
    <form action={formAction} className="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-2xl">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}

      {state?.error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author Name <span className="text-red-500">*</span>
          </label>
          <input
            name="authorName"
            defaultValue={testimonial?.authorName}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            name="authorTitle"
            defaultValue={testimonial?.authorTitle ?? ''}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            name="company"
            defaultValue={testimonial?.company ?? ''}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
          <select
            name="source"
            defaultValue={testimonial?.source ?? 'Google'}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
          >
            <option value="Google">Google</option>
            <option value="Direct">Direct</option>
            <option value="Email">Email</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Review Content <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          defaultValue={testimonial?.content}
          required
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Star Rating <span className="text-red-500">*</span>
          </label>
          <select
            name="rating"
            defaultValue={testimonial?.rating ?? 5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} star{r !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={testimonial?.sortOrder ?? 0}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Google Review URL
        </label>
        <input
          name="reviewUrl"
          type="url"
          defaultValue={testimonial?.reviewUrl ?? ''}
          placeholder="https://g.page/r/..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="hidden" name="isPublished" value="false"
        />
        <input
          id="isPublished"
          type="checkbox"
          name="isPublished"
          value="true"
          defaultChecked={testimonial?.isPublished ?? false}
          className="w-4 h-4 accent-[#d4a017]"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Published (visible on site)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 bg-[#d4a017] text-[#102a43] font-bold text-sm rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60"
        >
          {pending ? 'Saving…' : testimonial ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
        <a
          href="/admin/testimonials"
          className="px-5 py-2.5 border border-gray-300 text-gray-600 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}

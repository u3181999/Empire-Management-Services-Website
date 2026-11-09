'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { sanitizeBlogHtml } from '@/lib/sanitize'
import { Bold, Italic, Heading2, Heading3, List, Link2, Pilcrow } from 'lucide-react'

type Action = (
  prev: { success: boolean; error?: string } | null,
  formData: FormData
) => Promise<{ success: boolean; error?: string }>

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string | null
  isPublished: boolean
  categoryId: string | null
}

type ToolbarCommand = 'h2' | 'h3' | 'p' | 'bold' | 'italic' | 'list' | 'link'

const TOOLBAR: { label: string; icon: typeof Bold; command: ToolbarCommand }[] = [
  { label: 'Heading', icon: Heading2, command: 'h2' },
  { label: 'Sub-heading', icon: Heading3, command: 'h3' },
  { label: 'Paragraph', icon: Pilcrow, command: 'p' },
  { label: 'Bold', icon: Bold, command: 'bold' },
  { label: 'Italic', icon: Italic, command: 'italic' },
  { label: 'Bullet list', icon: List, command: 'list' },
  { label: 'Link', icon: Link2, command: 'link' },
]

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017]'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export default function BlogPostForm({
  action,
  post,
  categories,
}: {
  action: Action
  post?: Post
  categories: { id: string; name: string }[]
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const router = useRouter()

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  // Existing posts keep their address unless the author edits it on purpose.
  const [slugTouched, setSlugTouched] = useState(Boolean(post))
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [showPreview, setShowPreview] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (state?.success) router.push('/admin/blog')
  }, [state, router])

  function onTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  // Wrap the selected text (or a placeholder) in HTML tags and keep it selected.
  function wrap(before: string, after: string, placeholder: string) {
    const el = editorRef.current
    if (!el) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const selected = value.slice(start, end) || placeholder
    setContent(value.slice(0, start) + before + selected + after + value.slice(end))
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, start + before.length + selected.length)
    })
  }

  function makeList() {
    const el = editorRef.current
    if (!el) return
    const { selectionStart: start, selectionEnd: end, value } = el
    const selected = value.slice(start, end) || 'First point\nSecond point'
    const items = selected
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `  <li>${line}</li>`)
      .join('\n')
    const html = `<ul>\n${items}\n</ul>`
    setContent(value.slice(0, start) + html + value.slice(end))
    requestAnimationFrame(() => el.focus())
  }

  function addLink() {
    const url = window.prompt('Paste the full link address (it must start with https://)')
    if (!url) return
    if (!/^https?:\/\//i.test(url.trim())) {
      window.alert('That link needs to start with http:// or https://')
      return
    }
    wrap(`<a href="${url.trim()}">`, '</a>', 'link text')
  }

  function runCommand(command: ToolbarCommand) {
    switch (command) {
      case 'h2':
        return wrap('<h2>', '</h2>', 'Heading')
      case 'h3':
        return wrap('<h3>', '</h3>', 'Sub-heading')
      case 'p':
        return wrap('<p>', '</p>', 'Paragraph text')
      case 'bold':
        return wrap('<strong>', '</strong>', 'bold text')
      case 'italic':
        return wrap('<em>', '</em>', 'italic text')
      case 'list':
        return makeList()
      case 'link':
        return addLink()
    }
  }

  const previewHtml = sanitizeBlogHtml(
    /<[a-z][\s\S]*>/i.test(content)
      ? content
      : content
          .split(/\n{2,}/)
          .filter((p) => p.trim())
          .map((p) => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>`)
          .join('')
  )

  return (
    <form action={formAction} className="bg-white rounded-xl shadow-sm p-6 space-y-5 max-w-3xl">
      {post && <input type="hidden" name="id" value={post.id} />}

      {state?.error && (
        <div role="alert" className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Web address <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 whitespace-nowrap">/blog/</span>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            className={inputClass}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Filled in from the title. Lowercase letters, numbers and hyphens only. Changing it later
          breaks any links already shared.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select id="categoryId" name="categoryId" defaultValue={post?.categoryId ?? ''} className={inputClass}>
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Cover image link <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            defaultValue={post?.imageUrl ?? ''}
            placeholder="https://…"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
          Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          maxLength={500}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={`${inputClass} resize-none`}
        />
        <p className="text-xs text-gray-400 mt-1">
          Shown on the blog page and in Google results. {excerpt.length}/500
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Post body <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`px-3 py-1.5 ${!showPreview ? 'bg-[#102a43] text-white' : 'bg-white text-gray-600'}`}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`px-3 py-1.5 ${showPreview ? 'bg-[#102a43] text-white' : 'bg-white text-gray-600'}`}
            >
              Preview
            </button>
          </div>
        </div>

        {!showPreview && (
          <div className="flex flex-wrap gap-1 mb-2" role="toolbar" aria-label="Formatting">
            {TOOLBAR.map(({ label, icon: Icon, command }) => (
              <button
                key={label}
                type="button"
                onClick={() => runCommand(command)}
                title={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100"
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
        )}

        {/* Keep the textarea mounted so the content is submitted from the Preview tab too. */}
        <textarea
          ref={editorRef}
          id="content"
          name="content"
          required
          rows={16}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${inputClass} font-mono ${showPreview ? 'hidden' : ''}`}
        />
        {showPreview && (
          <div className="border border-gray-200 rounded-lg p-5 min-h-[16rem] bg-white">
            {previewHtml ? (
              <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: previewHtml }} />
            ) : (
              <p className="text-sm text-gray-400">Nothing to preview yet.</p>
            )}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-1">
          Select some text and use the buttons above to format it. Plain text works too: leave a blank
          line between paragraphs.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isPublished"
          type="checkbox"
          name="isPublished"
          value="true"
          defaultChecked={post?.isPublished ?? false}
          className="w-4 h-4 accent-[#d4a017]"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
          Published (visible on the website). Leave unticked to save as a draft.
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 bg-[#d4a017] text-[#102a43] font-bold text-sm rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60"
        >
          {pending ? 'Saving…' : post ? 'Update Post' : 'Save Post'}
        </button>
        <Link
          href="/admin/blog"
          className="px-5 py-2.5 border border-gray-300 text-gray-600 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

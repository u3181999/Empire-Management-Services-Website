'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type State = { success: boolean; error?: string } | null

type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category: string
  isActive: boolean
  imageUrl?: string | null
}

export default function ProductForm({
  action,
  product,
}: {
  action: (prev: State, formData: FormData) => Promise<State>
  product?: Product
}) {
  const [state, dispatch, isPending] = useActionState(action, null)
  const router = useRouter()
  const nameRef = useRef<HTMLInputElement>(null)
  const slugRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)

  const [preview, setPreview] = useState<string | null>(product?.imageUrl ?? null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    if (state?.success) router.push('/admin/products')
  }, [state, router])

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!product && slugRef.current && !slugRef.current.dataset.manual) {
      slugRef.current.value = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setUploading(true)

    const fd = new FormData()
    fd.append('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Upload failed')
      setPreview(json.url)
      if (imageUrlRef.current) imageUrlRef.current.value = json.url
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form action={dispatch} className="space-y-6 max-w-2xl">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input ref={imageUrlRef} type="hidden" name="imageUrl" defaultValue={product?.imageUrl ?? ''} />

      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            ref={nameRef}
            name="name"
            required
            defaultValue={product?.name ?? ''}
            onChange={handleNameChange}
            placeholder="e.g. Bulk Hand Soap"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug <span className="text-gray-400 font-normal">(URL identifier)</span>
          </label>
          <input
            ref={slugRef}
            name="slug"
            required
            defaultValue={product?.slug ?? ''}
            placeholder="e.g. bulk-hand-soap-5l"
            onChange={() => {
              if (slugRef.current) slugRef.current.dataset.manual = 'true'
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-400">Lowercase letters, numbers and hyphens only. Cannot be changed later without breaking links.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            defaultValue={product?.category ?? 'toiletries'}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
          >
            <option value="toiletries">Toiletries & Hygiene</option>
            <option value="chemicals">Cleaning Chemicals</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price <span className="text-gray-400 font-normal">(in cents — e.g. 4500 = $45.00)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">¢</span>
            <input
              name="price"
              type="number"
              required
              min={0}
              step={1}
              defaultValue={product?.price ?? ''}
              placeholder="4500"
              className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent"
            />
          </div>
          {product && (
            <p className="mt-1 text-xs text-gray-400">
              Current: ${(product.price / 100).toFixed(2)}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={product?.description ?? ''}
            placeholder="Describe the product, including size/variant, usage, and key features."
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#102a43] focus:border-transparent resize-vertical"
          />
        </div>

        {/* Image upload */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <div className="flex items-start gap-4">
            {preview ? (
              <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                <Image src={preview} alt="Product preview" fill className="object-cover" />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0 bg-gray-50">
                <span className="text-xs text-gray-400 text-center px-2">No image</span>
              </div>
            )}
            <div className="flex-1 space-y-2">
              <label className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-600 font-medium">
                {uploading ? 'Uploading…' : preview ? 'Replace image' : 'Upload image'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="sr-only"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
              </label>
              <p className="text-xs text-gray-400">JPEG, PNG, WebP or GIF · max 5 MB</p>
              {uploadError && (
                <p className="text-xs text-red-600">{uploadError}</p>
              )}
              {preview && (
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null)
                    if (imageUrlRef.current) imageUrlRef.current.value = ''
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="sm:col-span-2 flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            value="true"
            defaultChecked={product?.isActive ?? true}
            className="w-4 h-4 rounded border-gray-300 text-[#102a43] focus:ring-[#102a43]"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Active (visible on shop page)
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="px-6 py-2.5 bg-[#102a43] text-white text-sm font-semibold rounded-lg hover:bg-[#0b1f31] disabled:opacity-60 transition-colors"
        >
          {isPending ? 'Saving…' : product ? 'Save Changes' : 'Add Product'}
        </button>
        <a
          href="/admin/products"
          className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { nanoid } from 'nanoid'
import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP and GIF images are allowed' }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Image must be under 5 MB' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const filename = `${nanoid()}.${ext}`

  // Production (Vercel) has a read-only filesystem, so uploads go to Vercel Blob.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`products/${filename}`, file, { access: 'public' })
    return NextResponse.json({ url: blob.url })
  }

  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Image storage is not configured' }, { status: 500 })
  }

  // Local development fallback
  const dir = join(process.cwd(), 'public', 'products')
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, filename), Buffer.from(await file.arrayBuffer()))

  return NextResponse.json({ url: `/products/${filename}` })
}

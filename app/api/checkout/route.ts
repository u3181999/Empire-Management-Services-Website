import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { checkoutLimiter } from '@/lib/rate-limit'
import { z } from 'zod'

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
})

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1),
  customerEmail: z.string().email().optional(),
  giftCertificateCode: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { success: allowed } = checkoutLimiter.check(20, ip)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const body = await req.json()
  const parsed = checkoutSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { items, customerEmail } = parsed.data

  const products = await prisma.product.findMany({
    where: {
      id: { in: items.map((i) => i.productId) },
      isActive: true,
    },
  })

  if (products.length !== items.length) {
    return NextResponse.json({ error: 'One or more products not found' }, { status: 400 })
  }

  const lineItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!
    return {
      price_data: {
        currency: 'aud',
        product_data: { name: product.name },
        unit_amount: product.price,
      },
      quantity: item.quantity,
    }
  })

  const orderNumber = `ORD-${Date.now()}`

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: customerEmail,
    metadata: {
      orderNumber,
      items: JSON.stringify(items.map((i) => ({ productId: i.productId, quantity: i.quantity }))),
    },
    success_url: `${req.nextUrl.origin}/shop/success?order=${orderNumber}`,
    cancel_url: `${req.nextUrl.origin}/shop/cart`,
  })

  return NextResponse.json({ url: session.url })
}

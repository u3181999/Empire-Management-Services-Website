import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendOrderConfirmation } from '@/lib/email'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: ReturnType<typeof stripe.webhooks.constructEvent>

  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const orderNumber = session.metadata?.orderNumber ?? nanoid(8).toUpperCase()
    const rawItems = session.metadata?.items ? JSON.parse(session.metadata.items) : []

    const products = await prisma.product.findMany({
      where: { id: { in: rawItems.map((i: { productId: string }) => i.productId) } },
    })

    const orderItems = rawItems.map((i: { productId: string; quantity: number }) => {
      const p = products.find((p) => p.id === i.productId)!
      return { productId: p.id, quantity: i.quantity, unitPrice: p.price }
    })

    const total = orderItems.reduce(
      (sum: number, i: { unitPrice: number; quantity: number }) => sum + i.unitPrice * i.quantity,
      0
    )

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'PAID',
        customerName: session.customer_details?.name ?? 'Customer',
        customerEmail: session.customer_email ?? session.customer_details?.email ?? '',
        total,
        stripeSessionId: session.id,
        stripePaymentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
        items: {
          create: orderItems,
        },
      },
    })

    const giftCertItems = orderItems.filter((item: { productId: string; quantity: number; unitPrice: number }) => {
      const p = products.find((p) => p.id === item.productId)
      return p?.type === 'GIFT_CERTIFICATE'
    })

    for (const item of giftCertItems) {
      for (let i = 0; i < item.quantity; i++) {
        await prisma.giftCertificate.create({
          data: {
            code: `EMPIRE-${nanoid(8).toUpperCase()}`,
            amount: item.unitPrice,
            orderId: order.id,
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
        })
      }
    }

    if (order.customerEmail) {
      await sendOrderConfirmation({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        orderNumber,
        items: orderItems.map((i: { unitPrice: number; quantity: number; productId: string }) => {
          const p = products.find((p) => p.id === i.productId)!
          return { name: p.name, quantity: i.quantity, price: i.unitPrice }
        }),
        total,
      })
    }
  }

  return NextResponse.json({ received: true })
}

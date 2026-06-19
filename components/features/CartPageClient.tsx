'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2, ShoppingBag } from 'lucide-react'

type CartItem = {
  productId: string
  productName: string
  price: number
  type: string
  quantity: number
}

export default function CartPageClient() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('empire-cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  function removeItem(productId: string) {
    const updated = cart.filter((i) => i.productId !== productId)
    setCart(updated)
    localStorage.setItem('empire-cart', JSON.stringify(updated))
    window.dispatchEvent(new Event('cart-updated'))
  }

  function updateQty(productId: string, qty: number) {
    if (qty < 1) return removeItem(productId)
    const updated = cart.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
    setCart(updated)
    localStorage.setItem('empire-cart', JSON.stringify(updated))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  async function handleCheckout() {
    setLoading(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        customerEmail: email || undefined,
      }),
    })
    const data = await res.json()
    if (data.url) {
      localStorage.removeItem('empire-cart')
      window.location.href = data.url
    } else {
      alert('Checkout failed. Please try again.')
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
        <Link href="/shop" className="mt-4 inline-block text-[#d4a017] hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {cart.map((item) => (
          <div key={item.productId} className="flex items-center gap-4 p-5 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.productName}</p>
              <p className="text-sm text-gray-500">${(item.price / 100).toFixed(2)} each</p>
            </div>
            {item.type === 'PHYSICAL' ? (
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="px-3 py-1.5 text-gray-500 hover:text-gray-900">−</button>
                <span className="px-3 py-1.5 text-sm">{item.quantity}</span>
                <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="px-3 py-1.5 text-gray-500 hover:text-gray-900">+</button>
              </div>
            ) : (
              <span className="text-sm text-gray-500">×{item.quantity}</span>
            )}
            <p className="text-sm font-bold text-gray-900 w-20 text-right">
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </p>
            <button onClick={() => removeItem(item.productId)} aria-label="Remove item" className="text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${(total / 100).toFixed(2)} AUD</span>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email (for receipt)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3.5 bg-[#d4a017] text-[#102a43] font-bold rounded-lg hover:bg-[#e8b81a] transition-colors disabled:opacity-60 min-h-[44px]"
        >
          {loading ? 'Redirecting to payment…' : 'Proceed to Checkout'}
        </button>
        <Link href="/shop" className="block text-center text-sm text-gray-500 hover:text-[#d4a017] transition-colors">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}

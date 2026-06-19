'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'

type Props = {
  productId: string
  productName: string
  price: number
  type: string
}

export default function AddToCartButton({ productId, productName, price, type }: Props) {
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)

  function handleAddToCart() {
    const cart = JSON.parse(localStorage.getItem('empire-cart') ?? '[]') as {
      productId: string
      productName: string
      price: number
      type: string
      quantity: number
    }[]

    const existing = cart.find((i) => i.productId === productId)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({ productId, productName, price, type, quantity })
    }

    localStorage.setItem('empire-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-3">
      {type === 'PHYSICAL' && (
        <div className="flex items-center gap-3">
          <label htmlFor="qty" className="text-sm font-medium text-gray-700">
            Quantity
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-gray-600 hover:text-[#102a43] transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span id="qty" className="px-4 py-2 text-sm font-medium min-w-[2.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-2 text-gray-600 hover:text-[#102a43] transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 font-bold rounded-lg transition-colors min-h-[44px] ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-[#d4a017] text-[#102a43] hover:bg-[#e8b81a]'
        }`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </>
        )}
      </button>
    </div>
  )
}

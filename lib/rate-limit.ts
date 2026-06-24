import { LRUCache } from 'lru-cache'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
  limit?: number
}

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval ?? 500,
    ttl: options?.interval ?? 60_000,
  })

  return {
    check(limit: number, token: string) {
      const effectiveLimit = options?.limit ?? limit
      const tokenCount = tokenCache.get(token) ?? []
      const now = Date.now()
      const windowStart = now - (options?.interval ?? 60_000)
      const requestsInWindow = tokenCount.filter((t) => t > windowStart)

      if (requestsInWindow.length >= effectiveLimit) {
        return { success: false, remaining: 0 }
      }

      requestsInWindow.push(now)
      tokenCache.set(token, requestsInWindow)

      return { success: true, remaining: effectiveLimit - requestsInWindow.length }
    },
  }
}

export const contactLimiter = rateLimit({ interval: 60_000, limit: 5 })
export const bookingLimiter = rateLimit({ interval: 60_000, limit: 10 })
export const checkoutLimiter = rateLimit({ interval: 60_000, limit: 20 })
export const authLimiter = rateLimit({ interval: 15 * 60_000, limit: 5 })

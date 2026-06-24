import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { authLimiter } from './rate-limit'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials)

        if (!parsed.success) return null

        const { success: allowed } = authLimiter.check(5, parsed.data.email)
        if (!allowed) throw new Error('Too many login attempts. Try again later.')

        const admin = await prisma.admin.findUnique({
          where: { email: parsed.data.email },
        })

        if (!admin) return null

        const valid = await bcrypt.compare(parsed.data.password, admin.password)
        if (!valid) return null

        return { id: admin.id, email: admin.email, name: admin.name }
      },
    }),
  ],
})

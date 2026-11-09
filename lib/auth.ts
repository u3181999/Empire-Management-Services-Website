import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { assertLoginAllowed, recordFailedLogin, clearFailedLogins } from './login-guard'

// Compared against when the email is unknown, so "no such admin" takes as long as "wrong password"
// and the response time does not reveal which emails exist. It MUST use the same bcrypt cost (12) as the
// real admin passwords (see prisma/set-admin-password.ts); a cheaper hash would make unknown emails answer
// measurably faster.
const TIMING_EQUALISER_HASH = '$2b$12$gXKDMKCxa8c7ijf46vjZH.nxIIhhx0zm8qDpATSn25P8E7clRR4w.'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, request) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials)

        if (!parsed.success) return null

        const { email, password } = parsed.data

        // Refuse (with a recognisable error) if this connection has failed too many times recently.
        await assertLoginAllowed(request.headers, email)

        const admin = await prisma.admin.findUnique({ where: { email } })

        const valid = await bcrypt.compare(password, admin?.password ?? TIMING_EQUALISER_HASH)
        if (!admin || !valid) {
          await recordFailedLogin(request.headers, email)
          return null
        }

        await clearFailedLogins(request.headers, email)
        return { id: admin.id, email: admin.email, name: admin.name }
      },
    }),
  ],
})

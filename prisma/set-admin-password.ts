import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

// Usage (PowerShell):
//   $env:NEW_ADMIN_PASSWORD = "your-new-password"; npm run admin:set-password
// The admin's sign-in email is private, so it is read from ADMIN_LOGIN_EMAIL (put it in your local .env file).

const email = process.env.ADMIN_LOGIN_EMAIL
const password = process.env.NEW_ADMIN_PASSWORD

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter } as never)

async function main() {
  if (!email) throw new Error('Set ADMIN_LOGIN_EMAIL (in your local .env file) to the admin sign-in email.')
  if (!password || password.length < 12) {
    throw new Error('Set NEW_ADMIN_PASSWORD to a password of at least 12 characters.')
  }
  if (password === 'ChangeMe123!') {
    throw new Error('Choose a password other than the default seed password.')
  }

  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin) throw new Error(`No admin found with email ${email}`)

  await prisma.admin.update({
    where: { email },
    data: { password: await bcrypt.hash(password, 12) },
  })

  console.log(`✅ Password updated for ${email}`)
}

main()
  .catch((err) => {
    console.error(`❌ ${err.message}`)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())

# Launch Checklist — empirecleaning.com.au

Hosting: Vercel · Database: Neon (PostgreSQL) · Email: Resend · Shop: enquiry-only (no Stripe at launch)

Code status: `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass. Database migrations are applied.

## 1. Before anything else — admin password

The admin account (`admin@empirecleaning.com.au`) was seeded with the default password. Change it
**before** the site is public (PowerShell, from the project folder):

```powershell
$env:NEW_ADMIN_PASSWORD = "choose-a-long-unique-password"; npm run admin:set-password
```

## 2. Vercel project

1. vercel.com → **Add New → Project** → import `u3181999/Empire-Management-Services-Website`.
2. Framework preset: Next.js (auto-detected). Build command stays `npm run build` (runs `prisma generate` via `postinstall`).
3. **Settings → Environment Variables** (Production):

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon connection string (same one used locally, or a dedicated production branch) |
| `NEXTAUTH_SECRET` | A fresh random string: `openssl rand -base64 32` — do not reuse the local one |
| `NEXTAUTH_URL` | `https://empirecleaning.com.au` |
| `RESEND_API_KEY` | From resend.com → API Keys |
| `ADMIN_EMAIL` | Inbox that receives contact-form and booking notifications |
| `BLOB_READ_WRITE_TOKEN` | Added automatically in step 4 |

Leave `STRIPE_*` unset — checkout stays off.

4. **Storage → Create → Blob**, connect it to the project (enables admin product image uploads).
5. Deploy.

## 3. Domain

1. Vercel project → **Settings → Domains** → add `empirecleaning.com.au` and `www.empirecleaning.com.au`.
2. At the domain registrar/DNS host, add the records Vercel shows (typically an `A` record for the apex and a `CNAME` for `www`).
3. Pick the canonical host (apex is what the sitemap/SEO use) and redirect the other to it.
4. HTTPS certificate is issued automatically by Vercel.

## 4. Email (Resend) — contact form and bookings depend on this

1. resend.com → **Domains → Add Domain** → `empirecleaning.com.au` (region: Sydney if offered).
2. Add the SPF / DKIM (and DMARC, recommended) DNS records Resend lists, then click Verify.
3. Mails are sent from `noreply@empirecleaning.com.au`; this only works once the domain is verified.
4. Confirm `ADMIN_EMAIL` points at a mailbox someone checks.

## 5. After deploy — smoke test

- [ ] Home, About, Services, Contact, Blog, Shop, Terms, Privacy all load over https
- [ ] Submit the contact form → email arrives at `ADMIN_EMAIL`
- [ ] Submit a booking → customer confirmation + admin notification arrive
- [ ] `/admin/login` works with the new password; upload a product image in admin
- [ ] `/shop/cart` and `/api/checkout` return 404 (expected while Stripe is off)
- [ ] `https://empirecleaning.com.au/sitemap.xml` and `/robots.txt` load
- [ ] Submit the sitemap in Google Search Console

## Later: turning on card payments

Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Vercel, create a webhook to
`https://empirecleaning.com.au/api/webhooks/stripe` for `checkout.session.completed`, and add a
`/shop/success` page (the checkout redirects there and it does not exist yet). The shop pages also
need "Add to cart" buttons wired back in (`components/features/AddToCartButton.tsx` exists but is unused).

## Known limitations

- The rate limiter (`lib/rate-limit.ts`) is in-memory, so on Vercel it is per serverless instance
  and only a soft protection against spam. Swap for Upstash Redis if abuse appears.

# Launch Checklist — empirecleaning.com.au

Hosting: Vercel · Database: Neon (PostgreSQL, Sydney) · Email: Resend

Code status: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. Database migrations are applied.
Already prepared in the repo: Sydney region + `www` → apex redirect (`vercel.json`), sitemap/robots/SEO and the
email sender all read the domain from one place (`lib/site.ts`) and a link-preview image.

The domain lives in one setting: `NEXT_PUBLIC_SITE_URL`. If the domain ever changes, change that variable
(and `NEXTAUTH_URL`, and the `www` redirect host in `vercel.json`).

## 1. Admin password (do first)

The admin account (`admin@empirecleaning.com.au`) still uses the default seed password. Change it
before the site is public (PowerShell, from the project folder):

```powershell
$env:NEW_ADMIN_PASSWORD = "choose-a-long-unique-password"; npm run admin:set-password
```

## 2. Vercel project (~5 minutes)

1. vercel.com → **Add New → Project** → import `u3181999/Empire-Management-Services-Website`. Framework: Next.js (auto).
2. **Environment Variables → Production:**

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon connection string (from your local `.env`) |
| `NEXTAUTH_SECRET` | A **new** random string: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `NEXTAUTH_URL` | `https://empirecleaning.com.au` |
| `NEXT_PUBLIC_SITE_URL` | `https://empirecleaning.com.au` |
| `ADMIN_EMAIL` | `email@empirecleaning.com.au` |
| `RESEND_API_KEY` | From resend.com → API Keys |

3. Deploy.

## 3. Domain

1. Vercel → **Settings → Domains** → add `empirecleaning.com.au` and `www.empirecleaning.com.au`.
2. At the DNS host, add the records Vercel shows (`A` for the apex, `CNAME` for `www`).
3. `www` redirects to the apex automatically; HTTPS is issued by Vercel.

## 4. Email (Resend) — contact form and bookings depend on this

1. resend.com → **Domains → Add Domain** → `empirecleaning.com.au`.
2. Add the SPF / DKIM (and DMARC, recommended) DNS records, then **Verify**.
3. Mail is sent from `noreply@empirecleaning.com.au` and delivered to `ADMIN_EMAIL`.

## 5. After deploy — smoke test

- [ ] Home, About, Services, Contact, Blog, Terms, Privacy load over https; `www` redirects to apex
- [ ] Contact form → email arrives at `email@empirecleaning.com.au`
- [ ] Booking → customer confirmation + admin notification arrive
- [ ] `/admin/login` works with the new password; the dashboard shows your bookings
- [ ] `/sitemap.xml`, `/robots.txt` load; paste the site into a chat app to see the link preview
- [ ] Submit the sitemap in Google Search Console

## Known limitations

- The rate limiter (`lib/rate-limit.ts`) is in-memory, so on Vercel it is per serverless instance — a soft
  protection against spam only. Swap for Upstash Redis if abuse appears.

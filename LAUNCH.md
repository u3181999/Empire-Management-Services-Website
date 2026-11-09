# Launch Checklist — empirecleaning.com.au

Hosting: Vercel · Database: Neon (PostgreSQL, Sydney) · Email: Resend

Code status: `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. Database migrations are applied.
Already prepared in the repo: Sydney region + `www` → apex redirect (`vercel.json`), sitemap/robots/SEO and the
email sender all read the domain from one place (`lib/site.ts`) and a link-preview image.

The domain lives in one setting: `NEXT_PUBLIC_SITE_URL`. If the domain ever changes, change that variable
(and `NEXTAUTH_URL`, and the `www` redirect host in `vercel.json`).

## 1. Admin password

Done: checked on 9 Nov 2026, the admin account (`admin@empirecleaning.com.au`) no longer uses the default
seed password. To change it again later (PowerShell, from the project folder):

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
| `CRON_SECRET` | A new random string (same command as `NEXTAUTH_SECRET`). Vercel sends it to the daily clean-up job; without it the job refuses to run (safe, but old enquiries are then never deleted) |

3. **Analytics:** Vercel → your project → **Analytics** tab → **Enable**. The code is already in place
   (cookieless; a visitor who presses "Decline" in the cookie banner is not counted). Until it is enabled the
   script URL returns 404, which is harmless.
4. Deploy.

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
- [ ] Contact form → email arrives at `email@empirecleaning.com.au`, **and** the message appears in
      `/admin/enquiries` marked "Emailed". If it shows "Email failed — follow up", the message is safe but
      the email setup (step 4) is wrong; fix that before launch
- [ ] Employment application → same two checks (including the citizenship / clearance answers)
- [ ] Booking → customer confirmation + admin notification arrive
- [ ] Vercel → Project → **Cron Jobs** lists `/api/cron/cleanup` (daily); trigger it once with **Run** and
      confirm it returns `{"ok":true,...}`
- [ ] Vercel → **Analytics** shows your own visit after a minute (not if you pressed Decline)
- [ ] `/admin/login` works with the new password; the dashboard shows your bookings
- [ ] `/sitemap.xml`, `/robots.txt` load; paste the site into a chat app to see the link preview
- [ ] View-source on a page: the `<link rel="canonical">` shows `https://empirecleaning.com.au/...` (this relies on
      `NEXT_PUBLIC_SITE_URL` being set correctly in Vercel)
- [ ] Run Google's [Rich Results Test](https://search.google.com/test/rich-results) on the home page, a service page and a
      blog post: each should detect its items (business, service, article, breadcrumbs) with no errors
- [ ] Sign in once and click through every admin page (Dashboard, Bookings, Enquiries, Blog, Testimonials, and edit one
      of each). Every admin page now double-checks your session, so this proves a signed-in admin is not locked out
- [ ] Submit the sitemap in Google Search Console

## Known limitations

- Form spam protection (`lib/form-guard.ts`): honeypot + minimum fill time + a database-backed rate limit
  (5 per hour per connection; 3 for job applications; booking also caps 3 per email address per day). If a
  determined bot gets through, add Cloudflare Turnstile (free; needs a Cloudflare account and two keys).
- Admin login protection (`lib/login-guard.ts`): 5 failed attempts per connection and email, or 20 per connection,
  blocks sign-in from that connection for 15 minutes. The block is per connection, so it cannot be used to lock you
  out from somewhere else. If you lock yourself out, wait 15 minutes. A distributed attack is limited only by bcrypt and
  your password, so use a long unique password and consider adding two-factor sign-in.
- The privacy policy promises enquiries are deleted after 12 months and applications after 6. The stored copies
  are deleted automatically by the daily job, but copies that were **emailed** to the office stay in the
  mailbox until someone deletes them, so set a reminder to clear them on the same schedule.
- Emails that fail to send are logged (Vercel → Logs, search `notification email failed`) and flagged in
  `/admin/enquiries`; bookings log `email failed` too.

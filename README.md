# Empire Management Services Website

The website for **Empire Management Services**, a commercial cleaning company based in Fyshwick, ACT
(30+ years, 80+ clients, servicing Canberra and NSW from the Canberra head office).

**Live site:** https://empirecleaning.com.au
**Code:** https://github.com/u3181999/Empire-Management-Services-Website

> New to all this? Start with [How the pieces fit together](#how-the-pieces-fit-together), then
> [Going live](#going-live-step-by-step). You do not need to understand the code to launch or run the site.

---

## How the pieces fit together

A website like this is made of several services, each doing one job:

| Piece | What it does | Plain-English analogy |
|---|---|---|
| **GitHub** | Stores the website's code and every past version | The filing cabinet |
| **Vercel** | Runs the website on the internet and rebuilds it whenever the code changes | The shopfront |
| **Neon** | Stores the data: bookings, blog posts, testimonials, the admin login | The records room |
| **Resend** | Sends emails: contact form messages, booking confirmations | The mail room |
| **Your domain** (`empirecleaning.com.au`) | The address people type to find the site | The street address |

**How changes reach the website:** you (or Claude) change the code, it is saved to GitHub, and Vercel
automatically rebuilds and publishes the new version within a couple of minutes. You never copy files to a server.

---

## Going live step by step

Do these in order. Each step says where to click and what you should see. Allow about an hour in total,
plus waiting time for DNS (see step 5).

### Before you start: accounts you need

| Account | Cost | Needed for |
|---|---|---|
| GitHub | Free | Already set up |
| Neon | Free tier | Already set up (the database already exists and is ready) |
| [Vercel](https://vercel.com) | Free "Hobby" to test; **Pro (~US$20/month) for a business site** | Hosting the website |
| [Resend](https://resend.com) | Free tier is enough | Sending emails |

> Vercel's free Hobby plan is for personal, non-commercial use only. Test on Hobby, then upgrade to Pro
> before you launch publicly. Check Vercel's current pricing page.

### Step 1: Change the admin password (do this first)

The admin area (where you manage bookings and the blog) is created with a **default password that anyone
could guess**. Change it before the site is public.

1. Open **PowerShell** and go to the project folder.
2. Run this, replacing the text in quotes with your own long, unique password (at least 12 characters):

```powershell
$env:NEW_ADMIN_PASSWORD = "your-long-unique-password"; npm run admin:set-password
```

3. You should see `Password updated for admin@empirecleaning.com.au`.
4. Save the password in a password manager. Never put it in an email or chat.

### Step 2: Create the website on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Find **Empire-Management-Services-Website** in the list and click **Import**.
3. Leave all the detected settings as they are (Framework: Next.js).
4. Open the **Environment Variables** section and add the rows below. An *environment variable* is just a
   private setting the website reads when it starts. Passwords and keys live here, never in the code.

| Key | Value | Where the value comes from |
|---|---|---|
| `DATABASE_URL` | Long text starting `postgresql://` | Copy from the `.env` file in your project folder |
| `NEXTAUTH_SECRET` | A new random string | Run `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` in PowerShell and copy the result |
| `NEXT_PUBLIC_SITE_URL` | `https://empirecleaning.com.au` | Your domain |
| `ADMIN_EMAIL` | `email@empirecleaning.com.au` | The inbox that receives contact and booking emails |

   Add these **later** (steps 3 and 4): `NEXTAUTH_URL` and `RESEND_API_KEY`.
   Do **not** add `SEED_ADMIN_PASSWORD`; the seed is only used on your own computer.

5. Click **Deploy**. After a minute or two you get a temporary address like
   `empire-management-services-xxxx.vercel.app`. Open it; the site should load.

### Step 3: Set up email (Resend)

Without this, **the contact form and booking emails will not send.**

1. Sign up at [resend.com](https://resend.com).
2. **Domains**, then **Add Domain**, and enter `empirecleaning.com.au`.
3. Resend shows a short list of DNS records (SPF and DKIM). Add them where your domain's DNS is managed
   (usually the company you bought the domain from). See [DNS explained](#dns-explained).
4. Click **Verify** in Resend. It can take from a few minutes up to a day.
5. **API Keys**, then **Create API Key**. Copy it.
6. In Vercel: **Settings**, then **Environment Variables**, and add `RESEND_API_KEY` with that key.
7. Redeploy (Deployments tab, three dots, Redeploy).

### Step 4: Connect your domain

1. In Vercel: **Settings**, then **Domains**, and add `empirecleaning.com.au` and `www.empirecleaning.com.au`.
2. Vercel shows the DNS records to add (usually an `A` record for the main domain and a `CNAME` for `www`).
3. Add them where your domain's DNS is managed, then wait. This can take a few minutes up to 48 hours.
4. When Vercel shows a green tick, add one more setting: `NEXTAUTH_URL` = `https://empirecleaning.com.au`.
   Then redeploy.
5. `www.empirecleaning.com.au` automatically forwards to `empirecleaning.com.au`, and the padlock (HTTPS)
   is set up for you.

### Step 5: Final check

Open the live site and tick off each item:

- [ ] Home, About, Services, Contact, Blog, Terms and Privacy all load
- [ ] Send a test message through the Contact form; it arrives at `email@empirecleaning.com.au`
- [ ] Make a test booking; both the customer confirmation and the admin notification arrive
- [ ] Log in at `/admin/login` with the new password; the dashboard shows your bookings
- [ ] `www.empirecleaning.com.au` forwards to `empirecleaning.com.au`
- [ ] Paste the site address into WhatsApp or Facebook; a preview image appears

### DNS explained

**DNS** is the internet's phone book: it links your domain name to the right server. You edit it at whoever
manages your domain (the registrar or DNS host). In their dashboard look for "DNS", "DNS records" or
"Manage DNS", then add each record exactly as Vercel or Resend shows it (Type, Name/Host, Value). If you are
unsure where your domain is managed, look up `empirecleaning.com.au` at a "whois" website to see the registrar.

---

## Everyday tasks

### Log in to the admin area
Go to `https://empirecleaning.com.au/admin/login`. From there you can manage bookings, blog posts
and testimonials.

### Write or edit a blog post
1. Log in, click **Blog** in the left menu, then **New Post** (or **Edit** next to an existing post).
2. Fill in the **Title**. The web address fills itself in; leave it as it is.
3. Write a short **Summary** (shown on the blog page and in Google results).
4. Write the **Post body**. Select some text and click a button above the box (Heading, Bold, Bullet list,
   Link) to format it. Plain text works too: leave a blank line between paragraphs. Click **Preview** to see
   how it will look.
5. Tick **Published** to put it on the website, or leave it unticked to save a draft. Click **Save Post**.

On the posts list, **View** opens the live post and **Delete** removes a post (it asks first).

### Cleaning industry news (automatic)
On the public **Blog** page, the **Industry News** button shows the latest Australian cleaning industry
headlines from [INCLEAN](https://incleanmag.com.au) (the leading Australian commercial cleaning trade
publication), about every 3 hours, with no work from you. Each card shows the headline, a short teaser and a
link to the publisher's own article; nothing is copied. Stories about lawsuits, court cases, injuries,
recalls, politics and similar are filtered out. If the feed is ever unreachable, a "temporarily
unavailable" message shows. Any posts you write yourself with the category **Industry News** appear above
the headlines.
Developers: the feed list and filter are in `lib/news.ts`. To add another Australian publisher, add a line
to the `FEEDS` list there.

### Change text on the website (for example the Meet the Team section)
1. Open the file on GitHub. The team list is in
   [`app/(public)/about/page.tsx`](https://github.com/u3181999/Empire-Management-Services-Website/blob/main/app/(public)/about/page.tsx).
2. Click the **pencil icon** (Edit this file).
3. Change only the words **inside the quotes**. Do not delete quote marks, commas or `{ }` brackets.
4. Click **Commit changes**. Vercel republishes the site in about two minutes.

Other common places:

| To change... | Edit this file |
|---|---|
| Phone, email, address, opening details | `lib/constants.ts` |
| Meet the Team | `app/(public)/about/page.tsx` |
| Terms of service | `app/(public)/terms/page.tsx` |
| Privacy policy | `app/(public)/privacy/page.tsx` |

If a change breaks the site, Vercel keeps the previous version running. In **Deployments** you can re-publish
an older version with one click.

---

## For developers

### Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4
- **Database:** PostgreSQL (Neon) via Prisma
- **Auth:** NextAuth v5 (credentials-based admin login)
- **Email:** Resend
- **Hosting:** Vercel, Sydney region (`vercel.json`)

### Run it on your own computer

```bash
git clone https://github.com/u3181999/Empire-Management-Services-Website.git
cd Empire-Management-Services-Website
npm install
```

Create a file named `.env` (copy `.env.example`) and fill it in. Then:

```bash
npx prisma migrate deploy   # create the database tables
npm run db:seed             # add starting data (services, blog posts, admin user)
npm run dev                 # start at http://localhost:3000
```

Other commands: `npm run build`, `npm run lint`, `npx tsc --noEmit`, `npx prisma studio` (database viewer).
`npm run admin:set-password` changes the admin password (see Step 1).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string (Neon) |
| `NEXTAUTH_SECRET` | Yes | Random string used to sign admin sessions |
| `NEXTAUTH_URL` | Production | `https://empirecleaning.com.au` |
| `NEXT_PUBLIC_SITE_URL` | Production | Public domain; drives sitemap, SEO and the email sender address |
| `ADMIN_EMAIL` | Yes | Receives contact and booking notifications |
| `RESEND_API_KEY` | Yes | Sends email (domain must be verified in Resend) |
| `SEED_ADMIN_PASSWORD` | Local seed only | Password given to the admin when seeding |

### Main routes

| Route | Description |
|---|---|
| `/`, `/about`, `/contact`, `/employment` | Main pages |
| `/services`, `/services/[slug]`, `/commercial` | Services |
| `/locations/[slug]` | Canberra (head office) and NSW (service area, no NSW office) |
| `/booking` | Online booking form |
| `/blog`, `/blog/[slug]` | Blog |
| `/admin/*` | Protected admin: bookings, blog, testimonials |

### Notes

- Rate limiting is an in-memory cache, so on Vercel it is a soft protection only. Use Redis (Upstash) if spam becomes a problem.
- Blog search uses PostgreSQL LIKE queries; add a `tsvector` GIN index for large-scale search.
- Never commit `.env` files; only `.env.example` (placeholders) is tracked.
- Launch checklist and known limitations: [LAUNCH.md](LAUNCH.md). Project conventions: [CLAUDE.md](CLAUDE.md).

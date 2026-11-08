# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack website for **Empire Management Services** — a commercial cleaning company based in Fyshwick, ACT, Australia (30+ years, 80+ clients). Built with Next.js 16 App Router, PostgreSQL via Prisma, and Resend for email. There is no online shop or payment processing.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (DB GUI)
npx prisma migrate dev --name <name>   # Create and apply a migration
npx prisma migrate deploy              # Apply migrations in production
npx prisma db seed                     # Run seed script
```

## Architecture

### Framework Specifics (Next.js 16)
- `params` and `searchParams` are now **Promises** — always `await` them in pages/layouts
- `cookies()` and `headers()` from `next/headers` are now async — must `await`
- `PageProps<'/route/[slug]'>` and `LayoutProps<'/route'>` are global TypeScript helpers (no import needed)
- `RouteContext<'/api/users/[id]'>` for typing Route Handler context params
- Turbopack is the default bundler; `next build` no longer runs the linter automatically
- Use `refresh()` from `next/cache` to refresh router after mutations; use `revalidatePath` / `revalidateTag` for cache invalidation

### Directory Structure
```
app/
  (public)/          # Public-facing pages wrapped in site layout
  (admin)/           # Admin dashboard, NextAuth-protected
  api/               # Route Handlers (NextAuth)
components/
  layout/            # Header, Footer, Nav
  ui/                # Reusable primitives (Button, Card, Input, etc.)
  features/          # Domain components (BookingForm, ContactForm, etc.)
lib/
  prisma.ts          # Singleton Prisma client
  email.ts           # Resend email helpers
  rate-limit.ts      # In-memory rate limiter (swap for Redis in production)
prisma/
  schema.prisma      # DB schema
  seed.ts            # Seed script
```

### Key Data Models
- `Location` — Canberra, NSW, QLD (each with phone, address, service availability)
- `Service` — 12 cleaning service types
- `Booking` — customer bookings with time slots, location, service, status
- `BlogPost` / `BlogCategory` — full-text search via PostgreSQL tsvector
- `Admin` — NextAuth credentials-based login

### Environment Variables
See `.env.example` for all required keys. Critical ones:
- `DATABASE_URL` — PostgreSQL connection string (Neon recommended)
- `NEXTAUTH_SECRET` — random 32-char string
- `RESEND_API_KEY`

## Git Workflow

Commit and push to GitHub regularly throughout all work — after each meaningful change, completed feature, or fixed bug. Never let significant progress sit uncommitted.

- Write clean, descriptive commit messages that explain what changed and why
- Push to GitHub after every commit so work is never at risk of being lost
- Do not batch unrelated changes into a single commit

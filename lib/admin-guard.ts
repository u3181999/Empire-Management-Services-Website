import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

/**
 * Call at the top of every admin PAGE (not the login page).
 *
 * The proxy (proxy.ts) already keeps signed-out visitors out of /admin, but it is a single layer:
 * if it were ever bypassed, misconfigured or removed, these pages would serve customer details to
 * anyone. Checking the session again here means a page can never render without one. (A layout
 * can't do this on its own: layouts are not re-run when you move between pages.)
 *
 * Server actions have their own check (requireAdmin in app/actions/admin.ts).
 */
export async function requireAdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  return session
}

import type { Metadata } from 'next'

// The login page is a client component, which cannot set its own metadata, so the tab title lives here.
// Search engines are already told not to index it by the admin layout (robots: noindex, nofollow).
export const metadata: Metadata = {
  title: 'Admin Login',
  description: 'Staff sign-in for Empire Management Services.',
}

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children
}

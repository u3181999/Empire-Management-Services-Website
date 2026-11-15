// Single source of truth for the public WEBSITE address. To move the site to a different address, set
// NEXT_PUBLIC_SITE_URL in the hosting environment (no code change).
//
// This is deliberately separate from the EMAIL domain. The website lives at empiremanagementservices.com.au, while
// email is sent from and received at empirecleaning.com.au (see COMPANY.email in lib/constants.ts and lib/email.ts).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://empiremanagementservices.com.au').replace(/\/$/, '')

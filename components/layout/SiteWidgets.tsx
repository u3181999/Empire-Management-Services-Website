import CookieBanner from '@/components/features/CookieBanner'
import ChatBot from '@/components/features/ChatBot'
import AnalyticsGate from '@/components/features/AnalyticsGate'

/** Floating, site-wide extras for the public pages (not rendered in the admin area). */
export default function SiteWidgets() {
  return (
    <>
      <CookieBanner />
      <ChatBot />
      <AnalyticsGate />
    </>
  )
}

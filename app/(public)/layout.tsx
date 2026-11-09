import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteWidgets from '@/components/layout/SiteWidgets'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
      <Footer />
      <SiteWidgets />
    </>
  )
}

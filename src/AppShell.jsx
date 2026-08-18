import { Suspense, useEffect, useState } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import Button from './components/Button'
import PageTransition from './components/PageTransition'
import SeoManager from './components/SeoManager'
import { BOOK_APPOINTMENT_URL } from './constants/links'
import { SITE_PHONE_TEL } from './constants/site'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace('#', ''))
      let attempts = 0
      let frameId = 0

      const scrollToHash = () => {
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }

        attempts += 1
        if (attempts < 12) {
          frameId = window.requestAnimationFrame(scrollToHash)
        }
      }

      frameId = window.requestAnimationFrame(scrollToHash)

      return () => {
        window.cancelAnimationFrame(frameId)
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function RouteFallback() {
  return <div className="min-h-[35vh]" aria-hidden="true" />
}

function AppLayout({ fallback = <RouteFallback /> }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const hideMobileQuickActions = pathname === '/about'
  const insuranceMobileSafe = pathname === '/insurance-based-primary-care'

  return (
    <div className="min-h-screen bg-ht-light text-ht-navy antialiased">
      <SeoManager />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ht-navy focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ht-cyan"
      >
        Skip to main content
      </a>
      <Header mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <main
        id="main-content"
        tabIndex={-1}
        className={`pb-24 md:pb-0 ${insuranceMobileSafe ? 'insurance-mobile-cta-safe' : ''}`}
      >
        <PageTransition>
          <Suspense fallback={fallback}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>
      <Footer />

      {!hideMobileQuickActions ? (
        <div
          className={`fixed z-40 md:hidden ${mobileMenuOpen ? 'hidden' : ''}`}
          style={{
            left: '12px',
            right: '12px',
            bottom: 'max(12px, env(safe-area-inset-bottom))',
          }}
          aria-label="Mobile quick actions"
        >
          <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-ht-silver bg-white/95 p-2 shadow-xl backdrop-blur-sm">
            <Button
              href={BOOK_APPOINTMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-sm"
              ariaLabel="Book appointment"
            >
              Book Appointment
            </Button>
            <Button
              href={SITE_PHONE_TEL}
              variant="secondary"
              className="w-full text-sm"
              ariaLabel="Call Healtopia"
            >
              <Phone size={16} />
              Call
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function AppShell({ pages, fallback }) {
  const {
    Home,
    About,
    Services,
    DirectPrimaryCare,
    InsuranceBasedPrimaryCare,
    MedicalWeightLoss,
    ConciergeCare,
    Pricing,
    Insurance,
    Contact,
    Gambrills,
    NotFound,
  } = pages

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout fallback={fallback} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/direct-primary-care" element={<DirectPrimaryCare />} />
          <Route path="/insurance-based-primary-care" element={<InsuranceBasedPrimaryCare />} />
          <Route path="/services" element={<Services />} />
          <Route path="/medical-weight-loss" element={<MedicalWeightLoss />} />
          <Route path="/concierge-care" element={<ConciergeCare />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gambrills" element={<Gambrills />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppShell

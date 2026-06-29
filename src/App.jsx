import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import Button from './components/Button'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import DirectPrimaryCare from './pages/DirectPrimaryCare'
import InsuranceBasedPrimaryCare from './pages/InsuranceBasedPrimaryCare'
import MedicalWeightLoss from './pages/MedicalWeightLoss'
import ConciergeCare from './pages/ConciergeCare'
import Pricing from './pages/Pricing'
import Insurance from './pages/Insurance'
import Contact from './pages/Contact'
import { BOOK_APPOINTMENT_URL } from './constants/links'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-ht-light text-ht-navy antialiased">
      <Header />
      <main className="pb-24 md:pb-0">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />

      <div className="fixed inset-x-0 bottom-4 z-50 px-4 md:hidden" aria-label="Mobile quick actions">
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
            href="tel:+14105550199"
            variant="secondary"
            className="w-full text-sm"
            ariaLabel="Call Healtopia"
          >
            <Phone size={16} />
            Call
          </Button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
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
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App


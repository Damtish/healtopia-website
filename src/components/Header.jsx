import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import Button from './Button'
import { BOOK_APPOINTMENT_URL, FACEBOOK_URL, INSTAGRAM_URL } from '../constants/links'
import { getEntranceProps } from '../lib/motion'

const desktopNavLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Direct Primary Care', to: '/direct-primary-care' },
  { label: 'Insurance-Based Care', to: '/insurance-based-primary-care' },
  { label: 'Concierge', to: '/concierge-care' },
  { label: 'Weight Loss', to: '/medical-weight-loss' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

const mobileNavLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Direct Primary Care', to: '/direct-primary-care' },
  { label: 'Insurance-based Primary Care', to: '/insurance-based-primary-care' },
  { label: 'Concierge Medicine', to: '/concierge-care' },
  { label: 'Medical Weight Loss', to: '/medical-weight-loss' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

function Header() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollPositionRef = useRef(0)
  const skipScrollRestoreRef = useRef(false)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (!skipScrollRestoreRef.current) {
        const previousScrollY = scrollPositionRef.current
        if (previousScrollY) {
          window.scrollTo(0, previousScrollY)
        }
      }
      skipScrollRestoreRef.current = false
      return undefined
    }

    scrollPositionRef.current = window.scrollY || window.pageYOffset || 0
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPositionRef.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    skipScrollRestoreRef.current = true
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    if (mobileOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!mobileOpen) return
      if (mobileMenuRef.current?.contains(event.target)) return

      const toggleButton = event.target.closest?.('[data-mobile-menu-toggle]')
      if (toggleButton) return

      setMobileOpen(false)
    }

    if (mobileOpen) {
      document.addEventListener('pointerdown', handlePointerDown, true)
    }

    return () => document.removeEventListener('pointerdown', handlePointerDown, true)
  }, [mobileOpen])

  const navDesktopClass = ({ isActive }) =>
    `relative whitespace-nowrap rounded-full px-1 py-1 text-[12px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-cyan-300 after:transition-all after:duration-250 ${
      isActive
        ? 'text-ht-navy after:w-7'
        : 'text-ht-navy/90 after:w-0 hover:text-ht-cyan-700 hover:after:w-5'
    }`

  const navMobileClass = ({ isActive }) =>
    `rounded-xl px-3 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
      isActive ? 'bg-cyan-50 text-ht-navy' : 'text-ht-navy hover:bg-ht-soft-blue hover:text-ht-cyan-700'
    }`

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-ht-silver/90 bg-white/92 backdrop-blur"
      {...getEntranceProps(reduceMotion, { y: -14, duration: 0.45 })}
    >
      <div className="mx-auto flex h-[4.7rem] w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-6 min-[1200px]:grid min-[1200px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[1200px]:px-8">
        <NavLink to="/" className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 lg:flex-none" aria-label="Healtopia home">
          <img
            src="/images/healtopia-logo.webp"
            alt="Healtopia Primary Care and Medical Weight Loss logo"
            className="h-11 w-auto shrink-0 object-contain sm:h-[52px]"
          />
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-lg font-extrabold leading-tight tracking-tight text-ht-navy sm:text-[1.3rem]">
              Healtopia
            </p>
            <p className="whitespace-nowrap text-[10px] font-medium leading-tight text-ht-gray sm:text-[11px]">
              Primary Care & Medical Weight Loss
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center justify-center gap-1.5 min-[1200px]:flex min-[1200px]:gap-1.5" aria-label="Primary navigation">
          {desktopNavLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navDesktopClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-[1200px]:flex min-[1200px]:items-center min-[1200px]:justify-self-end">
          <Button
            href={BOOK_APPOINTMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="whitespace-nowrap px-4"
            ariaLabel="Book appointment from header"
          >
            Book Appointment
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-navy shadow-sm transition duration-200 hover:border-cyan-300 hover:bg-cyan-50 min-[1200px]:hidden"
          aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={mobileOpen}
          data-mobile-menu-toggle="true"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[4.7rem] z-[60] h-[calc(100vh-4.7rem)] min-[1200px]:hidden"
            aria-hidden={!mobileOpen}
          >
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px]" onClick={() => setMobileOpen(false)} />
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="relative mx-3 overflow-hidden rounded-b-3xl border border-ht-silver bg-white shadow-[0_26px_46px_-28px_rgba(5,42,74,0.58)] sm:mx-6"
            >
              <nav className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
                {mobileNavLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={navMobileClass}
                  >
                    {link.label}
                  </NavLink>
                ))}

                <Button
                  href={BOOK_APPOINTMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="mt-2 whitespace-nowrap"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Appointment
                </Button>

                <div className="mt-4 border-t border-ht-silver pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ht-gray">Follow Healtopia</p>
                  <div className="mt-2 flex items-center gap-2.5">
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Healtopia on Facebook"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-navy shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-ht-cyan-700 hover:shadow-md"
                      onClick={() => setMobileOpen(false)}
                    >
                      <FaFacebookF size={14} aria-hidden="true" />
                    </a>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Healtopia on Instagram"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-navy shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 hover:text-ht-cyan-700 hover:shadow-md"
                      onClick={() => setMobileOpen(false)}
                    >
                      <FaInstagram size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
  { label: 'Insurance Primary Care', to: '/insurance-based-primary-care' },
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navDesktopClass = ({ isActive }) =>
    `relative whitespace-nowrap rounded-full px-1 py-1 text-[11px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-cyan-300 after:transition-all after:duration-250 ${
      isActive
        ? 'text-ht-navy after:w-7'
        : 'text-ht-navy/95 after:w-0 hover:text-ht-cyan-700 hover:after:w-5'
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
      <div className="mx-auto grid h-[4.7rem] w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3 sm:gap-4" aria-label="Healtopia home">
          <img
            src="/images/healtopia-logo.webp"
            alt="Healtopia Primary Care and Medical Weight Loss logo"
            className="h-11 w-auto shrink-0 object-contain sm:h-[54px]"
          />
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-lg font-extrabold leading-tight tracking-tight text-ht-navy sm:text-[1.4rem]">
              Healtopia
            </p>
            <p className="whitespace-nowrap text-[9px] font-medium leading-tight text-ht-gray sm:text-[11px]">
              Primary Care & Medical Weight Loss
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center justify-center gap-2 xl:flex xl:gap-3" aria-label="Primary navigation">
          {desktopNavLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navDesktopClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:flex xl:items-center xl:justify-self-end">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-white text-ht-navy shadow-sm transition duration-200 hover:border-cyan-300 hover:bg-cyan-50 xl:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="border-t border-ht-silver bg-white shadow-[0_16px_34px_-30px_rgba(5,42,74,0.7)] xl:hidden"
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
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import Button from './Button'
import { BOOK_APPOINTMENT_URL, FACEBOOK_URL, INSTAGRAM_URL } from '../constants/links'
import { getEntranceProps } from '../lib/motion'

const primaryNavLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Insurance', to: '/insurance' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Primary Care', to: '/services' },
  { label: 'Medical Weight Loss', to: '/medical-weight-loss' },
  { label: 'Concierge Care', to: '/concierge-care' },
]

const serviceActivePaths = ['/services', '/medical-weight-loss', '/concierge-care']

function Header() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const isServicesActive = serviceActivePaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    setServicesOpen(false)
    setMobileServicesOpen(false)
    setMobileOpen(false)
  }, [pathname])

  const navDesktopClass = ({ isActive }) =>
    `relative rounded-full px-1.5 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-cyan-300 after:transition-all after:duration-250 ${
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
      <div className="mx-auto flex h-[4.7rem] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 sm:gap-4" aria-label="Healtopia home">
          <img
            src="/images/healtopia-logo.webp"
            alt="Healtopia Primary Care and Medical Weight Loss logo"
            className="h-11 w-auto shrink-0 object-contain sm:h-[54px]"
          />
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-lg font-extrabold leading-tight tracking-tight text-ht-navy sm:text-[1.4rem]">
              Healtopia
            </p>
            <p className="text-[10px] font-medium leading-tight text-ht-gray sm:text-xs">Primary Care & Wellness</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {primaryNavLinks.slice(0, 2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navDesktopClass}>
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setServicesOpen(false)
              }
            }}
          >
            <button
              type="button"
              className={`relative inline-flex items-center gap-1 rounded-full px-1.5 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-cyan-300 after:transition-all after:duration-250 ${
                isServicesActive
                  ? 'text-ht-navy after:w-7'
                  : 'text-ht-navy/95 after:w-0 hover:text-ht-cyan-700 hover:after:w-5'
              }`}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((prev) => !prev)}
              onFocus={() => setServicesOpen(true)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setServicesOpen(false)
                }
              }}
            >
              Services
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-cyan-100/95 bg-white p-2.5 shadow-[0_20px_38px_-24px_rgba(5,42,74,0.6)]"
                  role="menu"
                  aria-label="Services menu"
                >
                  {serviceLinks.map((item) => (
                    <NavLink
                      key={`${item.label}-${item.to}`}
                      to={item.to}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ht-navy transition-colors duration-200 hover:bg-cyan-50 hover:text-ht-cyan-700 focus-visible:bg-cyan-50 focus-visible:text-ht-cyan-700 focus-visible:outline-none"
                      role="menuitem"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {primaryNavLinks.slice(2).map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navDesktopClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden xl:flex xl:items-center">
          <Button
            href={BOOK_APPOINTMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
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
              {primaryNavLinks.slice(0, 2).map((link) => (
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

              <div className="overflow-hidden rounded-xl border border-ht-silver/90 bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold text-ht-navy transition duration-200 hover:bg-ht-soft-blue hover:text-ht-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-menu"
                >
                  <span>Services</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen ? (
                    <motion.div
                      id="mobile-services-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-ht-silver bg-white"
                    >
                      {serviceLinks.map((item) => (
                        <NavLink
                          key={`mobile-${item.label}-${item.to}`}
                          to={item.to}
                          onClick={() => {
                            setMobileServicesOpen(false)
                            setMobileOpen(false)
                          }}
                          className={({ isActive }) =>
                            `block px-5 py-2.5 text-sm font-medium transition ${
                              isActive
                                ? 'bg-cyan-50 text-ht-cyan-700'
                                : 'text-ht-navy hover:bg-cyan-50 hover:text-ht-cyan-700'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {primaryNavLinks.slice(2).map((link) => (
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
                className="mt-2"
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

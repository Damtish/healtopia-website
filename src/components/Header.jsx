import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import Button from './Button'
import { BOOK_APPOINTMENT_URL } from '../constants/links'

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
    `relative rounded-full px-1 py-1 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
      isActive
        ? 'text-ht-navy after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto after:h-0.5 after:w-full after:rounded-full after:bg-cyan-300'
        : 'text-ht-navy hover:text-ht-cyan-700'
    }`

  const navMobileClass = ({ isActive }) =>
    `rounded-xl px-3 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
      isActive ? 'bg-cyan-50 text-ht-navy' : 'text-ht-navy hover:bg-ht-soft-blue'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-ht-silver bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 sm:gap-4" aria-label="Healtopia home">
          <img
            src="/images/healtopia-logo.webp"
            alt="Healtopia Primary Care and Medical Weight Loss logo"
            className="h-11 w-auto shrink-0 object-contain sm:h-[54px]"
          />
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-xl font-extrabold leading-tight tracking-tight text-ht-navy sm:text-[1.45rem]">
              Healtopia
            </p>
            <p className="text-[11px] font-medium leading-tight text-ht-gray sm:text-xs">Primary Care & Wellness</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
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
              className={`relative inline-flex items-center gap-1 rounded-full px-1 py-1 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${
                isServicesActive
                  ? 'text-ht-navy after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto after:h-0.5 after:w-full after:rounded-full after:bg-cyan-300'
                  : 'text-ht-navy hover:text-ht-cyan-700'
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
                  className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-cyan-100 bg-white p-2 shadow-[0_14px_34px_-20px_rgba(5,42,74,0.55)]"
                  role="menu"
                  aria-label="Services menu"
                >
                  {serviceLinks.map((item) => (
                    <NavLink
                      key={`${item.label}-${item.to}`}
                      to={item.to}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ht-navy transition-colors hover:bg-cyan-50 hover:text-ht-cyan-700 focus-visible:bg-cyan-50 focus-visible:text-ht-cyan-700 focus-visible:outline-none"
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

        <div className="hidden xl:block">
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ht-silver bg-white text-ht-navy xl:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="border-t border-ht-silver bg-white xl:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile navigation">
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

              <div className="overflow-hidden rounded-xl border border-ht-silver">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold text-ht-navy transition hover:bg-ht-soft-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
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
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Header

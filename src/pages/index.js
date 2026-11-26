import { lazyPage } from '../lib/lazyPage'

export const pages = {
  Home: lazyPage(() => import('./Home.jsx')),
  About: lazyPage(() => import('./About.jsx')),
  Services: lazyPage(() => import('./Services.jsx')),
  DirectPrimaryCare: lazyPage(() => import('./DirectPrimaryCare.jsx')),
  InsuranceBasedPrimaryCare: lazyPage(() => import('./InsuranceBasedPrimaryCare.jsx')),
  MedicalWeightLoss: lazyPage(() => import('./MedicalWeightLoss.jsx')),
  ConciergeCare: lazyPage(() => import('./ConciergeCare.jsx')),
  Pricing: lazyPage(() => import('./Pricing.jsx')),
  Insurance: lazyPage(() => import('./Insurance.jsx')),
  Contact: lazyPage(() => import('./Contact.jsx')),
  Gambrills: lazyPage(() => import('./Gambrills.jsx')),
  NotFound: lazyPage(() => import('./NotFound.jsx')),
}

const pageByPath = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/direct-primary-care': 'DirectPrimaryCare',
  '/insurance-based-primary-care': 'InsuranceBasedPrimaryCare',
  '/medical-weight-loss': 'MedicalWeightLoss',
  '/concierge-care': 'ConciergeCare',
  '/pricing': 'Pricing',
  '/insurance': 'Insurance',
  '/contact': 'Contact',
  '/gambrills': 'Gambrills',
}

/** Loads the page module for `pathname` so the first client render matches the prerendered HTML. */
export function preloadPageFor(pathname) {
  const key = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/'
  const page = pages[pageByPath[key] || 'NotFound']
  return page.preload().catch(() => undefined)
}

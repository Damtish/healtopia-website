const routeLoaders = {
  '/': () => import('../pages/Home.jsx'),
  '/about': () => import('../pages/About.jsx'),
  '/services': () => import('../pages/Services.jsx'),
  '/direct-primary-care': () => import('../pages/DirectPrimaryCare.jsx'),
  '/insurance-based-primary-care': () => import('../pages/InsuranceBasedPrimaryCare.jsx'),
  '/medical-weight-loss': () => import('../pages/MedicalWeightLoss.jsx'),
  '/concierge-care': () => import('../pages/ConciergeCare.jsx'),
  '/pricing': () => import('../pages/Pricing.jsx'),
  '/insurance': () => import('../pages/Insurance.jsx'),
  '/contact': () => import('../pages/Contact.jsx'),
  '/gambrills': () => import('../pages/Gambrills.jsx'),
}

const inFlight = new Map()

function normalizePath(pathname) {
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/'
}

export function prefetchRoute(pathname) {
  const key = normalizePath(pathname)
  const loader = routeLoaders[key]
  if (!loader || inFlight.has(key)) return inFlight.get(key) || null

  const promise = loader().catch(() => {
    inFlight.delete(key)
  })
  inFlight.set(key, promise)
  return promise
}


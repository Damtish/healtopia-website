import { preloadPageFor } from '../pages/index.js'

const inFlight = new Map()

// Effect chunks used by each route, warmed alongside the page so mounting never waits on them.
const effectLoaders = {
  '/': [() => import('../components/effects/TogetherCanvas.jsx'), () => import('../components/effects/HelixCanvas.jsx')],
  '/about': [() => import('../components/effects/TogetherCanvas.jsx')],
  '/services': [() => import('../components/effects/ParticleHeart.jsx')],
}

function normalizePath(pathname) {
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/'
}

/** Warms a route's page module (on hover/focus/touch) so navigation renders without a loader. */
export function prefetchRoute(pathname) {
  const key = normalizePath(pathname)
  if (inFlight.has(key)) return inFlight.get(key)
  // Deferred so hover/focus/touch handlers return immediately (keeps input responsive).
  const promise = new Promise((resolve) => {
    window.setTimeout(() => {
      ;(effectLoaders[key] || []).forEach((load) => load().catch(() => undefined))
      resolve(preloadPageFor(key))
    }, 0)
  })
  inFlight.set(key, promise)
  return promise
}

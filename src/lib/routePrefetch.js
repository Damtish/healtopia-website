import { preloadPageFor } from '../pages/index.js'

const inFlight = new Map()

function normalizePath(pathname) {
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/'
}

/** Warms a route's page module (on hover/focus/touch) so navigation renders without a loader. */
export function prefetchRoute(pathname) {
  const key = normalizePath(pathname)
  if (inFlight.has(key)) return inFlight.get(key)
  const promise = preloadPageFor(key)
  inFlight.set(key, promise)
  return promise
}

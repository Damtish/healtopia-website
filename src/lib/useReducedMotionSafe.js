import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange) {
  const media = window.matchMedia?.(QUERY)
  if (!media) return () => {}
  media.addEventListener?.('change', onChange)
  return () => media.removeEventListener?.('change', onChange)
}

const getSnapshot = () => window.matchMedia?.(QUERY).matches ?? false
// The prerendered HTML is built without reduced motion.
const getServerSnapshot = () => false

/**
 * Reduced-motion preference, hydration-safe: during hydration it reports the value the
 * prerendered HTML was built with (false), then the real preference. Visitors without the
 * preference never trigger a re-render.
 */
export default function useReducedMotionSafe() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

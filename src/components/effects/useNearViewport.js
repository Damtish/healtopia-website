import { useEffect, useState } from 'react'

// The particle effects are decoration, so they wait for the visitor's first scroll or
// interaction before downloading. This keeps them out of the initial page load entirely.
let hasInteracted = false
const interactionListeners = new Set()
const INTERACTION_EVENTS = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown']

function markInteracted() {
  if (hasInteracted) return
  hasInteracted = true
  INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, markInteracted, { capture: true }))
  interactionListeners.forEach((listener) => listener())
  interactionListeners.clear()
}

function onFirstInteraction(listener) {
  if (hasInteracted) {
    listener()
    return () => {}
  }
  if (interactionListeners.size === 0) {
    INTERACTION_EVENTS.forEach((type) =>
      window.addEventListener(type, markInteracted, { capture: true, passive: true }),
    )
  }
  interactionListeners.add(listener)
  return () => interactionListeners.delete(listener)
}

/**
 * Becomes true once the element is within `rootMargin` of the viewport and the visitor has
 * scrolled or interacted at least once, then stays true.
 */
export default function useNearViewport(ref, rootMargin = '600px 0px') {
  const [near, setNear] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || near) return undefined

    let inRange = false
    let interacted = false
    const update = () => {
      if (inRange && interacted) setNear(true)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        inRange = entries.some((entry) => entry.isIntersecting)
        update()
      },
      { rootMargin },
    )
    observer.observe(element)

    const stopInteraction = onFirstInteraction(() => {
      interacted = true
      update()
    })

    return () => {
      observer.disconnect()
      stopInteraction()
    }
  }, [near, ref, rootMargin])

  return near
}

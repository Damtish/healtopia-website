export const EASE_OUT = [0.22, 1, 0.36, 1]

export function isMobileViewport() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(max-width: 767px)').matches
}

// Deterministic on server and client (no window reads during render), so hydration matches.
function getMotionMode(reduceMotion) {
  return {
    reduceMotion: Boolean(reduceMotion),
    mobile: false,
  }
}

// Above-the-fold (hero) content must be visible on first paint: no opacity/offset entrance.
export function getEntranceProps() {
  return {
    initial: false,
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0 },
  }
}

export function getRevealProps(
  reduceMotion,
  { delay = 0, duration = 0.5, y = 20, amount = 0.25, once = true } = {},
) {
  const motionMode = getMotionMode(reduceMotion)

  if (motionMode.reduceMotion) {
    return {
      initial: false,
      whileInView: { opacity: 1, y: 0 },
      viewport: { once, amount: motionMode.mobile ? Math.min(amount, 0.15) : amount },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { opacity: 0, y: Math.min(y, 12) },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, amount: motionMode.mobile ? Math.min(amount, 0.15) : amount },
    transition: { delay: Math.min(delay, 0.1), duration: Math.min(duration, 0.4), ease: EASE_OUT },
  }
}

export function getStaggerContainer(
  reduceMotion,
  { delayChildren = 0.04, staggerChildren = 0.08, amount = 0.2, once = true } = {},
) {
  const motionMode = getMotionMode(reduceMotion)

  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once, amount: motionMode.mobile ? Math.min(amount, 0.15) : amount },
    variants: {
      hidden: {},
      show: {
        transition: reduceMotion
          ? { delayChildren: 0, staggerChildren: 0 }
          : {
              delayChildren: Math.min(delayChildren, 0.04),
              staggerChildren: Math.min(staggerChildren, 0.06),
            },
      },
    },
  }
}

export function getStaggerItem(reduceMotion, { y = 18 } = {}) {
  const motionMode = getMotionMode(reduceMotion)

  if (motionMode.reduceMotion) {
    return {
      variants: {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      },
    }
  }

  return {
    variants: {
      hidden: { opacity: 0, y: Math.min(y, 12) },
      show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
    },
  }
}

export function getCardHover(reduceMotion) {
  const motionMode = getMotionMode(reduceMotion)

  if (motionMode.reduceMotion) return {}

  return {
    whileHover: {
      y: -4,
      scale: 1.008,
      boxShadow: '0 24px 44px -28px rgba(5, 42, 74, 0.5)',
      borderColor: 'rgba(103, 232, 249, 0.9)',
    },
    transition: { duration: 0.3, ease: EASE_OUT },
  }
}


export const EASE_OUT = [0.22, 1, 0.36, 1]

export function isMobileViewport() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }

  return window.matchMedia('(max-width: 767px)').matches
}

function getMotionMode(reduceMotion) {
  const mobile = isMobileViewport()
  return {
    reduceMotion: Boolean(reduceMotion) || mobile,
    mobile,
  }
}

export function getEntranceProps(
  reduceMotion,
  { delay = 0, duration = 0.55, y = 20, scale = 1, fromScale = 1 } = {},
) {
  const motionMode = getMotionMode(reduceMotion)

  if (motionMode.reduceMotion) {
    return {
      initial: false,
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0 },
    }
  }

  return {
    initial: {
      opacity: 0,
      y: motionMode.mobile ? Math.min(y, 16) : y,
      scale: motionMode.mobile ? 1 : fromScale,
    },
    animate: { opacity: 1, y: 0, scale: motionMode.mobile ? 1 : scale },
    transition: { delay, duration: motionMode.mobile ? Math.min(duration, 0.5) : duration, ease: EASE_OUT },
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
    initial: { opacity: 0, y: motionMode.mobile ? Math.min(y, 16) : y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, amount: motionMode.mobile ? Math.min(amount, 0.15) : amount },
    transition: { delay, duration: motionMode.mobile ? Math.min(duration, 0.5) : duration, ease: EASE_OUT },
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
              delayChildren: motionMode.mobile ? Math.min(delayChildren, 0.02) : delayChildren,
              staggerChildren: motionMode.mobile ? Math.min(staggerChildren, 0.06) : staggerChildren,
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
      hidden: { opacity: 0, y: motionMode.mobile ? Math.min(y, 14) : y },
      show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
    },
  }
}

export function getCardHover(reduceMotion) {
  const motionMode = getMotionMode(reduceMotion)

  if (motionMode.reduceMotion) return {}

  return {
    whileHover: {
      y: -3,
      boxShadow: '0 18px 30px -22px rgba(5, 42, 74, 0.5)',
      borderColor: 'rgba(103, 232, 249, 0.9)',
    },
    transition: { duration: 0.26, ease: EASE_OUT },
  }
}


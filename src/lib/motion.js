export const EASE_OUT = [0.22, 1, 0.36, 1]

export function getEntranceProps(
  reduceMotion,
  { delay = 0, duration = 0.55, y = 20, scale = 1, fromScale = 1 } = {},
) {
  if (reduceMotion) {
    return {
      initial: false,
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { opacity: 0, y, scale: fromScale },
    animate: { opacity: 1, y: 0, scale },
    transition: { delay, duration, ease: EASE_OUT },
  }
}

export function getRevealProps(
  reduceMotion,
  { delay = 0, duration = 0.5, y = 20, amount = 0.25, once = true } = {},
) {
  if (reduceMotion) {
    return {
      initial: false,
      whileInView: { opacity: 1, y: 0 },
      viewport: { once, amount },
      transition: { duration: 0 },
    }
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, amount },
    transition: { delay, duration, ease: EASE_OUT },
  }
}

export function getStaggerContainer(
  reduceMotion,
  { delayChildren = 0.04, staggerChildren = 0.08, amount = 0.2, once = true } = {},
) {
  return {
    initial: 'hidden',
    whileInView: 'show',
    viewport: { once, amount },
    variants: {
      hidden: {},
      show: {
        transition: reduceMotion
          ? { delayChildren: 0, staggerChildren: 0 }
          : { delayChildren, staggerChildren },
      },
    },
  }
}

export function getStaggerItem(reduceMotion, { y = 18 } = {}) {
  if (reduceMotion) {
    return {
      variants: {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      },
    }
  }

  return {
    variants: {
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
    },
  }
}

export function getCardHover(reduceMotion) {
  if (reduceMotion) return {}

  return {
    whileHover: {
      y: -4,
      boxShadow: '0 20px 34px -22px rgba(5, 42, 74, 0.55)',
      borderColor: 'rgba(103, 232, 249, 0.9)',
    },
    transition: { duration: 0.26, ease: EASE_OUT },
  }
}


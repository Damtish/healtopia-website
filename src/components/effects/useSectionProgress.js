import { useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

/**
 * Scroll progress (0..1) for a section, as a framer-motion MotionValue.
 *
 * Unlike framer-motion's useScroll({ target }), this never measures the page during the render
 * commit: it only starts once the section is near the viewport (IntersectionObserver), and its
 * first measurement runs after the browser has painted. Measuring right after a route change
 * forced a synchronous style + layout of the whole new page, which blocked navigation clicks
 * for 300-600ms on slower phones.
 *
 * `compute(rect, viewportHeight)` maps the section's bounding rect to a raw progress value.
 */
export default function useSectionProgress(ref, compute) {
  const progress = useMotionValue(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    let active = false
    let frame = 0
    let timer = 0

    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const value = compute(rect, window.innerHeight)
      progress.set(value < 0 ? 0 : value > 1 ? 1 : value)
    }

    const schedule = () => {
      if (active && !frame) frame = requestAnimationFrame(update)
    }

    // After the next paint: layout is clean by then, so reading it is cheap.
    const measureAfterPaint = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = 0
        timer = window.setTimeout(update, 0)
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const next = entries.some((entry) => entry.isIntersecting)
        if (next === active) return
        active = next
        if (active) {
          window.addEventListener('scroll', schedule, { passive: true })
          window.addEventListener('resize', schedule, { passive: true })
          measureAfterPaint()
        } else {
          window.removeEventListener('scroll', schedule)
          window.removeEventListener('resize', schedule)
          // Settle at the nearest end so state is right when scrolled far past the section.
          measureAfterPaint()
        }
      },
      { rootMargin: '50% 0px' },
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [compute, progress, ref])

  return progress
}

/** Pinned sections: 0 when the section top reaches the viewport top, 1 when its bottom reaches the viewport bottom. */
export function pinnedProgress(rect, viewportHeight) {
  const distance = rect.height - viewportHeight
  return distance > 0 ? -rect.top / distance : rect.top <= 0 ? 1 : 0
}

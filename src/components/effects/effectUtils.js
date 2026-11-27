// Shared helpers for the canvas / WebGL particle effects.
// Everything here is browser-only and must be called from effects, never during render.

const TOKEN_NAMES = {
  navy: '--color-ht-navy',
  navy700: '--color-ht-navy-700',
  cyan: '--color-ht-cyan',
  cyan700: '--color-ht-cyan-700',
  teal: '--color-ht-teal',
  light: '--color-ht-light',
  silver: '--color-ht-silver',
  gray: '--color-ht-gray',
  surface: '--ht-surface',
}

const FALLBACK = {
  navy: [11, 37, 69],
  navy700: [24, 65, 101],
  cyan: [22, 182, 212],
  cyan700: [15, 143, 170],
  teal: [30, 143, 160],
  light: [245, 251, 255],
  silver: [214, 228, 239],
  gray: [79, 107, 133],
  surface: [255, 255, 255],
}

function parseColor(value) {
  const v = (value || '').trim()
  if (!v) return null

  if (v.startsWith('#')) {
    let hex = v.slice(1)
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('')
    if (hex.length < 6) return null
    const n = Number.parseInt(hex.slice(0, 6), 16)
    if (Number.isNaN(n)) return null
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }

  const match = v.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i)
  if (match) return [Number(match[1]), Number(match[2]), Number(match[3])]
  return null
}

export function isDarkTheme() {
  const root = document.documentElement
  return root.dataset.theme === 'dark' || root.classList.contains('dark')
}

/** Reads the brand colour tokens from CSS so particles follow light/dark mode. */
export function readThemeColors() {
  const styles = getComputedStyle(document.documentElement)
  const colors = { dark: isDarkTheme() }
  for (const [key, name] of Object.entries(TOKEN_NAMES)) {
    colors[key] = parseColor(styles.getPropertyValue(name)) || FALLBACK[key]
  }
  return colors
}

/** Calls `onChange` synchronously whenever the theme attribute/class on <html> changes. */
export function observeTheme(onChange) {
  const observer = new MutationObserver(() => onChange(readThemeColors()))
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] })
  return () => observer.disconnect()
}

export function rgba(rgb, alpha = 1) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
}

export function mixRgb(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

/** Low-power devices (phones, small tablets, few cores) get fewer particles. */
export function getDeviceTier() {
  const width = window.innerWidth || 1024
  const cores = navigator.hardwareConcurrency || 8
  const memory = navigator.deviceMemory || 8
  if (width < 768 || cores <= 4 || memory <= 2) return 'low'
  if (width < 1280) return 'mid'
  return 'high'
}

export function getPixelRatio(tier = 'high') {
  const max = tier === 'low' ? 1.25 : 1.5
  return Math.min(window.devicePixelRatio || 1, max)
}

export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/**
 * Runs `frame(time)` in a single rAF loop, only while `element` is on screen and the tab
 * is visible. Returns { stop, requestFrame } — requestFrame draws one frame on demand
 * (used for static/reduced-motion renders and theme changes while paused).
 */
export function createRenderLoop(element, frame, { rootMargin = '120px 0px' } = {}) {
  let rafId = 0
  let inView = false
  let pageVisible = document.visibilityState !== 'hidden'
  let stopped = false
  let continuous = true

  const tick = (time) => {
    rafId = 0
    if (stopped) return
    frame(time)
    if (continuous && inView && pageVisible) rafId = requestAnimationFrame(tick)
  }

  const sync = () => {
    if (stopped) return
    if (continuous && inView && pageVisible) {
      if (!rafId) rafId = requestAnimationFrame(tick)
    } else if (rafId && continuous) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      inView = entries.some((entry) => entry.isIntersecting)
      sync()
    },
    { rootMargin },
  )
  io.observe(element)

  const onVisibility = () => {
    pageVisible = document.visibilityState !== 'hidden'
    sync()
  }
  document.addEventListener('visibilitychange', onVisibility)

  return {
    setContinuous(value) {
      continuous = value
      if (!value && rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
      sync()
    },
    requestFrame() {
      if (stopped || rafId) return
      rafId = requestAnimationFrame(tick)
    },
    stop() {
      stopped = true
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    },
  }
}

/** Keeps a canvas' backing store in sync with its CSS size (capped DPR). */
export function observeCanvasSize(canvas, onResize, tier) {
  const apply = () => {
    const rect = canvas.getBoundingClientRect()
    const dpr = getPixelRatio(tier)
    const width = Math.max(1, Math.round(rect.width))
    const height = Math.max(1, Math.round(rect.height))
    onResize({ width, height, dpr })
  }
  const ro = new ResizeObserver(apply)
  ro.observe(canvas)
  apply()
  return () => ro.disconnect()
}

/** Pre-renders a soft glowing dot so 2D canvases can drawImage instead of arc+shadowBlur. */
export function createDotSprite(rgb, size = 32, { core = 0.35 } = {}) {
  const sprite = document.createElement('canvas')
  sprite.width = size
  sprite.height = size
  const ctx = sprite.getContext('2d')
  const r = size / 2
  const gradient = ctx.createRadialGradient(r, r, 0, r, r, r)
  gradient.addColorStop(0, rgba(rgb, 1))
  gradient.addColorStop(core, rgba(rgb, 0.85))
  gradient.addColorStop(core + 0.12, rgba(rgb, 0.22))
  gradient.addColorStop(1, rgba(rgb, 0))
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return sprite
}

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
export const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/** Deterministic PRNG so particle layouts are stable between mounts. */
export function createRandom(seed = 1) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Runs `fn` when the main thread is idle (falls back to a short timeout), so particle setup
 * and teardown never land inside a click/navigation task. Returns a handle for cancelIdle.
 */
export function scheduleIdle(fn, timeout = 700) {
  if (typeof window.requestIdleCallback === 'function') {
    return { idle: window.requestIdleCallback(fn, { timeout }) }
  }
  return { timer: window.setTimeout(fn, 60) }
}

export function cancelIdle(handle) {
  if (!handle) return
  if (handle.idle !== undefined) window.cancelIdleCallback(handle.idle)
  if (handle.timer !== undefined) window.clearTimeout(handle.timer)
}

/**
 * Mount helper for the effects: defers `setup` (which returns a cleanup) to an idle callback,
 * optionally after a separate idle `prepare` step. Unmounting before setup ran cancels it.
 */
export function deferSetup(setup, prepare) {
  let cleanup = null
  let cancelled = false
  let handle = null
  const run = () => {
    if (!cancelled) cleanup = setup() || null
  }
  // Optional `prepare` (e.g. generating particles) gets its own idle step before setup.
  handle = scheduleIdle(() => {
    if (cancelled) return
    if (prepare) {
      prepare()
      handle = scheduleIdle(run)
    } else {
      run()
    }
  })
  return () => {
    cancelled = true
    cancelIdle(handle)
    cleanup?.()
  }
}

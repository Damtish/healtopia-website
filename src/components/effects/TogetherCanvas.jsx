import { useEffect, useRef } from 'react'
import {
  clamp01,
  createDotSprite,
  createRandom,
  createRenderLoop,
  deferSetup,
  getDeviceTier,
  observeCanvasSize,
  observeTheme,
  readThemeColors,
  rgba,
} from './effectUtils'
import { CARE_CHIPS, RING_START, RING_STEP, SCATTER_POINTS, ringRadii } from './whyLayout'

/*
  "Everything orbits you"
  1. Health feels scattered  — six care chips drift loosely, each with a soft particle cluster.
  2. We bring it together     — chips glide into an even ring around "You"; spokes + orbit draw in.
  3. Care that puts you first — chips fade, their particles flow into the heart + ECG line.
  Driven by scroll progress (0..1), fully reversible. Particles always interpolate between
  fixed targets with eased, staggered timing, so every particle travels one clean path.
*/

const CHIP_COUNT = CARE_CHIPS.length

// ECG trace in unit coordinates (x 0..1, y 0..1, 0.5 = baseline).
const ECG_POINTS = [
  [0, 0.5],
  [0.2, 0.5],
  [0.25, 0.46],
  [0.3, 0.5],
  [0.4, 0.5],
  [0.43, 0.56],
  [0.47, 0.16],
  [0.51, 0.74],
  [0.545, 0.5],
  [0.64, 0.5],
  [0.7, 0.43],
  [0.76, 0.5],
  [1, 0.5],
]

const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))
const window01 = (p, start, length) => ease((p - start) / length)

function samplePolyline(points, count, random, jitter) {
  const lengths = [0]
  for (let i = 1; i < points.length; i += 1) {
    lengths.push(lengths[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]))
  }
  const total = lengths[lengths.length - 1]
  const out = []
  for (let n = 0; n < count; n += 1) {
    const target = ((n + random() * 0.6) / count) * total
    let i = 1
    while (i < lengths.length - 1 && lengths[i] < target) i += 1
    const t = (target - lengths[i - 1]) / (lengths[i] - lengths[i - 1] || 1)
    out.push([
      points[i - 1][0] + (points[i][0] - points[i - 1][0]) * t + (random() - 0.5) * jitter,
      points[i - 1][1] + (points[i][1] - points[i - 1][1]) * t + (random() - 0.5) * jitter,
    ])
  }
  return out
}

function heartOutline(steps = 600) {
  const raw = []
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * Math.PI * 2
    raw.push([16 * Math.sin(t) ** 3, -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))])
  }
  const xs = raw.map((p) => p[0])
  const ys = raw.map((p) => p[1])
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  const scale = 0.62 / Math.max(maxX - minX, maxY - minY)
  return raw.map(([x, y]) => [0.5 + (x - (minX + maxX) / 2) * scale, 0.5 + (y - (minY + maxY) / 2) * scale])
}

function buildLayout(count) {
  const random = createRandom(20251127)
  const heartCount = Math.round(count * 0.66)
  const finals = [
    ...samplePolyline(heartOutline(), heartCount, random, 0.012),
    ...samplePolyline(ECG_POINTS, count - heartCount, random, 0.008),
  ]
  // Shuffle final targets so each care cluster spreads across the whole heart.
  const order = Array.from({ length: count }, (_, i) => i)
  for (let i = count - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }

  const data = {
    count,
    chip: new Int8Array(count), // -1 = free particle, 0..5 = belongs to a care chip
    offA: new Float32Array(count),
    offR: new Float32Array(count),
    freeX: new Float32Array(count),
    freeY: new Float32Array(count),
    orbitA: new Float32Array(count),
    orbitJ: new Float32Array(count),
    finalX: new Float32Array(count),
    finalY: new Float32Array(count),
    isEcg: new Uint8Array(count),
    delay: new Float32Array(count),
    seed: new Float32Array(count),
    size: new Float32Array(count),
    color: new Uint8Array(count),
  }

  for (let i = 0; i < count; i += 1) {
    const clustered = random() < 0.7
    data.chip[i] = clustered ? i % CHIP_COUNT : -1
    data.offA[i] = random() * Math.PI * 2
    data.offR[i] = 0.35 + Math.sqrt(random()) * 0.65
    data.freeX[i] = 0.04 + random() * 0.92
    data.freeY[i] = 0.04 + random() * 0.92
    data.orbitA[i] = random() * Math.PI * 2
    data.orbitJ[i] = (random() - 0.5) * 2
    const target = order[i]
    data.finalX[i] = finals[target][0]
    data.finalY[i] = finals[target][1]
    data.isEcg[i] = target >= heartCount ? 1 : 0
    data.delay[i] = random()
    data.seed[i] = random() * Math.PI * 2
    data.size[i] = 0.75 + random() * 0.6
    data.color[i] = random() < 0.55 ? 0 : random() < 0.8 ? 1 : 2
  }
  return data
}

// Generated once per particle count and reused on later mounts (no regeneration on navigation).
const layoutCache = new Map()
function getLayout(count) {
  if (!layoutCache.has(count)) layoutCache.set(count, buildLayout(count))
  return layoutCache.get(count)
}

export default function TogetherCanvas({ progress, reduced = false }) {
  const canvasRef = useRef(null)

  // Setup is deferred to an idle callback so mounting never blocks a click or route change.
  useEffect(() => deferSetup(() => {
    const canvas = canvasRef.current
    const visual = canvas?.closest('[data-why-visual]')
    if (!canvas || !visual) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const tier = getDeviceTier()
    const layout = getLayout(tier === 'low' ? 340 : tier === 'mid' ? 520 : 720)

    // HTML labels, moved with transforms only (no layout work per frame).
    const chips = [...visual.querySelectorAll('[data-why-chip]')]
    const you = visual.querySelector('[data-why-you]')
    const savedChipStyles = chips.map((el) => ({ left: el.style.left, top: el.style.top }))
    chips.forEach((el) => {
      el.style.left = '0px'
      el.style.top = '0px'
    })

    let width = 1
    let height = 1
    let dpr = 1
    let colors = readThemeColors()
    let sprites = []
    let smooth = reduced ? 0.5 : clamp01(progress?.get?.() ?? 0)
    let armed = smooth < 0.8
    let pulseStart = -1
    const chipHalfW = new Float32Array(CHIP_COUNT).fill(40)
    const chipHalfH = new Float32Array(CHIP_COUNT).fill(14)
    const measureChips = () => {
      // Read once per resize (not per frame): chip sizes keep labels and halos inside the box.
      chips.forEach((el, i) => {
        chipHalfW[i] = el.offsetWidth / 2
        chipHalfH[i] = el.offsetHeight / 2
      })
    }
    const chipX = new Float32Array(CHIP_COUNT)
    const chipY = new Float32Array(CHIP_COUNT)
    const chipJoin = new Float32Array(CHIP_COUNT)

    const buildSprites = () => {
      const palette = colors.dark
        ? [colors.cyan, colors.teal, colors.cyan700]
        : [colors.cyan700, colors.teal, colors.cyan]
      sprites = palette.map((c) => createDotSprite(c, 32))
    }
    buildSprites()

    const render = (time) => {
      const target = reduced ? 0.5 : clamp01(progress?.get?.() ?? 0)
      smooth += (target - smooth) * (reduced ? 1 : 0.12)
      if (Math.abs(target - smooth) < 0.0005) smooth = target
      const p = smooth
      const t = reduced ? 0 : time

      const cx = width / 2
      const cy = height / 2
      const { rx, ry } = ringRadii(width, height)
      const rotation = reduced ? 0 : t * 0.00005
      const together = window01(p, 0.14, 0.32) // average "ring formed" amount
      const toHeart = window01(p, 0.58, 0.3)
      const ringVisible = together * (1 - toHeart)
      const small = width < 520

      // One gentle pulse when the heart completes (re-arms after scrolling back up).
      if (!reduced) {
        if (p > 0.96 && armed) {
          armed = false
          pulseStart = time
        }
        if (p < 0.8) armed = true
      }
      const pulseT = pulseStart < 0 ? 1 : clamp01((time - pulseStart) / 700)
      const heartScale = 1 + 0.06 * Math.sin(Math.PI * pulseT)

      // ---- Chips: scattered spot -> ring slot -> fade ----
      for (let i = 0; i < CHIP_COUNT; i += 1) {
        const join = window01(p, 0.1 + i * 0.016, 0.3)
        const drift = 9 * (1 - join)
        const sx = SCATTER_POINTS[i][0] * width + Math.sin(t * 0.00045 + i * 1.7) * drift
        const sy = SCATTER_POINTS[i][1] * height + Math.cos(t * 0.0004 + i * 2.3) * drift
        const angle = RING_START + i * RING_STEP + rotation
        const tx = cx + Math.cos(angle) * rx
        const ty = cy + Math.sin(angle) * ry
        const minX = chipHalfW[i] + 4
        const minY = chipHalfH[i] + 4
        chipX[i] = Math.min(width - minX, Math.max(minX, sx + (tx - sx) * join))
        chipY[i] = Math.min(height - minY, Math.max(minY, sy + (ty - sy) * join))
        chipJoin[i] = join
        const fade = window01(p, 0.56 + i * 0.012, 0.14)
        const el = chips[i]
        if (el) {
          el.style.transform = `translate3d(${chipX[i].toFixed(1)}px, ${chipY[i].toFixed(1)}px, 0) translate(-50%, -50%) scale(${(1 - 0.12 * fade).toFixed(3)})`
          el.style.opacity = (1 - fade).toFixed(3)
        }
      }
      if (you) {
        you.style.opacity = ringVisible.toFixed(3)
        you.style.transform = `translate(-50%, -50%) scale(${(0.82 + 0.18 * together).toFixed(3)})`
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      const lineColor = colors.dark ? colors.cyan : colors.navy

      // ---- Ring: soft centre glow, orbit, spokes ----
      if (ringVisible > 0.01) {
        const glowR = small ? 56 : 76
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR)
        glow.addColorStop(0, rgba(colors.dark ? colors.cyan : colors.cyan700, (colors.dark ? 0.45 : 0.22) * ringVisible))
        glow.addColorStop(1, rgba(colors.dark ? colors.cyan : colors.cyan700, 0))
        ctx.fillStyle = glow
        ctx.fillRect(cx - glowR, cy - glowR, glowR * 2, glowR * 2)

        ctx.lineWidth = 1
        ctx.strokeStyle = rgba(lineColor, (colors.dark ? 0.3 : 0.2) * ringVisible)
        ctx.beginPath()
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()

        const hub = small ? 26 : 32
        for (let i = 0; i < CHIP_COUNT; i += 1) {
          const a = chipJoin[i] * (1 - toHeart)
          if (a < 0.01) continue
          const dx = chipX[i] - cx
          const dy = chipY[i] - cy
          const len = Math.hypot(dx, dy) || 1
          // Spokes "draw" outward from the centre as each chip arrives.
          const reach = hub + (len - hub) * ease(chipJoin[i] * 1.15)
          ctx.strokeStyle = rgba(lineColor, (colors.dark ? 0.5 : 0.34) * a)
          ctx.lineWidth = 1.2
          ctx.beginPath()
          ctx.moveTo(cx + (dx / len) * hub, cy + (dy / len) * hub)
          ctx.lineTo(cx + (dx / len) * reach, cy + (dy / len) * reach)
          ctx.stroke()
        }
      }

      // ---- Heart + ECG (state 3) ----
      const heartSize = Math.min(width, height) * (small ? 1 : 0.96)
      const hx0 = cx - heartSize / 2
      const hy0 = cy - heartSize / 2
      if (toHeart > 0.01) {
        ctx.lineWidth = 1.25
        ctx.strokeStyle = rgba(colors.dark ? colors.cyan : colors.cyan700, toHeart * 0.2)
        ctx.beginPath()
        ECG_POINTS.forEach(([ex, ey], i) => {
          const px = hx0 + ex * heartSize
          const py = hy0 + ey * heartSize
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        })
        ctx.stroke()
      }

      // ---- Particles ----
      ctx.globalCompositeOperation = colors.dark ? 'lighter' : 'source-over'
      const pulseX = reduced ? -1 : ((t * 0.00018) % 1.4) - 0.2
      const dotScale = small ? 0.85 : 1
      for (let k = 0; k < layout.count; k += 1) {
        const c = layout.chip[k]
        const d = layout.delay[k]
        const seed = layout.seed[k]
        let x
        let y
        if (c >= 0) {
          // A soft halo just outside the chip's edge; it tightens as the chip joins the ring.
          const spread = layout.offR[k] * (1 - 0.7 * chipJoin[c]) * (small ? 0.75 : 1)
          const a = layout.offA[k] + t * 0.00035
          x = chipX[c] + Math.cos(a) * (chipHalfW[c] + 5 + spread * 18)
          y = chipY[c] + Math.sin(a) * (chipHalfH[c] + 4 + spread * 13)
        } else {
          const join = window01(p, 0.1 + d * 0.12, 0.3)
          const drift = 10 * (1 - join)
          const sx = layout.freeX[k] * width + Math.sin(t * 0.0005 + seed) * drift
          const sy = layout.freeY[k] * height + Math.cos(t * 0.00045 + seed * 1.7) * drift
          const a = layout.orbitA[k] + rotation
          const ox = cx + Math.cos(a) * (rx + layout.orbitJ[k] * 6)
          const oy = cy + Math.sin(a) * (ry + layout.orbitJ[k] * 6)
          x = sx + (ox - sx) * join
          y = sy + (oy - sy) * join
        }

        const flow = window01(p, 0.56 + d * 0.14, 0.28)
        let fx = layout.finalX[k]
        let fy = layout.finalY[k]
        if (!layout.isEcg[k]) {
          fx = 0.5 + (fx - 0.5) * heartScale
          fy = 0.5 + (fy - 0.5) * heartScale
        }
        x += (hx0 + fx * heartSize - x) * flow
        y += (hy0 + fy * heartSize - y) * flow

        let radius = (1.8 + layout.size[k] * 1.5) * dotScale
        let alpha = c >= 0 ? 0.8 : 0.55 + 0.25 * together
        alpha = alpha + (0.92 - alpha) * flow
        if (flow > 0.5 && layout.isEcg[k]) {
          const near = Math.max(0, 1 - Math.abs(layout.finalX[k] - pulseX) * 9)
          radius += near * 1.5
          alpha = Math.min(1, alpha + near * 0.35)
        }
        ctx.globalAlpha = alpha
        ctx.drawImage(sprites[layout.color[k]], x - radius, y - radius, radius * 2, radius * 2)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    let shown = false
    const loop = createRenderLoop(canvas, (time) => {
      render(time)
      if (!shown) {
        shown = true
        canvas.classList.add('is-ready')
      }
    })
    if (reduced) loop.setContinuous(false)

    const stopResize = observeCanvasSize(
      canvas,
      (next) => {
        width = next.width
        height = next.height
        dpr = next.dpr
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
        measureChips()
        loop.requestFrame()
      },
      tier,
    )

    const stopTheme = observeTheme((next) => {
      colors = next
      buildSprites()
      loop.requestFrame()
    })

    return () => {
      loop.stop()
      stopResize()
      stopTheme()
      sprites = []
      // Hand the labels back to their static CSS layout.
      chips.forEach((el, i) => {
        el.style.left = savedChipStyles[i].left
        el.style.top = savedChipStyles[i].top
        el.style.transform = ''
        el.style.opacity = ''
      })
      if (you) {
        you.style.opacity = ''
        you.style.transform = ''
      }
    }
  }), [progress, reduced])

  return <canvas ref={canvasRef} className="effect-fade block h-full w-full" aria-hidden="true" />
}

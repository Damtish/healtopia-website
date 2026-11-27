import { useEffect, useRef } from 'react'
import {
  clamp01,
  createDotSprite,
  createRandom,
  createRenderLoop,
  getDeviceTier,
  observeCanvasSize,
  observeTheme,
  readThemeColors,
  rgba,
  smoothstep,
} from './effectUtils'

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

function samplePolyline(points, count, random, jitter) {
  const lengths = [0]
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i][0] - points[i - 1][0]
    const dy = points[i][1] - points[i - 1][1]
    lengths.push(lengths[i - 1] + Math.hypot(dx, dy))
  }
  const total = lengths[lengths.length - 1]
  const out = []
  for (let n = 0; n < count; n += 1) {
    const target = ((n + random() * 0.6) / count) * total
    let i = 1
    while (i < lengths.length - 1 && lengths[i] < target) i += 1
    const segment = lengths[i] - lengths[i - 1] || 1
    const t = (target - lengths[i - 1]) / segment
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
    const x = 16 * Math.sin(t) ** 3
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    raw.push([x, y])
  }
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  raw.forEach(([x, y]) => {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  })
  const scale = 0.62 / Math.max(maxX - minX, maxY - minY)
  return raw.map(([x, y]) => [0.5 + (x - (minX + maxX) / 2) * scale, 0.5 + (y - (minY + maxY) / 2) * scale])
}

function buildLayout(count) {
  const random = createRandom(20240611)

  // Network nodes: a calm, loosely organic layout inside the unit square.
  const nodes = [
    [0.16, 0.3], [0.36, 0.16], [0.6, 0.22], [0.84, 0.32], [0.24, 0.6],
    [0.5, 0.46], [0.76, 0.6], [0.4, 0.82], [0.66, 0.84], [0.12, 0.84], [0.9, 0.86],
  ]
  const edges = []
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: Math.hypot(a[0] - b[0], a[1] - b[1]) }))
      .filter((n) => n.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 2)
    nearest.forEach(({ j }) => {
      if (!edges.some(([p, q]) => (p === i && q === j) || (p === j && q === i))) edges.push([i, j])
    })
  })

  // A few extra links through the centre so it reads as one connected team.
  ;[[5, 1], [5, 4], [5, 6], [5, 7]].forEach(([a, b]) => {
    if (!edges.some(([p, q]) => (p === a && q === b) || (p === b && q === a))) edges.push([a, b])
  })

  const heart = heartOutline()
  const heartCount = Math.round(count * 0.66)
  const heartPoints = samplePolyline(heart, heartCount, random, 0.012)
  const ecgPoints = samplePolyline(ECG_POINTS, count - heartCount, random, 0.008)
  const finalPoints = [...heartPoints, ...ecgPoints]

  const data = {
    count,
    scatterX: new Float32Array(count),
    scatterY: new Float32Array(count),
    scatterMode: new Uint8Array(count),
    netX: new Float32Array(count),
    netY: new Float32Array(count),
    finalX: new Float32Array(count),
    finalY: new Float32Array(count),
    delay: new Float32Array(count),
    seed: new Float32Array(count),
    size: new Float32Array(count),
    color: new Uint8Array(count),
    isEcg: new Uint8Array(count),
    nodes,
    edges,
  }

  // Shuffle final targets so neighbours in the cloud travel to different places.
  const order = Array.from({ length: count }, (_, i) => i)
  for (let i = count - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }

  for (let i = 0; i < count; i += 1) {
    // Most of the cloud drifts loosely around where the shape will form (stage units,
    // -0.35..1.35); the rest spreads across the whole canvas.
    if (random() < 0.62) {
      data.scatterMode[i] = 1
      data.scatterX[i] = -0.35 + random() * 1.7
      data.scatterY[i] = -0.2 + random() * 1.4
    } else {
      data.scatterX[i] = random()
      data.scatterY[i] = random()
    }

    if (random() < 0.42) {
      const node = nodes[Math.floor(random() * nodes.length)]
      const r = Math.sqrt(random()) * 0.035
      const a = random() * Math.PI * 2
      data.netX[i] = node[0] + Math.cos(a) * r
      data.netY[i] = node[1] + Math.sin(a) * r
    } else {
      const [p, q] = edges[Math.floor(random() * edges.length)]
      const t = random()
      data.netX[i] = nodes[p][0] + (nodes[q][0] - nodes[p][0]) * t + (random() - 0.5) * 0.012
      data.netY[i] = nodes[p][1] + (nodes[q][1] - nodes[p][1]) * t + (random() - 0.5) * 0.012
    }

    const target = order[i]
    data.finalX[i] = finalPoints[target][0]
    data.finalY[i] = finalPoints[target][1]
    data.isEcg[i] = target >= heartCount ? 1 : 0
    data.delay[i] = random()
    data.seed[i] = random() * Math.PI * 2
    data.size[i] = 0.75 + random() * 0.6
    data.color[i] = random() < 0.5 ? 0 : random() < 0.8 ? 1 : 2
  }

  return data
}

/**
 * Scattered dots → connected care network → heart + ECG line.
 * `progress` is a framer-motion MotionValue (0..1) for the pinned scroll range.
 */
export default function TogetherCanvas({ progress, reduced = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const tier = getDeviceTier()
    const count = tier === 'low' ? 460 : tier === 'mid' ? 760 : 1050
    const layout = buildLayout(count)

    let width = 1
    let height = 1
    let dpr = 1
    let colors = readThemeColors()
    let sprites = []
    let smooth = reduced ? 1 : clamp01(progress?.get?.() ?? 0)
    const nodePx = new Float32Array(layout.nodes.length * 2)

    const buildSprites = () => {
      // navy-700 is a deep navy in light mode and a pale blue in dark mode.
      const palette = [colors.dark ? colors.cyan : colors.cyan700, colors.teal, colors.navy700]
      sprites = palette.map((c) => createDotSprite(c, 32))
    }
    buildSprites()

    const stage = () => {
      // Where the network/heart forms: right side on desktop, lower half on phones.
      if (width >= 1024) {
        const size = Math.min(width * 0.46, height * 0.82)
        return { x: width * 0.73 - size / 2, y: height * 0.5 - size / 2, size }
      }
      const size = Math.min(width * 0.9, height * 0.44)
      return { x: width / 2 - size / 2, y: height * 0.74 - size / 2, size }
    }

    const render = (time) => {
      const target = reduced ? 1 : clamp01(progress?.get?.() ?? 0)
      smooth += (target - smooth) * (reduced ? 1 : 0.12)
      const p = smooth
      const t = reduced ? 0 : time

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const { x: sx, y: sy, size } = stage()
      const network = smoothstep(0.08, 0.42, p)
      const final = smoothstep(0.55, 0.88, p)
      const beat = reduced ? 0 : Math.pow(Math.max(0, Math.sin(t * 0.0021)), 16)
      const pulseX = reduced ? -1 : ((t * 0.00018) % 1.4) - 0.2

      // Network edges.
      const edgeAlpha = network * (1 - final) * (colors.dark ? 0.32 : 0.28)
      layout.nodes.forEach(([nx, ny], i) => {
        nodePx[i * 2] = sx + nx * size
        nodePx[i * 2 + 1] = sy + ny * size
      })
      if (edgeAlpha > 0.01) {
        ctx.lineWidth = 1
        ctx.strokeStyle = rgba(colors.dark ? colors.cyan : colors.cyan700, edgeAlpha)
        ctx.beginPath()
        layout.edges.forEach(([a, b]) => {
          ctx.moveTo(nodePx[a * 2], nodePx[a * 2 + 1])
          ctx.lineTo(nodePx[b * 2], nodePx[b * 2 + 1])
        })
        ctx.stroke()
      }

      // Faint ECG guide line under the final formation.
      if (final > 0.01) {
        ctx.lineWidth = 1.25
        ctx.strokeStyle = rgba(colors.dark ? colors.cyan : colors.cyan700, final * 0.22)
        ctx.beginPath()
        ECG_POINTS.forEach(([ex, ey], i) => {
          const px = sx + ex * size
          const py = sy + ey * size
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        })
        ctx.stroke()
      }

      ctx.globalCompositeOperation = colors.dark ? 'lighter' : 'source-over'
      const drift = 12 * (1 - network) + 3 * network * (1 - final) + 1 * final
      const heartScale = 1 + beat * 0.035
      const lag = 0.14

      for (let i = 0; i < layout.count; i += 1) {
        const d = layout.delay[i] * lag
        const m1 = smoothstep(0.08 + d, 0.42 + d, p)
        const m2 = smoothstep(0.55 + d * 0.8, 0.88 + d * 0.8, p)

        const local = layout.scatterMode[i] === 1
        const scX = local ? sx + layout.scatterX[i] * size : layout.scatterX[i] * width
        const scY = local ? sy + layout.scatterY[i] * size : layout.scatterY[i] * height
        const ntX = sx + layout.netX[i] * size
        const ntY = sy + layout.netY[i] * size
        let fx = layout.finalX[i]
        let fy = layout.finalY[i]
        if (!layout.isEcg[i]) {
          fx = 0.5 + (fx - 0.5) * heartScale
          fy = 0.5 + (fy - 0.5) * heartScale
        }
        const fnX = sx + fx * size
        const fnY = sy + fy * size

        let x = scX + (ntX - scX) * m1
        let y = scY + (ntY - scY) * m1
        x += (fnX - x) * m2
        y += (fnY - y) * m2

        const seed = layout.seed[i]
        x += Math.sin(t * 0.0006 + seed) * drift
        y += Math.cos(t * 0.0005 + seed * 1.7) * drift

        let radius = 2.2 + layout.size[i] * 1.8
        let alpha = 0.72 + 0.2 * m1 + 0.08 * m2
        if (m2 > 0.5 && layout.isEcg[i]) {
          const near = Math.max(0, 1 - Math.abs(layout.finalX[i] - pulseX) * 9)
          radius += near * 1.6
          alpha = Math.min(1, alpha + near * 0.4)
        }

        ctx.globalAlpha = alpha
        ctx.drawImage(sprites[layout.color[i]], x - radius, y - radius, radius * 2, radius * 2)
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = createRenderLoop(canvas, render)
    if (reduced) loop.setContinuous(false)

    const stopResize = observeCanvasSize(
      canvas,
      (next) => {
        width = next.width
        height = next.height
        dpr = next.dpr
        canvas.width = Math.round(width * dpr)
        canvas.height = Math.round(height * dpr)
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
    }
  }, [progress, reduced])

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
}

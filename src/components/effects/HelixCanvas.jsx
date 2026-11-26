import { useEffect, useRef } from 'react'
import {
  clamp01,
  createDotSprite,
  createRenderLoop,
  getDeviceTier,
  observeCanvasSize,
  observeTheme,
  readThemeColors,
  smoothstep,
} from './effectUtils'

/**
 * A slowly rotating particle DNA double helix drawn on a 2D canvas.
 * `progress` is a framer-motion MotionValue (0..1): the helix is lit down to that point.
 */
export default function HelixCanvas({ progress, reduced = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const tier = getDeviceTier()
    const spacing = tier === 'low' ? 10 : tier === 'mid' ? 8 : 7
    const spriteSize = 32

    let width = 1
    let height = 1
    let dpr = 1
    let colors = readThemeColors()
    let sprites = null
    let smoothProgress = progress?.get?.() ?? 0

    const buildSprites = () => {
      sprites = {
        a: createDotSprite(colors.cyan, spriteSize),
        b: createDotSprite(colors.teal, spriteSize),
        dim: createDotSprite(colors.gray, spriteSize),
        glow: createDotSprite(colors.cyan, 64, { core: 0.12 }),
      }
    }
    buildSprites()

    const drawDot = (sprite, x, y, size, alpha) => {
      if (alpha <= 0.01) return
      ctx.globalAlpha = alpha
      ctx.drawImage(sprite, x - size, y - size, size * 2, size * 2)
    }

    const render = (time) => {
      const target = clamp01(progress?.get?.() ?? 1)
      // Ease toward scroll progress so fast scrolling still looks smooth.
      smoothProgress += (target - smoothProgress) * (reduced ? 1 : 0.16)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = colors.dark ? 'lighter' : 'source-over'

      const cx = width / 2
      const amp = Math.min(width * 0.3, 44)
      const wavelength = width < 90 ? 170 : 230
      const k = (Math.PI * 2) / wavelength
      const phase = reduced ? 0.6 : time * 0.00042 + smoothProgress * 2.2
      const litY = smoothProgress * height
      const rungEvery = 3
      const dimAlpha = colors.dark ? 0.42 : 0.4

      // Two passes: back half first, then the front half, for depth.
      for (let pass = 0; pass < 2; pass += 1) {
        let index = 0
        for (let y = spacing / 2; y < height; y += spacing, index += 1) {
          const angle = y * k + phase
          const s = Math.sin(angle)
          const c = Math.cos(angle)
          const lit = smoothstep(litY + 40, litY - 10, y)
          const xa = cx + amp * s
          const xb = cx - amp * s
          const za = (c + 1) / 2
          const zb = (1 - c) / 2

          const front = pass === 1
          if ((za >= 0.5) === front) {
            const size = 2 + za * 2.2
            drawDot(lit > 0.5 ? sprites.a : sprites.dim, xa, y, size, (0.35 + za * 0.65) * (dimAlpha + (1 - dimAlpha) * lit))
          }
          if ((zb >= 0.5) === front) {
            const size = 2 + zb * 2.2
            drawDot(lit > 0.5 ? sprites.b : sprites.dim, xb, y, size, (0.35 + zb * 0.65) * (dimAlpha + (1 - dimAlpha) * lit))
          }

          // Base-pair rungs: a few small particles between the strands.
          if (pass === 0 && index % rungEvery === 0 && Math.abs(s) > 0.18) {
            const rungAlpha = (0.16 + 0.34 * lit) * Math.abs(s)
            for (let j = 1; j < 4; j += 1) {
              const t = j / 4
              drawDot(t < 0.5 ? sprites.a : sprites.b, xa + (xb - xa) * t, y, 1.3, rungAlpha)
            }
          }
        }
      }

      // Soft scan glow at the current scroll point.
      if (smoothProgress > 0.002 && smoothProgress < 0.998) {
        const pulse = reduced ? 1 : 0.8 + 0.2 * Math.sin(time * 0.004)
        drawDot(sprites.glow, cx, litY, amp * 0.9 * pulse, colors.dark ? 0.55 : 0.4)
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    const loop = createRenderLoop(canvas, render)
    if (reduced) loop.setContinuous(false)

    const stopResize = observeCanvasSize(
      canvas,
      (size) => {
        width = size.width
        height = size.height
        dpr = size.dpr
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

    // In reduced-motion mode we only redraw when the scroll position changes.
    const unsubscribe = reduced && progress?.on ? progress.on('change', () => loop.requestFrame()) : null

    return () => {
      loop.stop()
      stopResize()
      stopTheme()
      unsubscribe?.()
      sprites = null
    }
  }, [progress, reduced])

  return <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
}

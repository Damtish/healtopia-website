import { useEffect, useRef, useState } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'
import { HeartPulse } from 'lucide-react'
import {
  clamp01,
  createRandom,
  createRenderLoop,
  deferSetup,
  scheduleIdle,
  getDeviceTier,
  getPixelRatio,
  observeTheme,
  readThemeColors,
} from './effectUtils'

const HEART_REGION_COUNT = 5

// Yaw (radians) that turns each region toward the viewer.
// 0 left ventricle · 1 right ventricle · 2 aorta + great vessels · 3 right atrium + venae cavae · 4 left atrium + pulmonary
const REGION_YAW = [-0.65, 0.3, -0.05, 0.85, -2.1]
const REGION_PITCH = [0.05, 0.02, 0.22, 0.08, 0.12]

// ---------- Anatomical point cloud ----------

function randomOnSphere(random) {
  // Marsaglia method: uniform direction.
  let x1
  let x2
  let s
  do {
    x1 = random() * 2 - 1
    x2 = random() * 2 - 1
    s = x1 * x1 + x2 * x2
  } while (s >= 1 || s === 0)
  const f = 2 * Math.sqrt(1 - s)
  return [x1 * f, x2 * f, 1 - 2 * s]
}

function rotateZ([x, y, z], a) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return [x * c - y * s, x * s + y * c, z]
}

function bezier(p0, p1, p2, t) {
  const u = 1 - t
  return [0, 1, 2].map((k) => u * u * p0[k] + 2 * u * t * p1[k] + t * t * p2[k])
}

function sampleTube(out, count, random, region, path, radius, taper = 1) {
  for (let i = 0; i < count; i += 1) {
    const t = random()
    const p = path(t)
    const eps = 0.01
    const q = path(Math.min(1, t + eps))
    const r = path(Math.max(0, t - eps))
    let tx = q[0] - r[0]
    let ty = q[1] - r[1]
    let tz = q[2] - r[2]
    const tl = Math.hypot(tx, ty, tz) || 1
    tx /= tl
    ty /= tl
    tz /= tl
    // Build a frame around the tangent.
    let ax = 0
    let ay = 0
    let az = 1
    if (Math.abs(tz) > 0.9) {
      ax = 1
      az = 0
    }
    let nx = ty * az - tz * ay
    let ny = tz * ax - tx * az
    let nz = tx * ay - ty * ax
    const nl = Math.hypot(nx, ny, nz) || 1
    nx /= nl
    ny /= nl
    nz /= nl
    const bx = ty * nz - tz * ny
    const by = tz * nx - tx * nz
    const bz = tx * ny - ty * nx
    const angle = random() * Math.PI * 2
    const rr = radius * (1 - (1 - taper) * t) * (0.94 + random() * 0.08)
    const ca = Math.cos(angle) * rr
    const sa = Math.sin(angle) * rr
    out.push(p[0] + nx * ca + bx * sa, p[1] + ny * ca + by * sa, p[2] + nz * ca + bz * sa, region)
  }
}

function sampleBlob(out, count, random, region, center, radii, { taper = 0, tilt = 0, accept } = {}) {
  let made = 0
  let guard = 0
  while (made < count && guard < count * 20) {
    guard += 1
    let [x, y, z] = randomOnSphere(random)
    if (taper && y < 0) {
      const k = 1 + y * taper
      x *= k
      z *= k
    }
    const jitter = 0.97 + random() * 0.05
    let p = [x * radii[0] * jitter, y * radii[1] * jitter, z * radii[2] * jitter]
    const local = p
    if (tilt) p = rotateZ(p, tilt)
    const world = [p[0] + center[0], p[1] + center[1], p[2] + center[2]]
    const r = accept ? accept(local, world) : region
    if (r === null || r === undefined) continue
    out.push(world[0], world[1], world[2], r)
    made += 1
  }
}

function buildHeart(total) {
  const random = createRandom(7741)
  const out = []
  const n = (share) => Math.round(total * share)

  // Ventricles: one tapered mass, split by the interventricular groove.
  const ventricleCenter = [0.12, -0.32, 0]
  sampleBlob(out, n(0.5), random, 0, ventricleCenter, [0.98, 1.08, 0.8], {
    taper: 0.62,
    tilt: 0.42,
    accept: (local) => (local[0] * 0.9 - local[2] * 0.55 < -0.12 ? 1 : 0),
  })

  // Coronary artery (LAD) tracing the groove: a denser bright line on the left ventricle.
  sampleTube(
    out,
    n(0.03),
    random,
    0,
    (t) => {
      const p = bezier([-0.25, 0.45, 0.62], [0.02, -0.35, 0.82], [0.62, -1.18, 0.18], t)
      return p
    },
    0.03,
  )

  // Right atrium (viewer's left, upper) + superior vena cava.
  sampleBlob(out, n(0.1), random, 3, [-0.78, 0.55, 0.05], [0.46, 0.44, 0.44])
  sampleTube(out, n(0.045), random, 3, (t) => [-0.72, 0.85 + t * 0.85, -0.08], 0.16)
  sampleTube(out, n(0.02), random, 3, (t) => [-0.66, 0.15 - t * 0.5, -0.12 - t * 0.1], 0.15, 0.85)

  // Left atrium (posterior, upper right) + left auricle.
  sampleBlob(out, n(0.09), random, 4, [0.55, 0.6, -0.42], [0.46, 0.34, 0.4])
  sampleBlob(out, n(0.025), random, 4, [0.86, 0.45, 0.08], [0.2, 0.13, 0.17])

  // Pulmonary trunk (front) splitting into left and right arteries.
  sampleTube(out, n(0.05), random, 4, (t) => bezier([-0.22, 0.45, 0.42], [-0.12, 1.0, 0.45], [0.05, 1.12, 0.1], t), 0.2)
  sampleTube(out, n(0.025), random, 4, (t) => bezier([0.05, 1.12, 0.1], [0.45, 1.18, 0.02], [0.85, 1.02, -0.18], t), 0.13, 0.8)
  sampleTube(out, n(0.02), random, 4, (t) => bezier([0.05, 1.12, 0.1], [-0.3, 1.2, 0.02], [-0.42, 1.02, -0.2], t), 0.12, 0.8)

  // Aorta: ascending, arch, descending, with three branch vessels.
  const aorta = (t) => {
    if (t < 0.5) return bezier([0.12, 0.45, 0.08], [0.02, 1.35, 0.15], [0.32, 1.62, -0.25], t / 0.5)
    return bezier([0.32, 1.62, -0.25], [0.62, 1.86, -0.62], [0.72, 0.75, -0.72], (t - 0.5) / 0.5)
  }
  sampleTube(out, n(0.11), random, 2, aorta, 0.23)
  ;[
    [0.12, 1.55, -0.05],
    [0.32, 1.7, -0.3],
    [0.5, 1.74, -0.48],
  ].forEach((base, i) => {
    sampleTube(out, n(0.012), random, 2, (t) => [base[0] - 0.05 + i * 0.03, base[1] + t * 0.45, base[2]], 0.075, 0.8)
  })

  // A light halo of ambient particles (region -1, never highlighted).
  for (let i = 0, count = n(0.05); i < count; i += 1) {
    const [x, y, z] = randomOnSphere(random)
    const r = 2.1 + random() * 0.6
    out.push(x * r * 0.85, y * r + 0.25, z * r * 0.85, -1)
  }

  // Centre the model.
  const count = out.length / 4
  let minY = Infinity
  let maxY = -Infinity
  let cx = 0
  let cz = 0
  let solid = 0
  for (let i = 0; i < count; i += 1) {
    if (out[i * 4 + 3] < 0) continue
    cx += out[i * 4]
    cz += out[i * 4 + 2]
    minY = Math.min(minY, out[i * 4 + 1])
    maxY = Math.max(maxY, out[i * 4 + 1])
    solid += 1
  }
  cx /= solid
  cz /= solid
  const cy = (minY + maxY) / 2

  const positions = new Float32Array(count * 3)
  const regions = new Float32Array(count)
  const randoms = new Float32Array(count)
  const regionBounds = Array.from({ length: HEART_REGION_COUNT }, () => [Infinity, -Infinity])
  for (let i = 0; i < count; i += 1) {
    const x = out[i * 4] - cx
    const y = out[i * 4 + 1] - cy
    const z = out[i * 4 + 2] - cz
    const region = out[i * 4 + 3]
    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    regions[i] = region
    randoms[i] = random()
    if (region >= 0) {
      regionBounds[region][0] = Math.min(regionBounds[region][0], y)
      regionBounds[region][1] = Math.max(regionBounds[region][1], y)
    }
  }

  return { positions, regions, randoms, regionBounds, height: maxY - minY }
}

// Generated once per particle count and reused on later mounts.
const heartCache = new Map()
function getHeartModel(total) {
  if (!heartCache.has(total)) heartCache.set(total, buildHeart(total))
  return heartCache.get(total)
}

function heartCountFor(tier) {
  return tier === 'low' ? 4200 : tier === 'mid' ? 6800 : 9500
}

// ---------- Shaders ----------

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uGlow[5];
  uniform float uScanY;
  uniform float uScanOn;
  uniform float uBeat;
  uniform vec3 uBase;
  uniform vec3 uActive;
  uniform vec3 uAccent;
  uniform float uDark;
  attribute float aRegion;
  attribute float aRandom;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float glow = 0.0;
    for (int i = 0; i < 5; i++) {
      glow += uGlow[i] * (1.0 - step(0.5, abs(aRegion - float(i))));
    }
    float ambient = step(aRegion, -0.5);

    vec3 p = position;
    // Gentle heartbeat swell and a little particle shimmer.
    p *= 1.0 + uBeat * 0.035 * (1.0 - ambient);
    p += normalize(p + vec3(0.0001)) * sin(uTime * 1.3 + aRandom * 6.2831) * 0.012;
    if (ambient > 0.5) {
      p.y += sin(uTime * 0.25 + aRandom * 6.2831) * 0.08;
    }

    float band = exp(-pow((position.y - uScanY) * 7.0, 2.0)) * uScanOn;
    float lit = clamp(glow + band * 0.65 * glow, 0.0, 1.4);

    vec3 color = mix(uBase, mix(uActive, uAccent, aRandom * 0.45), clamp(glow, 0.0, 1.0));
    color = mix(color, uActive, band * 0.5 * glow);
    vColor = color;

    float baseAlpha = mix(0.5, 0.5, uDark);
    vAlpha = mix(baseAlpha, 0.95, clamp(lit, 0.0, 1.0)) * mix(1.0, 0.45, ambient);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float depthFade = clamp(1.0 - (-mv.z - 5.0) * 0.18, 0.45, 1.0);
    vAlpha *= depthFade;

    float size = uSize * (0.75 + aRandom * 0.5) * (1.0 + lit * 0.55) * mix(1.0, 0.7, ambient);
    gl_PointSize = size * uPixelRatio / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, vAlpha * soft);
  }
`

function toColor(rgb) {
  return new Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255)
}

/**
 * 3D particle heart. `progress` (MotionValue 0..1) scans the five regions in order;
 * horizontal drag turns the model. Vertical touch scrolling is left to the browser.
 */
export default function ParticleHeart({ progress, reduced = false }) {
  const wrapRef = useRef(null)
  const [failed, setFailed] = useState(false)

  // Setup is deferred to idle callbacks so mounting never blocks a click or route change:
  // the point cloud is generated in one idle step, the WebGL setup runs in the next.
  useEffect(() => deferSetup(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined

    // A fresh canvas per mount: a context that was force-lost on unmount can't be reused.
    const canvas = document.createElement('canvas')
    canvas.className = 'effect-fade block h-full w-full'
    canvas.setAttribute('aria-hidden', 'true')
    wrap.appendChild(canvas)

    const tier = getDeviceTier()
    let renderer
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: tier === 'high' ? 'high-performance' : 'low-power',
      })
    } catch {
      // WebGL unavailable: show a simple static icon instead.
      canvas.remove()
      queueMicrotask(() => setFailed(true))
      return undefined
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(getPixelRatio(tier))

    const scene = new Scene()
    const camera = new PerspectiveCamera(32, 1, 0.1, 50)
    camera.position.set(0, 0, 7.4)

    const model = getHeartModel(heartCountFor(tier))
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(model.positions, 3))
    geometry.setAttribute('aRegion', new BufferAttribute(model.regions, 1))
    geometry.setAttribute('aRandom', new BufferAttribute(model.randoms, 1))

    const glow = [0, 0, 0, 0, 0]
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uSize: { value: 22 },
        uGlow: { value: glow },
        uScanY: { value: 0 },
        uScanOn: { value: reduced ? 0 : 1 },
        uBeat: { value: 0 },
        uBase: { value: new Color() },
        uActive: { value: new Color() },
        uAccent: { value: new Color() },
        uDark: { value: 0 },
      },
    })

    const applyTheme = (colors) => {
      const u = material.uniforms
      if (colors.dark) {
        u.uBase.value.copy(toColor(colors.gray))
        u.uActive.value.copy(toColor(colors.cyan))
        u.uAccent.value.copy(toColor(colors.teal))
        u.uDark.value = 1
        material.blending = AdditiveBlending
      } else {
        u.uBase.value.copy(toColor(colors.silver)).lerp(toColor(colors.gray), 0.7)
        u.uActive.value.copy(toColor(colors.cyan700))
        u.uAccent.value.copy(toColor(colors.teal))
        u.uDark.value = 0
        material.blending = NormalBlending
      }
      material.needsUpdate = true
    }
    applyTheme(readThemeColors())

    const points = new Points(geometry, material)
    points.frustumCulled = false
    const pivot = new Group()
    pivot.add(points)
    scene.add(pivot)

    // ----- Interaction state (plain variables, never React state) -----
    let dragYaw = 0
    let dragVelocity = 0
    let dragging = false
    let lastX = 0
    let yaw = REGION_YAW[0]
    let pitch = REGION_PITCH[0]
    let smooth = reduced ? 0 : clamp01(progress?.get?.() ?? 0)

    const onPointerDown = (event) => {
      if (reduced) return
      dragging = true
      lastX = event.clientX
      dragVelocity = 0
      if (event.pointerType === 'mouse') wrap.setPointerCapture?.(event.pointerId)
      wrap.classList.add('is-dragging')
    }
    const onPointerMove = (event) => {
      if (!dragging) return
      const dx = event.clientX - lastX
      lastX = event.clientX
      const delta = dx * 0.0085
      dragYaw += delta
      dragVelocity = delta
    }
    const endDrag = (event) => {
      if (!dragging) return
      dragging = false
      if (event?.pointerType === 'mouse') wrap.releasePointerCapture?.(event.pointerId)
      wrap.classList.remove('is-dragging')
    }
    wrap.addEventListener('pointerdown', onPointerDown)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerup', endDrag)
    wrap.addEventListener('pointercancel', endDrag)
    wrap.addEventListener('lostpointercapture', endDrag)

    let width = 1
    let height = 1
    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      renderer.setPixelRatio(getPixelRatio(tier))
      renderer.setSize(width, height, false)
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio()
      camera.aspect = width / height
      // Keep the whole heart in frame on narrow (portrait) canvases.
      const fitHeight = model.height * 1.22
      const vFov = (camera.fov * Math.PI) / 180
      const distForHeight = fitHeight / 2 / Math.tan(vFov / 2)
      const distForWidth = distForHeight / Math.min(1, camera.aspect * 1.05)
      camera.position.z = Math.max(distForHeight, distForWidth)
      material.uniforms.uSize.value = (tier === 'low' ? 26 : 22) * (camera.position.z / 7.4)
      camera.updateProjectionMatrix()
    }

    let lastTime = 0
    const render = (time) => {
      const dt = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 0.016
      lastTime = time
      const seconds = reduced ? 0 : time / 1000

      const target = reduced ? 0 : clamp01(progress?.get?.() ?? 0)
      smooth += (target - smooth) * Math.min(1, dt * 7)
      const scaled = smooth * HEART_REGION_COUNT
      const active = Math.min(HEART_REGION_COUNT - 1, Math.floor(scaled))
      const within = clamp01(scaled - active)

      for (let i = 0; i < HEART_REGION_COUNT; i += 1) {
        if (reduced) {
          glow[i] = 0.6
        } else {
          const goal = i === active ? 1 : 0
          glow[i] += (goal - glow[i]) * Math.min(1, dt * 6)
        }
      }

      const [low, high] = model.regionBounds[active]
      material.uniforms.uScanY.value = high + (low - high) * within

      if (!dragging) {
        dragYaw += dragVelocity
        dragVelocity *= 0.92
      }

      const sway = reduced ? 0 : Math.sin(seconds * 0.35) * 0.12
      const goalYaw = REGION_YAW[active] + dragYaw + sway
      const goalPitch = REGION_PITCH[active]
      const ease = reduced ? 1 : Math.min(1, dt * 3.2)
      yaw += (goalYaw - yaw) * ease
      pitch += (goalPitch - pitch) * ease
      pivot.rotation.set(pitch, yaw, -0.06)

      // "Lub-dub" heartbeat.
      const beatPhase = (seconds * 1.05) % 1
      const beat = reduced
        ? 0
        : Math.exp(-Math.pow((beatPhase - 0.08) * 22, 2)) + 0.6 * Math.exp(-Math.pow((beatPhase - 0.26) * 22, 2))
      material.uniforms.uBeat.value = beat
      material.uniforms.uTime.value = seconds

      renderer.render(scene, camera)
    }

    let shown = false
    const loop = createRenderLoop(wrap, (time) => {
      render(time)
      if (!shown) {
        shown = true
        canvas.classList.add('is-ready')
      }
    })
    if (reduced) loop.setContinuous(false)

    const ro = new ResizeObserver(() => {
      resize()
      loop.requestFrame()
    })
    ro.observe(wrap)
    resize()

    const stopTheme = observeTheme((colors) => {
      applyTheme(colors)
      loop.requestFrame()
    })

    const onContextLost = (event) => {
      event.preventDefault()
      loop.setContinuous(false)
    }
    canvas.addEventListener('webglcontextlost', onContextLost)

    return () => {
      loop.stop()
      ro.disconnect()
      stopTheme()
      canvas.removeEventListener('webglcontextlost', onContextLost)
      wrap.removeEventListener('pointerdown', onPointerDown)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerup', endDrag)
      wrap.removeEventListener('pointercancel', endDrag)
      wrap.removeEventListener('lostpointercapture', endDrag)
      pivot.remove(points)
      scene.remove(pivot)
      canvas.remove()
      // GPU cleanup is deferred so it never blocks the click that navigated away.
      scheduleIdle(() => {
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        renderer.forceContextLoss()
      }, 1500)
    }
  }, () => getHeartModel(heartCountFor(getDeviceTier()))), [progress, reduced])

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center text-ht-cyan-700" aria-hidden="true">
        <HeartPulse size={120} strokeWidth={1.2} />
      </div>
    )
  }

  return (
    <div ref={wrapRef} className={`heart-canvas h-full w-full ${reduced ? '' : 'heart-canvas--interactive'}`} />
  )
}

// Shared geometry for the "Why Healtopia" visual (HTML chips + canvas particles).
// Coordinates are normalized to the visual box: 0..1 horizontally and vertically.

export const CARE_CHIPS = ['Visits', 'Labs', 'Prescriptions', 'Referrals', 'Follow-ups', 'Weight plan']

// State 1: loose, scattered resting spots (kept inside the box so chips never clip).
export const SCATTER_POINTS = [
  [0.2, 0.16],
  [0.74, 0.12],
  [0.86, 0.52],
  [0.62, 0.86],
  [0.18, 0.78],
  [0.1, 0.44],
]

// State 2: the ring. Chip i sits at angle -90deg + i * 60deg (top first, clockwise).
export const RING_START = -Math.PI / 2
export const RING_STEP = (Math.PI * 2) / CARE_CHIPS.length

/** Ring radii (px) for a box, shared by the canvas and the chip fallback layout. */
export function ringRadii(width, height) {
  const ry = Math.min(width, height) * 0.36
  const rx = Math.min(width / 2 - 60, ry * 1.45)
  return { rx: Math.max(ry, rx), ry }
}

/** Fallback (pre-JS / reduced motion) ring position as percentages, assuming a square box. */
export function ringPercent(index) {
  const angle = RING_START + index * RING_STEP
  return [50 + Math.cos(angle) * 36, 50 + Math.sin(angle) * 36]
}

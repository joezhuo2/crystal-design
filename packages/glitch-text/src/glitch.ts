export const FRAME_MS = 40

export function noise(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function frameOf(ms: number) {
  return Math.floor(ms / FRAME_MS)
}

export function envelope(ms: number, duration: number, entering: boolean) {
  const p = Math.min(1, Math.max(0, ms / duration))
  return { progress: p, glitch: entering ? 1 - p : p }
}

export interface Slice {
  top: number
  bottom: number
  dx: number
}

export function slice(seed: number, k: number, glitch: number, intensity: number): Slice {
  const r = (n: number) => noise(seed * 131 + k * 17 + n)
  const top = r(1) * 85
  const height = 4 + r(2) * 22 * glitch
  return {
    top,
    bottom: Math.max(0, 100 - top - height),
    dx: (r(3) - 0.5) * 36 * glitch * intensity,
  }
}

export function displacement(seed: number, glitch: number, intensity: number) {
  return glitch * 120 * intensity * (0.4 + noise(seed + 1))
}

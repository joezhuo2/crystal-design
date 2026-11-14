export type RingLevels = { warn?: number; high?: number }
export type RingLevel = 'ok' | 'warn' | 'high'

export const DEFAULT_LEVELS: RingLevels = { warn: 0.7, high: 0.9 }

export function ringFraction(value: number, max: number): number {
  if (!Number.isFinite(value) || !(max > 0)) return 0
  return Math.min(1, Math.max(0, value / max))
}

export function ringLevel(fraction: number, levels: RingLevels = DEFAULT_LEVELS): RingLevel {
  if (levels.high !== undefined && fraction >= levels.high) return 'high'
  if (levels.warn !== undefined && fraction >= levels.warn) return 'warn'
  return 'ok'
}

export function ringDash(fraction: number, radius: number) {
  const circumference = 2 * Math.PI * radius
  return { circumference, offset: circumference * (1 - Math.min(1, Math.max(0, fraction))) }
}

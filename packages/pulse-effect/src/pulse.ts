export type PulseMode = 'opacity' | 'scale' | 'glow'

export const clampMin = (min: number) => Math.min(1, Math.max(0, min))

export const pulseScale = (scale: number) => Math.max(0, scale)

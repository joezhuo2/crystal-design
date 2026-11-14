export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export const interpolate = (from: number, to: number, t: number) =>
  from + (to - from) * easeOut(Math.min(Math.max(t, 0), 1))

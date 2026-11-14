const SLOPE = 2.5066

export function encodeMaps(rgba: ArrayLike<number>, w: number, h: number, sigma: number) {
  const map = new Uint8ClampedArray(w * h * 4)
  const rim = new Uint8ClampedArray(w * h * 4)
  const alpha = (x: number, y: number) => rgba[(y * w + x) * 4 + 3] / 255
  const gain = (sigma * SLOPE) / 2

  for (let y = 0; y < h; y++) {
    const y0 = Math.max(y - 1, 0)
    const y1 = Math.min(y + 1, h - 1)
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(x - 1, 0)
      const x1 = Math.min(x + 1, w - 1)
      const gx = x1 > x0 ? ((alpha(x1, y) - alpha(x0, y)) * 2) / (x1 - x0) : 0
      const gy = y1 > y0 ? ((alpha(x, y1) - alpha(x, y0)) * 2) / (y1 - y0) : 0
      const i = (y * w + x) * 4

      map[i] = 128 + 127 * gx * gain
      map[i + 1] = 128 + 127 * gy * gain
      map[i + 2] = 128
      map[i + 3] = 255

      const length = Math.hypot(gx, gy)
      if (!length) continue
      const depth = (alpha(x, y) - 0.5) * sigma * SLOPE
      const line = Math.max(0, 1 - Math.abs(depth - 0.75) / 0.75)
      const lit = 0.25 + 0.75 * Math.abs((gx + gy) / length) * Math.SQRT1_2
      rim[i] = rim[i + 1] = rim[i + 2] = 255
      rim[i + 3] = 255 * line * lit
    }
  }
  return { map, rim }
}

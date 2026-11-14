const POOLS = {
  digit: '0123456789',
  narrow: 'ijlftr',
  wide: 'mw',
  lower: 'abcdeghknopqsuvxyz',
  upper: 'ABCDEGHKNOPRSTUVXYZ',
}

export function poolFor(ch: string): string | null {
  if (/[0-9]/.test(ch)) return POOLS.digit
  if (/[ijlftr]/.test(ch)) return POOLS.narrow
  if (/[mw]/.test(ch)) return POOLS.wide
  if (/[a-z]/.test(ch)) return POOLS.lower
  if (/[A-Z]/.test(ch)) return POOLS.upper
  return null
}

export function noise(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function revealedCount(length: number, progress: number) {
  return Math.min(length, Math.max(0, Math.floor(progress * length)))
}

export function scrambleFrame(text: string, progress: number, frame: number) {
  const chars = [...text]
  const done = revealedCount(chars.length, progress)
  return chars
    .map((ch, i) => {
      const pool = poolFor(ch)
      if (!pool || i < done) return ch
      return pool[Math.floor(noise(frame * 131 + i * 7 + 1) * pool.length)]
    })
    .join('')
}

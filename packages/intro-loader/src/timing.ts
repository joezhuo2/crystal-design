export const easeOutCubic = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

export const progressAt = (elapsed: number, duration: number) =>
  duration <= 0 ? 1 : easeOutCubic(elapsed / duration)

export const stageIndex = (progress: number, count: number) =>
  Math.max(0, Math.min(count - 1, Math.floor(progress * count)))

export const percentText = (progress: number) => `${String(Math.round(progress * 100)).padStart(3, '0')}%`

export const randomHex = (random: () => number = Math.random, length = 16) => {
  let s = '0x'
  for (let i = 0; i < length; i++) s += '0123456789abcdef'[Math.floor(random() * 16)]
  return s
}

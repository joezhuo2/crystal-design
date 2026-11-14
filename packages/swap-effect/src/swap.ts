export type SwapDirection = 'up' | 'down' | 'none'

export const swapOffsets = (direction: SwapDirection, distance: number) => {
  const sign = direction === 'up' ? 1 : direction === 'down' ? -1 : 0
  return { enter: sign * distance, leave: -sign * distance }
}

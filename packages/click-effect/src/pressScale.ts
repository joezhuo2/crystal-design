export const pressScale = (width: number, height: number) => Math.max(0.9, 1 - 6 / Math.max(width, height, 1))

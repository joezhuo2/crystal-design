export const SHAPES = 'path, line, polyline, polygon, circle, ellipse, rect'

export const drawDelay = (index: number, delay: number, stagger: number) => Math.max(0, delay) + Math.max(0, stagger) * index

export type MorphAnchor =
  | 'top'
  | 'center'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

export type MorphSize = { width: number; height: number }
export type MorphInset = { top: number; right: number; bottom: number; left: number }
export type MorphSides = { top: string; right: string; bottom: string; left: string }

export function anchorFactors(anchor: MorphAnchor): [number, number] {
  const parts = anchor.split('-')
  const x = parts.includes('left') ? 0 : parts.includes('right') ? 1 : 0.5
  const y = parts.includes('top') ? 0 : parts.includes('bottom') ? 1 : 0.5
  return [x, y]
}

const share = (size: number, factor: number) =>
  factor === 0 ? '0px' : factor === 1 ? `calc(100% - ${size}px)` : `calc((100% - ${size}px) * ${factor})`

export function collapsedSides(collapsed: MorphSize | MorphInset, anchor: MorphAnchor): MorphSides {
  if ('top' in collapsed) {
    return {
      top: `${collapsed.top}px`,
      right: `${collapsed.right}px`,
      bottom: `${collapsed.bottom}px`,
      left: `${collapsed.left}px`,
    }
  }
  const [x, y] = anchorFactors(anchor)
  return {
    top: share(collapsed.height, y),
    right: share(collapsed.width, 1 - x),
    bottom: share(collapsed.height, 1 - y),
    left: share(collapsed.width, x),
  }
}

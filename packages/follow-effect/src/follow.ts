export type Box = { left: number; top: number; right: number; bottom: number }

export type Frame = {
  offsetWidth: number
  clientLeft: number
  clientTop: number
  scrollLeft: number
  scrollTop: number
}

export function place(item: Box, rect: Box, frame: Frame) {
  const scale = (rect.right - rect.left) / frame.offsetWidth || 1
  return {
    x: (item.left - rect.left) / scale - frame.clientLeft + frame.scrollLeft,
    y: (item.top - rect.top) / scale - frame.clientTop + frame.scrollTop,
    width: (item.right - item.left) / scale,
    height: (item.bottom - item.top) / scale,
  }
}

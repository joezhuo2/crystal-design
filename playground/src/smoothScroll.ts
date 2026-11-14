export function smoothScroll(ease = 0.08) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let target = scrollY
  let current = scrollY
  let frame = 0

  const tick = () => {
    if (Math.abs(scrollY - current) > 2) {
      target = current = scrollY
      frame = 0
      return
    }
    current += (target - current) * ease
    if (Math.abs(target - current) < 0.5) {
      current = target
      frame = 0
    } else {
      frame = requestAnimationFrame(tick)
    }
    scrollTo(0, current)
  }

  addEventListener(
    'wheel',
    (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1
      const max = document.documentElement.scrollHeight - innerHeight
      if (!frame) target = current = scrollY
      target = Math.max(0, Math.min(max, target + event.deltaY * unit))
      if (!frame) frame = requestAnimationFrame(tick)
    },
    { passive: false },
  )
}

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react'
import { interpolate } from './tween'
import styles from './AnimatedNumber.module.css'

export type AnimatedNumberProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  value: number
  duration?: number
  format?: (value: number) => string
}

const defaultFormat = (value: number) => Math.round(value).toLocaleString()

export function AnimatedNumber({
  value,
  duration = 600,
  format = defaultFormat,
  className,
  ...rest
}: AnimatedNumberProps) {
  const [shown, setShown] = useState(value)
  const current = useRef(value)

  useEffect(() => {
    if (current.current === value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || duration <= 0) {
      current.current = value
      setShown(value)
      return
    }
    const from = current.current
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = (now - start) / duration
      current.current = interpolate(from, value, t)
      setShown(current.current)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration])

  return (
    <span className={[styles.number, className].filter(Boolean).join(' ')} {...rest}>
      <span className={styles.sr}>{format(value)}</span>
      <span aria-hidden="true">{format(shown)}</span>
    </span>
  )
}

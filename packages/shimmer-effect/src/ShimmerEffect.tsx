import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import styles from './ShimmerEffect.module.css'

export type ShimmerEffectProps = {
  color?: string
  duration?: number
  delay?: number
  trigger?: 'loop' | 'hover'
  radius?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const SWEEP: Keyframe[] = [{ transform: 'translateX(-130%)' }, { transform: 'translateX(130%)' }]

export function ShimmerEffect({
  color = 'rgb(255 255 255 / 0.5)',
  duration = 1.2,
  delay = 2,
  trigger = 'loop',
  radius = 12,
  className,
  style,
  children,
}: ShimmerEffectProps) {
  const band = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = band.current
    if (!el || trigger !== 'loop' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const anim = el.animate(SWEEP, { duration: duration * 1000, endDelay: delay * 1000, iterations: Infinity, easing: 'ease-in-out' })
    return () => anim.cancel()
  }, [trigger, duration, delay])

  const play = () => {
    if (trigger !== 'hover' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    band.current?.animate(SWEEP, { duration: duration * 1000, easing: 'ease-in-out' })
  }

  return (
    <span
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ '--cd-shimmer-color': color, '--cd-shimmer-radius': `${radius}px`, ...style } as CSSProperties}
      onPointerEnter={play}
    >
      {children}
      <span className={styles.clip} aria-hidden>
        <span ref={band} className={styles.band} />
      </span>
    </span>
  )
}

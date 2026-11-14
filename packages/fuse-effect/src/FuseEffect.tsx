import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import styles from './FuseEffect.module.css'
import { createTimer } from './timer'

export type FuseEffectProps = {
  active?: boolean
  duration?: number
  paused?: boolean
  pauseOnHover?: boolean
  variant?: 'outline' | 'bar'
  color?: string
  thickness?: number
  radius?: number
  onEnd?: () => void
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const idle = { pause: () => {}, resume: () => {} }

export function FuseEffect({
  active = false,
  duration = 4000,
  paused = false,
  pauseOnHover = false,
  variant = 'outline',
  color,
  thickness,
  radius,
  onEnd,
  className,
  style,
  children,
}: FuseEffectProps) {
  const root = useRef<HTMLSpanElement>(null)
  const fuse = useRef<SVGRectElement & HTMLSpanElement>(null)
  const hold = useRef(idle)
  const latest = useRef({ onEnd })
  latest.current = { onEnd }
  const [box, setBox] = useState({ w: 0, h: 0, r: 0 })
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden)
  const stroke = thickness ?? 2
  const held = paused || hidden || (pauseOnHover && hovered)

  useLayoutEffect(() => {
    const el = root.current
    if (!active || !el || variant !== 'outline') return
    const measure = () => {
      const target = (el.firstElementChild ?? el) as HTMLElement
      const r = radius ?? (parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0)
      setBox({ w: el.offsetWidth, h: el.offsetHeight, r })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [active, variant, radius])

  useEffect(() => {
    const sync = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  useEffect(() => {
    const el = fuse.current
    if (!active || !el) return
    const keyframes =
      variant === 'outline'
        ? [{ strokeDashoffset: 0 }, { strokeDashoffset: -1 }]
        : [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }]
    const anim = el.animate(keyframes, { duration, easing: 'linear', fill: 'forwards' })
    const timer = createTimer(duration, () => latest.current.onEnd?.())
    hold.current = {
      pause: () => {
        timer.pause()
        anim.pause()
      },
      resume: () => {
        timer.resume()
        anim.play()
      },
    }
    return () => {
      timer.pause()
      anim.cancel()
      hold.current = idle
    }
  }, [active, duration, variant])

  useEffect(() => {
    if (!active) return
    if (held) hold.current.pause()
    else hold.current.resume()
  }, [active, duration, variant, held])

  const vars = {
    ...(color && { '--fe-color': color }),
    ...(thickness && { '--fe-thickness': `${thickness}px` }),
    ...style,
  } as CSSProperties

  return (
    <span
      ref={root}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={vars}
      data-active={active || undefined}
      onPointerEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onPointerLeave={pauseOnHover ? () => setHovered(false) : undefined}
    >
      {children}
      {active && (
        <span className={styles.layer} aria-hidden>
          {variant === 'outline' ? (
            <svg className={styles.outline}>
              <rect
                ref={fuse}
                className={styles.stroke}
                x={stroke / 2}
                y={stroke / 2}
                width={Math.max(0, box.w - stroke)}
                height={Math.max(0, box.h - stroke)}
                rx={Math.max(0, box.r - stroke / 2)}
                strokeWidth={stroke}
                pathLength={1}
              />
            </svg>
          ) : (
            <span ref={fuse} className={styles.bar} />
          )}
        </span>
      )}
    </span>
  )
}

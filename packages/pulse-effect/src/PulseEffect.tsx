import type { CSSProperties, HTMLAttributes } from 'react'
import { clampMin, pulseScale, type PulseMode } from './pulse'
import styles from './PulseEffect.module.css'

export type PulseEffectProps = HTMLAttributes<HTMLSpanElement> & {
  active?: boolean
  duration?: number
  min?: number
  scale?: number
  mode?: PulseMode
  radius?: number | string
}

export function PulseEffect({
  active = true,
  duration = 800,
  min = 0.5,
  scale = 1.06,
  mode = 'opacity',
  radius = 12,
  className,
  style,
  children,
  ...rest
}: PulseEffectProps) {
  return (
    <span
      {...rest}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-active={active}
      data-mode={mode}
      style={
        {
          '--pulse-duration': `${duration}ms`,
          '--pulse-min': clampMin(min),
          '--pulse-scale': pulseScale(scale),
          '--pulse-radius': typeof radius === 'number' ? `${radius}px` : radius,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  )
}

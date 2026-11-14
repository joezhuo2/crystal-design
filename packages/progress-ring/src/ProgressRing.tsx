import type { CSSProperties, ReactNode } from 'react'
import styles from './ProgressRing.module.css'
import { DEFAULT_LEVELS, ringDash, ringFraction, ringLevel, type RingLevels } from './ring'

export type ProgressRingProps = {
  value: number
  max?: number
  size?: number
  thickness?: number
  levels?: RingLevels
  pulse?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
  'aria-label'?: string
}

export function ProgressRing({
  value,
  max = 1,
  size = 64,
  thickness = 6,
  levels = DEFAULT_LEVELS,
  pulse = false,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}: ProgressRingProps) {
  const fraction = ringFraction(value, max)
  const level = ringLevel(fraction, levels)
  const radius = (size - thickness) / 2
  const { circumference, offset } = ringDash(fraction, radius)
  return (
    <div
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={Math.min(max, Math.max(0, Number.isFinite(value) ? value : 0))}
      aria-valuemin={0}
      aria-valuemax={max}
      data-level={level}
      data-pulse={pulse && level === 'high' ? '' : undefined}
      className={[styles.ring, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
    >
      <svg className={styles.svg} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle className={styles.track} cx={size / 2} cy={size / 2} r={radius} strokeWidth={thickness} />
        <circle
          className={styles.bar}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {children !== undefined && <div className={styles.center}>{children}</div>}
    </div>
  )
}

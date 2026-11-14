import type { CSSProperties, ReactNode } from 'react'
import styles from './PopEffect.module.css'
import { usePresence } from './usePresence'

export type PopEffectProps = {
  show?: boolean
  origin?: string
  scale?: number
  duration?: number
  exitDuration?: number
  onExited?: () => void
  appear?: boolean
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export function PopEffect({
  show = true,
  origin = 'center',
  scale = 0.9,
  duration = 260,
  exitDuration = 160,
  onExited,
  appear = true,
  children,
  className,
  style,
}: PopEffectProps) {
  const phase = usePresence(show, exitDuration, onExited, appear)
  if (phase === 'gone') return null
  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-phase={phase}
      style={
        {
          '--pe-scale': scale,
          '--pe-origin': origin,
          '--pe-duration': `${duration}ms`,
          '--pe-exit': `${exitDuration}ms`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

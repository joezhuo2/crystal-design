import type { CSSProperties, ReactNode } from 'react'
import styles from './OrbitEffect.module.css'

export type OrbitEffectProps = {
  color?: string
  speed?: number
  thickness?: number
  radius?: number
  trigger?: 'always' | 'hover'
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export function OrbitEffect({
  color = 'rgb(255 255 255 / 0.95)',
  speed = 4,
  thickness = 2,
  radius = 12,
  trigger = 'always',
  className,
  style,
  children,
}: OrbitEffectProps) {
  return (
    <span
      className={[styles.root, trigger === 'hover' && styles.hover, className].filter(Boolean).join(' ')}
      style={
        {
          '--cd-orbit-color': color,
          '--cd-orbit-speed': `${speed}s`,
          '--cd-orbit-thickness': `${thickness}px`,
          '--cd-orbit-radius': `${radius}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  )
}

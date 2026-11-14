import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import styles from './CollapseEffect.module.css'

export type CollapseEffectProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  open: boolean
  duration?: number
  as?: ElementType
  children?: ReactNode
}

export function CollapseEffect({ open, duration = 300, as: Tag = 'div', children, className, style, ...rest }: CollapseEffectProps) {
  return (
    <Tag
      {...rest}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ '--ce-duration': `${duration}ms`, ...style } as CSSProperties}
      data-open={open}
    >
      <div className={styles.inner} inert={!open} aria-hidden={!open}>
        {children}
      </div>
    </Tag>
  )
}

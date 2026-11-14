import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Tooltip.module.css'

export type TooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'content'> & {
  content: ReactNode
  side?: 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
}

export function Tooltip({ content, side = 'bottom', align = 'center', className, children, ...rest }: TooltipProps) {
  return (
    <span {...rest} className={[styles.root, className].filter(Boolean).join(' ')} data-side={side} data-align={align}>
      {children}
      <span role="tooltip" className={styles.bubble}>
        {content}
      </span>
    </span>
  )
}

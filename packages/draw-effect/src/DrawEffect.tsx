import { useLayoutEffect, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { SHAPES, drawDelay } from './draw'
import styles from './DrawEffect.module.css'

export type DrawEffectProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  show?: boolean
  duration?: number
  stagger?: number
  delay?: number
  mode?: 'stroke' | 'wipe'
  children: ReactNode
}

export function DrawEffect({
  show = true,
  duration = 400,
  stagger = 0,
  delay = 0,
  mode = 'stroke',
  className,
  style,
  children,
  ...rest
}: DrawEffectProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    ref.current?.querySelectorAll<SVGElement>(SHAPES).forEach((el, i) => {
      el.setAttribute('pathLength', '1')
      el.style.transitionDelay = mode === 'stroke' ? `${drawDelay(i, delay, stagger)}ms` : ''
    })
  }, [children, mode, delay, stagger])

  return (
    <span
      {...rest}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-mode={mode}
      data-show={show}
      style={{ '--draw-duration': `${duration}ms`, '--draw-delay': `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </span>
  )
}

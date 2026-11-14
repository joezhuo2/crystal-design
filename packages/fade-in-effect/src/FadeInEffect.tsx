import { useEffect, useRef, useState, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { usePresence } from '@crystal-design/pop-effect'
import styles from './FadeInEffect.module.css'
import { splitText, staggerDelay, type Split } from './split'

export type FadeInEffectProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  from?: 'none' | 'bottom' | 'top' | 'left' | 'right'
  distance?: number | string
  split?: Split
  stagger?: number
  duration?: number
  delay?: number
  trigger?: 'mount' | 'visible'
  show?: boolean
  onExited?: () => void
  as?: ElementType
  children?: ReactNode
}

const offset = (from: string, distance: string) => {
  if (from === 'bottom') return `translate(0, ${distance})`
  if (from === 'top') return `translate(0, calc(${distance} * -1))`
  if (from === 'left') return `translate(calc(${distance} * -1), 0)`
  if (from === 'right') return `translate(${distance}, 0)`
  return 'none'
}

export function FadeInEffect({
  from = 'bottom',
  distance = 16,
  split = 'none',
  stagger = 40,
  duration = 500,
  delay = 0,
  trigger = 'mount',
  show = true,
  onExited,
  as: Tag = 'div',
  children,
  className,
  style,
  ...rest
}: FadeInEffectProps) {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(trigger === 'mount')
  const phase = usePresence(show, duration, onExited, true)
  const gone = phase === 'gone'

  useEffect(() => {
    if (trigger === 'mount') {
      setSeen(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setSeen(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [trigger, gone])

  if (gone) return null

  const text = typeof children === 'string' || typeof children === 'number' ? String(children) : null
  const tokens = text !== null && split !== 'none' ? splitText(text, split) : null
  const state = phase === 'exit' ? 'exit' : seen ? 'enter' : 'wait'
  const vars = {
    '--fe-from': offset(from, typeof distance === 'number' ? `${distance}px` : distance),
    '--fe-duration': `${duration}ms`,
    '--fe-delay': `${delay}ms`,
    ...style,
  } as CSSProperties

  return (
    <Tag
      {...rest}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={vars}
      data-state={state}
      data-split={tokens ? 'true' : undefined}
      aria-label={tokens ? text! : rest['aria-label']}
    >
      {tokens
        ? tokens.map((token, i) =>
            token.space ? (
              token.text
            ) : (
              <span
                key={i}
                className={styles.token}
                aria-hidden
                style={{ '--fe-delay': `${staggerDelay(tokens, i, delay, stagger)}ms` } as CSSProperties}
              >
                {token.text}
              </span>
            ),
          )
        : children}
    </Tag>
  )
}

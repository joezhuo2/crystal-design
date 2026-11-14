import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { swapOffsets, type SwapDirection } from './swap'
import styles from './SwapEffect.module.css'

export type SwapEffectProps = {
  swapKey: string | number
  children: ReactNode
  duration?: number
  direction?: SwapDirection
  className?: string
  as?: ElementType
}

export function SwapEffect({ swapKey, children, duration = 300, direction = 'up', className, as: Tag = 'span' }: SwapEffectProps) {
  const [shown, setShown] = useState(swapKey)
  const [leaving, setLeaving] = useState<{ id: string | number; node: ReactNode } | null>(null)
  const last = useRef(children)
  const root = useRef<HTMLElement>(null)
  const inner = useRef<HTMLElement>(null)
  const width = useRef(0)

  if (shown !== swapKey) {
    setShown(swapKey)
    setLeaving({ id: shown, node: last.current })
  }
  last.current = children

  useLayoutEffect(() => {
    const el = root.current
    const next = inner.current?.offsetWidth ?? 0
    if (el && width.current && width.current !== next) {
      el.style.width = `${width.current}px`
      void el.offsetWidth
      el.style.width = `${next}px`
    }
    width.current = next
  }, [swapKey])

  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => {
      setLeaving(null)
      if (root.current) root.current.style.width = ''
    }, duration)
    return () => clearTimeout(timer)
  }, [leaving, duration])

  const { enter, leave } = swapOffsets(direction, 6)

  return (
    <Tag
      ref={root}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ '--swap-duration': `${duration}ms`, '--swap-in': `${enter}px`, '--swap-out': `${leave}px` } as CSSProperties}
    >
      {leaving && (
        <span key={leaving.id} className={styles.out} aria-hidden>
          {leaving.node}
        </span>
      )}
      <span key={swapKey} ref={inner} className={styles.in}>
        {children}
      </span>
    </Tag>
  )
}

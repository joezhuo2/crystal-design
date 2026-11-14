import { type ElementType, useEffect, useRef, useState } from 'react'
import { scrambleFrame } from './scramble'
import styles from './TextScramble.module.css'

export interface TextScrambleProps {
  text: string
  duration?: number
  speed?: number
  trigger?: 'mount' | 'hover' | 'change'
  as?: ElementType
  className?: string
}

const FRAME_MS = 45

export function TextScramble({ text, duration, speed = 40, trigger = 'change', as: Tag = 'span', className }: TextScrambleProps) {
  const [shown, setShown] = useState(text)
  const raf = useRef(0)
  const total = duration ?? speed * [...text].length

  const stop = () => cancelAnimationFrame(raf.current)

  const play = () => {
    stop()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || total <= 0) {
      setShown(text)
      return
    }
    const t0 = performance.now()
    let last = -Infinity
    const tick = (now: number) => {
      const t = now - t0
      if (t >= total) {
        setShown(text)
        return
      }
      if (t - last >= FRAME_MS) {
        last = t
        setShown(scrambleFrame(text, t / total, Math.floor(t / FRAME_MS)))
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (trigger === 'hover') {
      stop()
      setShown(text)
      return stop
    }
    play()
    return stop
  }, [trigger === 'mount' ? '' : text, total, trigger])

  return (
    <Tag className={[styles.root, className].filter(Boolean).join(' ')} onMouseEnter={trigger === 'hover' ? play : undefined}>
      <span className={styles.sr}>{text}</span>
      <span aria-hidden="true">{shown}</span>
    </Tag>
  )
}

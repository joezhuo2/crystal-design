import { useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './IntroLoader.module.css'
import { percentText, progressAt, randomHex, stageIndex } from './timing'

export type IntroLoaderProps = {
  stages?: string[]
  duration?: number
  exitDuration?: number
  onDone?: () => void
  show?: boolean
  fixed?: boolean
  className?: string
}

const defaultStages = ['mapping header', 'loading assets', 'allocating memory', 'warming up', 'ready']
const hexEvery = 60

export function IntroLoader({
  stages = defaultStages,
  duration = 2400,
  exitDuration = 600,
  onDone,
  show = true,
  fixed = false,
  className,
}: IntroLoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'gone'>('loading')
  const [stage, setStage] = useState(0)
  const fill = useRef<HTMLDivElement>(null)
  const percent = useRef<HTMLSpanElement>(null)
  const hex = useRef<HTMLDivElement>(null)
  const done = useRef(onDone)
  done.current = onDone
  const count = stages.length

  useEffect(() => {
    if (!show) {
      setPhase('gone')
      return
    }
    setPhase('loading')
    setStage(0)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const exitMs = reduced ? Math.min(exitDuration, 150) : exitDuration
    const start = performance.now()
    let lastHex = 0
    let raf = 0
    let timer = 0
    const exit = () => {
      setPhase('exiting')
      timer = window.setTimeout(() => {
        setPhase('gone')
        done.current?.()
      }, exitMs)
    }
    if (reduced) {
      setStage(count - 1)
      if (fill.current) fill.current.style.transform = 'scaleX(1)'
      if (percent.current) percent.current.textContent = percentText(1)
      timer = window.setTimeout(exit, Math.min(duration, 400))
      return () => clearTimeout(timer)
    }
    let shown = 0
    const tick = (now: number) => {
      const p = progressAt(now - start, duration)
      if (fill.current) fill.current.style.transform = `scaleX(${p})`
      if (percent.current) percent.current.textContent = percentText(p)
      const i = stageIndex(p, count)
      if (i !== shown) {
        shown = i
        setStage(i)
      }
      if (hex.current && now - lastHex > hexEvery) {
        hex.current.textContent = randomHex()
        lastHex = now
      }
      if (p < 1) raf = requestAnimationFrame(tick)
      else exit()
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [show, duration, exitDuration, count])

  if (phase === 'gone') return null
  return (
    <div
      role="status"
      aria-live="polite"
      className={[styles.root, fixed && styles.fixed, phase === 'exiting' && styles.exiting, className].filter(Boolean).join(' ')}
      style={{ '--il-exit': `${exitDuration}ms` } as CSSProperties}
    >
      <div className={styles.body}>
        <div className={styles.stage}>
          <span className={styles.caret} aria-hidden>
            &gt;
          </span>{' '}
          {stages[stage]}
        </div>
        <div ref={hex} className={styles.hex} aria-hidden>
          0x0000000000000000
        </div>
        <div className={styles.track} aria-hidden>
          <div ref={fill} className={styles.fill} />
        </div>
        <div className={styles.percent} aria-hidden>
          <span ref={percent}>000%</span>
        </div>
      </div>
    </div>
  )
}

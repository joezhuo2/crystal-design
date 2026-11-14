import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { pressScale } from './pressScale'
import styles from './ClickEffect.module.css'

export type ClickEffectName = 'none' | 'ring' | 'shake' | 'spin' | 'pop' | 'jelly'

export type ClickEffectProps = {
  effect?: ClickEffectName
  radius?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

const EFFECTS: Record<Exclude<ClickEffectName, 'none'>, [Keyframe[], number, string?]> = {
  ring: [[0, 16, -14, 10, -6, 3, 0].map((d) => ({ rotate: `${d}deg`, transformOrigin: '50% 12%' })), 600],
  shake: [[0, -3, 3, -2, 2, 0].map((x) => ({ translate: `${x}px 0`, rotate: `${x * 2}deg` })), 400],
  spin: [[{ rotate: '0deg' }, { rotate: '360deg' }], 560, 'cubic-bezier(0.4, 0, 0.2, 1)'],
  pop: [[{ scale: '1' }, { scale: '1.3', offset: 0.4 }, { scale: '0.92', offset: 0.7 }, { scale: '1' }], 380],
  jelly: [
    [
      { scale: '1 1' },
      { scale: '1.25 0.75', offset: 0.25 },
      { scale: '0.8 1.2', offset: 0.5 },
      { scale: '1.1 0.9', offset: 0.75 },
      { scale: '1 1' },
    ],
    500,
  ],
}

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function ClickEffect({ effect = 'pop', radius = 12, className, style, children }: ClickEffectProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const pressed = useRef<{ scale: number; anim: Animation } | null>(null)

  const release = () => {
    const el = ref.current
    const p = pressed.current
    pressed.current = null
    if (!el || !p) return
    p.anim.cancel()
    el.animate([{ scale: String(p.scale) }, { scale: '1' }], { duration: 320, easing: SPRING })
  }

  useEffect(() => {
    window.addEventListener('pointerup', release, true)
    window.addEventListener('pointercancel', release, true)
    return () => {
      window.removeEventListener('pointerup', release, true)
      window.removeEventListener('pointercancel', release, true)
    }
  }, [])

  return (
    <span
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={{ borderRadius: radius, ...style }}
      onPointerDown={(e) => {
        const el = ref.current
        if (e.button !== 0 || !el || reduced()) return
        release()
        const scale = pressScale(el.offsetWidth, el.offsetHeight)
        const anim = el.animate([{ scale: '1' }, { scale: String(scale) }], { duration: 90, easing: 'ease-out', fill: 'forwards' })
        pressed.current = { scale, anim }
      }}
      onClick={() => {
        const el = ref.current
        if (!el || effect === 'none' || reduced()) return
        const [keyframes, duration, easing = 'ease-out'] = EFFECTS[effect]
        const target = effect === 'ring' || effect === 'spin' ? (el.querySelector('svg') ?? el) : el
        requestAnimationFrame(() => target.animate(keyframes, { duration, easing }))
      }}
    >
      {children}
    </span>
  )
}

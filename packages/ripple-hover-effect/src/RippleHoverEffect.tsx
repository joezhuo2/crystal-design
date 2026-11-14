import { useEffect, useRef, type ElementType } from 'react'
import { atRest, falloff, stepSpring, waveAt, type Spring } from './ripple'
import styles from './RippleHoverEffect.module.css'

export type RippleHoverEffectProps = {
  text?: string
  children?: string
  radius?: number
  lift?: number
  scale?: number
  wave?: boolean
  speed?: number
  as?: ElementType
  className?: string
}

export function RippleHoverEffect({
  text,
  children,
  radius = 90,
  lift = 14,
  scale = 1.25,
  wave = true,
  speed = 700,
  as: Tag = 'span',
  className,
}: RippleHoverEffectProps) {
  const content = text ?? children ?? ''
  const root = useRef<HTMLElement>(null)
  const live = useRef({ radius, lift, scale, wave, speed })
  live.current = { radius, lift, scale, wave, speed }

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const chars = Array.from(el.querySelectorAll<HTMLElement>('[data-c]'))
    const springs: Spring[] = chars.map(() => ({ x: 0, v: 0 }))
    const centers = chars.map(() => ({ x: 0, y: 0 }))
    const pointer = { x: 0, y: 0, inside: false }
    let ripple: { x: number; y: number; start: number; reach: number } | null = null
    let raf = 0
    let last = 0

    const measure = () => {
      chars.forEach((c, i) => {
        centers[i].x = c.offsetLeft + c.offsetWidth / 2
        centers[i].y = c.offsetTop + c.offsetHeight / 2
      })
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const p = live.current
      const front = ripple ? ((now - ripple.start) / 1000) * p.speed : 0
      if (ripple && front > ripple.reach) ripple = null
      let busy = pointer.inside || !!ripple
      chars.forEach((c, i) => {
        const { x, y } = centers[i]
        let target = pointer.inside ? falloff(Math.hypot(x - pointer.x, y - pointer.y), p.radius) : 0
        if (ripple) target = Math.min(1.5, target + 0.9 * waveAt(Math.hypot(x - ripple.x, y - ripple.y), front, p.radius * 0.6))
        const s = springs[i]
        stepSpring(s, target, dt)
        if (!atRest(s, target)) busy = true
        c.style.transform = atRest(s, 0) ? '' : `translateY(${-p.lift * s.x}px) scale(${1 + (p.scale - 1) * s.x})`
      })
      raf = busy ? requestAnimationFrame(tick) : 0
    }

    const run = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const locate = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    }

    const startWave = () => {
      if (!live.current.wave) return
      const reach = Math.max(...centers.map((c) => Math.hypot(c.x - pointer.x, c.y - pointer.y))) + live.current.radius
      ripple = { x: pointer.x, y: pointer.y, start: performance.now(), reach }
    }

    const onEnter = (e: PointerEvent) => {
      measure()
      locate(e)
      if (e.pointerType === 'touch') return
      pointer.inside = true
      startWave()
      run()
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      locate(e)
      pointer.inside = true
      run()
    }
    const onLeave = () => {
      pointer.inside = false
      run()
    }
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      measure()
      locate(e)
      startWave()
      run()
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onDown)
    return () => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
      cancelAnimationFrame(raf)
      chars.forEach((c) => (c.style.transform = ''))
    }
  }, [content])

  const words = content.split(/\s+/).filter(Boolean)

  return (
    <Tag ref={root} className={[styles.root, className].filter(Boolean).join(' ')} aria-label={content}>
      {words.map((w, wi) => (
        <span key={wi}>
          {wi > 0 && ' '}
          <span className={styles.word} aria-hidden="true">
            {Array.from(w).map((ch, ci) => (
              <span key={ci} data-c="" className={styles.char} aria-hidden="true">
                {ch}
              </span>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  )
}

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react'
import styles from './Stardust.module.css'

export type StardustProps = Omit<ComponentPropsWithoutRef<'div'>, 'color'> & {
  color?: string
  size?: number
  density?: number
  lifetime?: number
}

type Mote = { x: number; y: number; vx: number; vy: number; age: number; size: number; phase: number }

export function Stardust({
  color = '#bef4ff',
  size = 1.4,
  density = 2,
  lifetime = 1,
  className,
  children,
  ...rest
}: StardustProps) {
  const host = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const fixed = children == null

  useEffect(() => {
    const cv = canvas.current
    if (
      !cv ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    )
      return
    const ctx = cv.getContext('2d')!
    const area: HTMLElement | Window = fixed ? window : host.current!
    const motes: Mote[] = []
    let frame = 0
    let last = 0
    let w = 0
    let h = 0
    let ox = 0
    let oy = 0

    const fit = () => {
      const dpr = window.devicePixelRatio || 1
      w = fixed ? window.innerWidth : cv.clientWidth
      h = fixed ? window.innerHeight : cv.clientHeight
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(fixed ? document.documentElement : cv)

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = color
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i]
        m.age += dt / lifetime
        if (m.age >= 1) {
          motes.splice(i, 1)
          continue
        }
        m.x += m.vx * dt
        m.y += m.vy * dt
        ctx.globalAlpha = (1 - m.age) * (0.65 + 0.35 * Math.sin(m.phase + m.age * 18))
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2)
        ctx.fill()
      }
      if (motes.length) frame = requestAnimationFrame(draw)
      else {
        frame = 0
        ctx.clearRect(0, 0, w, h)
      }
    }

    const move = (event: Event) => {
      const e = event as PointerEvent
      if (e.pointerType !== 'mouse') return
      if (!fixed) {
        const box = cv.getBoundingClientRect()
        ox = box.left
        oy = box.top
      }
      for (let i = 0; i < density && motes.length < 160; i++) {
        motes.push({
          x: e.clientX - ox + (Math.random() - 0.5) * 8,
          y: e.clientY - oy + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 34,
          vy: (Math.random() - 0.5) * 34 + 12,
          age: 0,
          size: size * (0.3 + Math.random() * 0.9),
          phase: Math.random() * 6.28,
        })
      }
      if (!frame) {
        last = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }

    area.addEventListener('pointermove', move)
    return () => {
      area.removeEventListener('pointermove', move)
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [fixed, color, size, density, lifetime])

  const layer = (
    <canvas
      ref={canvas}
      className={[styles.canvas, fixed ? styles.fixed : styles.fill].join(' ')}
      aria-hidden="true"
    />
  )

  if (fixed) return layer
  return (
    <div ref={host} className={[styles.host, className].filter(Boolean).join(' ')} {...rest}>
      {children}
      {layer}
    </div>
  )
}

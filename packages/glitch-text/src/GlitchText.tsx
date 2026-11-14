import { type ReactNode, useEffect, useId, useRef } from 'react'
import { displacement, envelope, frameOf, slice } from './glitch'
import styles from './GlitchText.module.css'

export interface GlitchTextProps {
  show?: boolean
  onExited?: () => void
  duration?: number
  intensity?: number
  children?: ReactNode
  className?: string
}

export function GlitchText({ show = true, onExited, duration = 450, intensity = 1, children, className }: GlitchTextProps) {
  const id = `gt${useId().replace(/:/g, '')}`
  const root = useRef<HTMLSpanElement>(null)
  const main = useRef<HTMLSpanElement>(null)
  const red = useRef<HTMLSpanElement>(null)
  const cyan = useRef<HTMLSpanElement>(null)
  const turb = useRef<SVGFETurbulenceElement>(null)
  const disp = useRef<SVGFEDisplacementMapElement>(null)
  const exited = useRef(onExited)
  exited.current = onExited
  const first = useRef(true)

  useEffect(() => {
    const el = main.current
    const rootEl = root.current
    const a = red.current
    const b = cyan.current
    if (!el || !rootEl || !a || !b) return
    const wasFirst = first.current
    first.current = false
    const clear = () => {
      el.style.filter = el.style.transform = ''
      a.style.opacity = b.style.opacity = '0'
    }
    const finish = () => {
      clear()
      el.style.opacity = show ? '1' : '0'
      rootEl.classList.toggle(styles.hidden, !show)
      if (!show) exited.current?.()
    }

    if (!show && wasFirst) {
      finish()
      return
    }
    rootEl.classList.remove(styles.hidden)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rootEl.style.setProperty('--gt-fade', `${duration}ms`)
      el.style.opacity = show ? '0' : '1'
      void el.offsetWidth
      el.classList.add(styles.fade)
      el.style.opacity = show ? '1' : '0'
      const timer = setTimeout(() => {
        el.classList.remove(styles.fade)
        finish()
      }, duration)
      return () => {
        clearTimeout(timer)
        el.classList.remove(styles.fade)
      }
    }

    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const ms = now - t0
      const { progress, glitch } = envelope(ms, duration, show)
      if (progress >= 1) {
        finish()
        return
      }
      const seed = frameOf(ms)
      const s1 = slice(seed, 1, glitch, intensity)
      const s2 = slice(seed, 2, glitch, intensity)
      turb.current?.setAttribute('seed', String(seed))
      disp.current?.setAttribute('scale', String(displacement(seed, glitch, intensity)))
      el.style.filter = `url(#${id})`
      el.style.transform = `translateX(${s1.dx / 3}px)`
      el.style.opacity = String(show ? Math.min(1, progress * 1.6) : 1 - progress * progress)
      a.style.opacity = b.style.opacity = '0.85'
      a.style.clipPath = `inset(${s1.top}% 0 ${s1.bottom}% 0)`
      a.style.transform = `translateX(${s1.dx}px)`
      b.style.clipPath = `inset(${s2.top}% 0 ${s2.bottom}% 0)`
      b.style.transform = `translateX(${-s2.dx}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clear()
    }
  }, [show, duration, intensity, id])

  return (
    <span ref={root} className={[styles.root, className].filter(Boolean).join(' ')}>
      <svg aria-hidden="true" className={styles.svg}>
        <filter id={id} x="-5%" y="0%" width="110%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.00001 0.03" numOctaves={1} seed={0} />
          <feComponentTransfer result="bands">
            <feFuncR type="discrete" tableValues="0.5 0.5 0 0.5 1 0.5 0.5 0.8 0.5 0.2 0.5" />
            <feFuncG type="table" tableValues="0.5 0.5" />
            <feFuncA type="table" tableValues="1 1" />
          </feComponentTransfer>
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="bands" scale={0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <span ref={main} style={show ? undefined : { opacity: 0 }}>
        {children}
      </span>
      <span ref={red} className={`${styles.copy} ${styles.red}`} aria-hidden="true">
        {children}
      </span>
      <span ref={cyan} className={`${styles.copy} ${styles.cyan}`} aria-hidden="true">
        {children}
      </span>
    </span>
  )
}

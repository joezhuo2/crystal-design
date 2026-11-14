import { Children, useEffect, useRef, type HTMLAttributes } from 'react'
import styles from './FocusEffect.module.css'
import { createSpring, falloff, isMoving, springDamping, stepSpring, type Spring } from './spring'

export type FocusEffectProps = HTMLAttributes<HTMLDivElement> & {
  active: number | null
  swell?: number
  shrink?: number
  barge?: number
  jelly?: number
  bounce?: number
  stagger?: number
  stiffness?: number
  gap?: number
  instant?: boolean
}

const MASS = 0.9

type Motion = Required<Pick<FocusEffectProps, 'swell' | 'shrink' | 'barge' | 'jelly' | 'bounce' | 'stagger' | 'stiffness'>> & {
  active: number | null
  instant: boolean
}

export function FocusEffect({
  active,
  swell = 0.2,
  shrink = 0.05,
  barge = 6,
  jelly = 1,
  bounce = 0.25,
  stagger = 22,
  stiffness = 580,
  gap = 8,
  instant = false,
  className,
  style,
  children,
  ...rest
}: FocusEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const motion = useRef<Motion>(null)
  const springs = useRef<Spring[][]>([])
  const previous = useRef<number | null>(null)
  const frame = useRef(0)
  const last = useRef(0)
  const count = Children.count(children)

  const items = () => Array.from(ref.current?.children ?? []) as HTMLElement[]

  const write = () => {
    items().forEach((el, i) => {
      const [x, sx, sy] = springs.current[i]?.map((s) => s.value) ?? [0, 1, 1]
      el.style.translate = x ? `${x}px` : ''
      el.style.scale = sx === 1 && sy === 1 ? '' : `${sx} ${sy}`
    })
  }

  const tick = (now: number) => {
    const ms = Math.min(now - last.current, 64)
    last.current = now
    let moving = false
    for (const set of springs.current) for (const s of set) moving = stepSpring(s, ms) || moving
    write()
    frame.current = moving ? requestAnimationFrame(tick) : 0
  }

  const retarget = (staggered: boolean, snap: boolean) => {
    const m = motion.current
    const els = items()
    if (!m || !els.length) return
    const a = m.active != null && m.active >= 0 && m.active < els.length ? m.active : null
    const origin = a ?? previous.current ?? 0
    const push = a == null ? 0 : (els[a].offsetWidth * m.swell) / 2 + m.barge
    const jump = snap || matchMedia('(prefers-reduced-motion: reduce)').matches
    springs.current = els.map((el, i) => {
      const set = springs.current[i] ?? [createSpring(0), createSpring(1), createSpring(1)]
      const distance = Math.abs(i - origin)
      const k = falloff(m.stiffness, distance)
      const wait = staggered ? distance * m.stagger : 0
      const targets =
        a == null ? [0, 1, 1] : i === a ? [0, 1 + m.swell, 1 + m.swell] : [Math.sign(i - a) * push, 1 - m.shrink, 1 - m.shrink]
      const stiffnesses = [k, k * (1 + 0.24 * m.jelly), k * (1 - 0.14 * m.jelly)]
      const delays = [wait, wait, wait + 50 * m.jelly]
      set.forEach((s, j) => {
        if (!isMoving(s) && s.target !== targets[j]) s.delay = delays[j]
        s.target = targets[j]
        s.stiffness = stiffnesses[j]
        s.mass = MASS
        s.damping = springDamping(stiffnesses[j], MASS, m.bounce)
        if (jump) Object.assign(s, { value: s.target, velocity: 0, delay: 0 })
      })
      el.style.zIndex = i === a ? '1' : ''
      return set
    })
    previous.current = a
    write()
    if (!jump && !frame.current) {
      last.current = performance.now()
      frame.current = requestAnimationFrame(tick)
    }
  }

  useEffect(() => {
    const first = !motion.current
    motion.current = { active, swell, shrink, barge, jelly, bounce, stagger, stiffness, instant }
    const keyboard = !!ref.current?.querySelector(':focus-visible')
    retarget(!instant && !keyboard, first)
  }, [active, swell, shrink, barge, jelly, bounce, stagger, stiffness, instant])

  useEffect(() => {
    const observer = new ResizeObserver(() => retarget(false, false))
    items().forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [count])

  useEffect(
    () => () => {
      cancelAnimationFrame(frame.current)
      frame.current = 0
    },
    [],
  )

  return (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(' ')} style={{ gap, ...style }} {...rest}>
      {children}
    </div>
  )
}

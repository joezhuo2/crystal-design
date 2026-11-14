import { useEffect, useRef, useState, type CSSProperties, type InputHTMLAttributes } from 'react'

type RangeProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'min' | 'max' | 'type'> & {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function Range({ min, max, value, onChange, ...rest }: RangeProps) {
  const [shown, setShown] = useState<number | null>(null)
  const tween = useRef(0)
  const jump = useRef(false)
  const pos = useRef<number | null>(null)
  const down = useRef(false)
  const press = (pressed: boolean) => {
    down.current = pressed
    jump.current = pressed
  }

  useEffect(() => () => cancelAnimationFrame(tween.current), [])

  const change = (target: number) => {
    // releasing mid-chase fires a change event carrying our own in-between value; ignore that echo
    if (pos.current !== null && !down.current) return
    cancelAnimationFrame(tween.current)
    if (!jump.current || calm()) {
      pos.current = null
      setShown(null)
      return onChange(Math.round(target))
    }
    jump.current = false
    const from = pos.current ?? value
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 350)
      const current = Math.round((from + (target - from) * (1 - (1 - t) ** 3)) * 100) / 100
      onChange(Math.round(current))
      pos.current = t < 1 ? current : null
      setShown(pos.current)
      if (t < 1) tween.current = requestAnimationFrame(step)
    }
    tween.current = requestAnimationFrame(step)
  }

  const position = shown ?? value
  return (
    <input
      {...rest}
      type="range"
      min={min}
      max={max}
      step={shown === null ? 1 : 'any'}
      value={position}
      style={{ '--p': `${((position - min) / (max - min)) * 100}%` } as CSSProperties}
      onPointerDown={() => press(true)}
      onPointerUp={() => press(false)}
      onPointerCancel={() => press(false)}
      onChange={(event) => change(Number(event.target.value))}
    />
  )
}

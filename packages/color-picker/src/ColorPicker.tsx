import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
} from 'react'
import { hexToHsv, hsvToHex, isHex, type Hsv } from './color'
import { Range } from './Range'
import styles from './ColorPicker.module.css'

export type ColorPickerProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  label: string
  value: string
  onChange: (value: string) => void
  presets?: string[]
}

const defaultPresets = ['#ffffff', '#000000', '#a8e0ff', '#6c4dff', '#ff7ab6', '#ffb340', '#34c759', '#ff453a']

const clamp = (n: number) => Math.max(0, Math.min(1, n))

export function ColorPicker({ label, value, onChange, presets = defaultPresets, className, ...rest }: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(value))
  const [draft, setDraft] = useState(value)
  const root = useRef<HTMLDivElement>(null)
  const swatch = useRef<HTMLButtonElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const outside = (event: Event) => root.current?.contains(event.target as Node) || setOpen(false)
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      swatch.current?.focus()
    }
    addEventListener('pointerdown', outside)
    addEventListener('keydown', escape)
    return () => {
      removeEventListener('pointerdown', outside)
      removeEventListener('keydown', escape)
    }
  }, [open])

  const apply = (next: Hsv) => {
    setHsv(next)
    const hex = hsvToHex(next)
    setDraft(hex)
    onChange(hex)
  }

  const toggle = () => {
    if (!open) {
      setHsv(hexToHsv(value))
      setDraft(value)
    }
    setOpen(!open)
  }

  const pick = (event: PointerEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const box = event.currentTarget.getBoundingClientRect()
    apply({ ...hsv, s: clamp((event.clientX - box.left) / box.width), v: 1 - clamp((event.clientY - box.top) / box.height) })
  }

  const nudge = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowLeft: [-0.02, 0], ArrowRight: [0.02, 0], ArrowUp: [0, 0.02], ArrowDown: [0, -0.02] }[event.key]
    if (!step) return
    event.preventDefault()
    apply({ ...hsv, s: clamp(hsv.s + step[0]), v: clamp(hsv.v + step[1]) })
  }

  return (
    <div {...rest} className={[styles.root, className].filter(Boolean).join(' ')} ref={root}>
      <span id={id}>{label}</span>
      <button
        type="button"
        ref={swatch}
        className={styles.swatch}
        aria-labelledby={id}
        aria-expanded={open}
        style={{ background: value }}
        onClick={toggle}
      />
      <div className={styles.picker} data-open={open} role="dialog" aria-labelledby={id} inert={!open}>
        <div
          className={styles.sv}
          tabIndex={0}
          role="slider"
          aria-label="Saturation and brightness"
          aria-valuetext={`Saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`}
          style={{ '--hue': hsv.h } as CSSProperties}
          onPointerDown={pick}
          onPointerMove={pick}
          onKeyDown={nudge}
        >
          <i style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: value }} />
        </div>
        <Range className={styles.hue} min={0} max={359} aria-label="Hue" value={Math.round(hsv.h)} onChange={(h) => apply({ ...hsv, h })} />
        <div className={styles.presets}>
          {presets.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              aria-pressed={color === value}
              style={{ background: color }}
              onClick={() => apply(hexToHsv(color))}
            />
          ))}
        </div>
        <input
          className={styles.hex}
          type="text"
          aria-label="Hex color"
          spellCheck={false}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value)
            if (isHex(event.target.value)) apply(hexToHsv(event.target.value.toLowerCase()))
          }}
        />
      </div>
    </div>
  )
}

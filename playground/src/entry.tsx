import type { ReactNode } from 'react'

export type Values = Record<string, string | number | boolean>

export type Control =
  | { key: string; label: string; type: 'range'; min: number; max: number; value: number }
  | { key: string; label: string; type: 'text'; value: string }
  | { key: string; label: string; type: 'color'; value: string }
  | { key: string; label: string; type: 'toggle'; value: boolean }
  | { key: string; label: string; type: 'select'; options: string[]; value: string }

export type Entry = {
  id: string
  name: string
  pkg: string
  category: string
  description: string
  glass?: boolean
  controls: Control[]
  render: (values: Values) => ReactNode
  code: (values: Values) => string
}

const GLASS_KEYS = ['radius', 'strength', 'bezel']

export const glassControls = (radius: number, maxRadius: number): Control[] => [
  { key: 'radius', label: 'Radius', type: 'range', min: 0, max: maxRadius, value: radius },
  { key: 'strength', label: 'Refraction', type: 'range', min: 0, max: 120, value: 30 },
  { key: 'bezel', label: 'Bezel', type: 'range', min: 4, max: 40, value: 20 },
]

export const glassProps = (v: Values) => ({
  radius: v.radius as number,
  strength: v.strength as number,
  bezel: v.bezel as number,
})

export const glassAttrs = (entry: Entry, v: Values) =>
  entry.controls
    .filter((control) => GLASS_KEYS.includes(control.key) && v[control.key] !== control.value)
    .map((control) => ` ${control.key}={${v[control.key]}}`)
    .join('')

export const changed = (entry: Entry, v: Values, key: string) =>
  v[key] !== entry.controls.find((control) => control.key === key)?.value

export const styleAttr = (style: Record<string, string | number | false>) => {
  const pairs = Object.entries(style)
    .filter(([, value]) => value !== false)
    .map(([key, value]) => `${key}: ${typeof value === 'number' ? value : `'${value}'`}`)
  return pairs.length ? ` style={{ ${pairs.join(', ')} }}` : ''
}

export const lookControls: Control[] = [
  { key: 'tint', label: 'Tint', type: 'color', value: '#ffffff' },
  { key: 'tintAlpha', label: 'Tint opacity', type: 'range', min: 0, max: 60, value: 8 },
  { key: 'frost', label: 'Frost', type: 'range', min: 0, max: 40, value: 14 },
  { key: 'blur', label: 'Refraction blur', type: 'range', min: 0, max: 12, value: 2 },
  { key: 'text', label: 'Text color', type: 'color', value: '#ffffff' },
  { key: 'shadow', label: 'Shadow', type: 'range', min: 0, max: 60, value: 22 },
]

const lookDefaults: Values = Object.fromEntries(lookControls.map((control) => [control.key, control.value]))
const differs = (v: Values, ...keys: string[]) => keys.some((key) => v[key] !== lookDefaults[key])

export const lookVars = (v: Values) => {
  const rgb = [1, 3, 5].map((i) => parseInt((v.tint as string).slice(i, i + 2), 16)).join(' ')
  const vars = {
    '--cg-tint': differs(v, 'tint', 'tintAlpha') && `rgb(${rgb} / ${(v.tintAlpha as number) / 100})`,
    '--cg-frost': differs(v, 'frost') && `${v.frost}px`,
    '--cg-blur': differs(v, 'blur') && `${v.blur}px`,
    '--cg-text': differs(v, 'text') && (v.text as string),
    '--cg-shadow': differs(v, 'shadow') && `0 10px 36px rgb(0 0 0 / ${(v.shadow as number) / 100})`,
  }
  return Object.fromEntries(Object.entries(vars).filter(([, value]) => value)) as Record<string, string>
}

export const glyphs = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  star: 'M12 3l2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.3l-5.6 3 1.2-6.3L3 9.6l6.3-.8z',
}

export function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

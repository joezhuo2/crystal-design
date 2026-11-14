import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'
import { hexToHsv, hsvToHex, isHex, type Hsv } from './color'
import { catalog, defaultsOf, lookControls, lookVars, type Control, type Entry, type Values } from './catalog'

const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches

const subscribe = (notify: () => void) => {
  const change = () => {
    if (!document.startViewTransition || calm()) return notify()
    document.startViewTransition(() => {
      flushSync(notify)
      scrollTo(0, 0)
    })
  }
  addEventListener('hashchange', change)
  return () => removeEventListener('hashchange', change)
}

const icons = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  back: 'M19 12H5M12 19l-7-7 7-7',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  check: 'M5 12l5 5L20 7',
}

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

export function App() {
  const hash = useSyncExternalStore(subscribe, () => location.hash)
  const entry = catalog.find((item) => `#/${item.id}` === hash)

  return (
    <div className="page">
      <header className="header">
        <a href="#/" className="brand">
          Crystal Design
        </a>
        <div className="actions">
          <ThemeToggle />
          <a
            className="btn icon-btn"
            href="https://github.com/joezhuo2/crystal-design"
            aria-label="GitHub"
            data-tip="View source on GitHub"
          >
            <GitHubMark />
          </a>
        </div>
      </header>
      {entry ? <Detail key={entry.id} entry={entry} /> : <List />}
    </div>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? 'dark')
  const next = theme === 'dark' ? 'light' : 'dark'
  const toggle = () => {
    document.documentElement.dataset.theme = next
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  return (
    <button type="button" className="btn icon-btn" aria-label={`Switch to ${next} mode`} data-tip={`Switch to ${next} mode`} onClick={toggle}>
      <span key={theme} className="spin">
        <Svg d={theme === 'dark' ? icons.sun : icons.moon} />
      </span>
    </button>
  )
}

function List() {
  const [query, setQuery] = useState('')

  const needle = query.trim().toLowerCase()
  const items = catalog.filter((entry) =>
    `${entry.name} ${entry.category} ${entry.description}`.toLowerCase().includes(needle),
  )

  return (
    <main>
      <h1>Components</h1>
      <label className="search">
        <Svg d={icons.search} />
        <input
          type="search"
          placeholder="Search components"
          aria-label="Search components"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {items.length ? (
        <ul className="grid">
          {items.map((entry, index) => (
            <li key={entry.id} style={{ '--i': index } as CSSProperties}>
              <div className="thumb" inert>
                <div className="thumb-stage">{entry.render(defaultsOf(entry))}</div>
              </div>
              <h2>
                <a href={`#/${entry.id}`}>{entry.name}</a>
              </h2>
              <p>{entry.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p role="status">No components match.</p>
      )}
    </main>
  )
}

type Backdrop = { kind: string; text: string; color: string; image: string }

const initialBackdrop: Backdrop = { kind: 'text', text: 'Glass', color: '', image: '' }

function Detail({ entry }: { entry: Entry }) {
  const [values, setValues] = useState<Values>(() => defaultsOf(entry))
  const [view, setView] = useState<'preview' | 'code'>('preview')
  const [backdrop, setBackdrop] = useState<Backdrop>(initialBackdrop)
  const [resetState, setResetState] = useState<'idle' | 'busy' | 'done'>('idle')
  const set = (key: string, value: Values[string]) => setValues((current) => ({ ...current, [key]: value }))
  const setBack = (patch: Partial<Backdrop>) => setBackdrop((current) => ({ ...current, ...patch }))

  const reset = () => {
    setResetState('busy')
    setTimeout(() => {
      if (backdrop.image) URL.revokeObjectURL(backdrop.image)
      setValues(defaultsOf(entry))
      setBackdrop(initialBackdrop)
      setResetState('done')
    }, 600)
    setTimeout(() => setResetState('idle'), 2200)
  }

  const pickImage = (file?: File) => {
    if (!file) return
    if (backdrop.image) URL.revokeObjectURL(backdrop.image)
    setBack({ kind: 'image', image: URL.createObjectURL(file) })
  }

  const vars = lookVars(values)
  const css = Object.keys(vars).length
    ? `:root {\n${Object.entries(vars)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join('\n')}\n}`
    : ''

  const install = `npm install ${entry.pkg}`
  const usage = entry.code(values)
  const prompt = `Add the Crystal Design ${entry.name} component to my React project.

1. Install it: ${install}
2. Use it like this, adapting the content to my app:

${usage}
${css ? `\n3. Add these CSS variables to tune the glass look:\n\n${css}\n` : ''}
It is a liquid glass surface that refracts whatever is behind it, so place it over an image, gradient or other visual content. The radius, strength and bezel props tune the shape and the amount of refraction. Chromium browsers refract; other browsers fall back to frosted blur.`

  return (
    <main>
      <a href="#/" className="btn">
        <Svg d={icons.back} />
        All components
      </a>
      <h1>{entry.name}</h1>
      <p>{entry.description}</p>

      <p className="hint">Drag the component around the preview.</p>

      <div className="toggle" data-view={view} role="group" aria-label="View">
        <button type="button" aria-pressed={view === 'preview'} onClick={() => setView('preview')}>
          Preview
        </button>
        <button type="button" aria-pressed={view === 'code'} onClick={() => setView('code')}>
          Code
        </button>
      </div>

      <div className="detail">
        {view === 'preview' ? (
          <div className="preview">
            <div
              className="backdrop"
              data-kind={backdrop.kind}
              style={
                {
                  ...(backdrop.color && { '--backdrop': backdrop.color }),
                  ...(backdrop.kind === 'image' && backdrop.image && { backgroundImage: `url(${backdrop.image})` }),
                } as CSSProperties
              }
            >
              {backdrop.kind === 'text' && backdrop.text}
            </div>
            <Draggable style={vars as CSSProperties}>{entry.render(values)}</Draggable>
          </div>
        ) : (
          <div className="code">
            <Snippet label="Install" text={install} />
            <Snippet label="Usage" text={usage} />
            {css && <Snippet label="CSS" text={css} />}
          </div>
        )}

        <form className="controls" onSubmit={(event) => event.preventDefault()}>
          <div className="group">
            <h2>Component</h2>
            {entry.controls.map((control) => (
              <Field key={control.key} control={control} value={values[control.key]} onChange={(value) => set(control.key, value)} />
            ))}
          </div>

          <div className="group">
            <h2>Glass</h2>
            {lookControls.map((control) => (
              <Field key={control.key} control={control} value={values[control.key]} onChange={(value) => set(control.key, value)} />
            ))}
          </div>

          <div className="group">
            <h2>Preview</h2>
            <label className="field">
              <span>Backdrop</span>
              <select value={backdrop.kind} onChange={(event) => setBack({ kind: event.target.value })}>
                <option value="text">Text</option>
                <option value="gradient">Gradient</option>
                <option value="image">Image</option>
                <option value="none">None</option>
              </select>
            </label>
            {backdrop.kind === 'text' && (
              <label className="field">
                <span>Backdrop text</span>
                <input type="text" value={backdrop.text} onChange={(event) => setBack({ text: event.target.value })} />
              </label>
            )}
            {backdrop.kind === 'image' ? (
              <label className="field">
                <span>Image</span>
                <input type="file" accept="image/*" onChange={(event) => pickImage(event.target.files?.[0])} />
              </label>
            ) : (
              backdrop.kind !== 'none' && (
                <ColorPicker label="Backdrop color" value={backdrop.color || '#808080'} onChange={(color) => setBack({ color })} />
              )
            )}
          </div>

          <div className="controls-footer">
            <button type="button" className="btn" data-state={resetState} disabled={resetState === 'busy'} onClick={reset}>
              <span key={resetState} className="swap" aria-live="polite">
                {resetState === 'busy' ? 'Resetting…' : resetState === 'done' ? '✓ Settings reset' : 'Reset settings'}
              </span>
            </button>
          </div>
        </form>
      </div>

      <section className="prompt">
        <h2>AI prompt</h2>
        <p>Paste this into your AI assistant to add the component with the settings above.</p>
        <Snippet label="Prompt" text={prompt} />
      </section>
    </main>
  )
}

function Field({ control, value, onChange }: { control: Control; value: Values[string]; onChange: (value: Values[string]) => void }) {
  if (control.type === 'color') return <ColorPicker label={control.label} value={value as string} onChange={onChange} />

  return (
    <label className="field" data-type={control.type}>
      <span>
        {control.label}
        {control.type === 'range' && <output>{value}</output>}
      </span>
      {control.type === 'range' ? (
        <Range min={control.min} max={control.max} value={value as number} onChange={onChange} />
      ) : control.type === 'toggle' ? (
        <input type="checkbox" checked={value as boolean} onChange={(event) => onChange(event.target.checked)} />
      ) : (
        <input type={control.type} value={value as string} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  )
}

type RangeProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'min' | 'max' | 'type'> & {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
}

function Range({ min, max, value, onChange, ...rest }: RangeProps) {
  const [shown, setShown] = useState<number | null>(null)
  const tween = useRef(0)
  const jump = useRef(false)

  useEffect(() => () => cancelAnimationFrame(tween.current), [])

  const change = (target: number) => {
    cancelAnimationFrame(tween.current)
    if (!jump.current || calm()) {
      setShown(null)
      return onChange(Math.round(target))
    }
    jump.current = false
    const from = shown ?? value
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 350)
      const current = from + (target - from) * (1 - (1 - t) ** 3)
      onChange(Math.round(current))
      if (t < 1) {
        setShown(current)
        tween.current = requestAnimationFrame(step)
      } else {
        setShown(null)
      }
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
      onPointerDown={() => (jump.current = true)}
      onPointerUp={() => (jump.current = false)}
      onChange={(event) => change(Number(event.target.value))}
    />
  )
}

const presets = ['#ffffff', '#000000', '#a8e0ff', '#6c4dff', '#ff7ab6', '#ffb340', '#34c759', '#ff453a']

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false)
  const [hsv, setHsv] = useState<Hsv>(() => hexToHsv(value))
  const [draft, setDraft] = useState(value)
  const root = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const outside = (event: Event) => root.current?.contains(event.target as Node) || setOpen(false)
    const escape = (event: globalThis.KeyboardEvent) => event.key === 'Escape' && setOpen(false)
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
    const clamp = (n: number) => Math.max(0, Math.min(1, n))
    apply({ ...hsv, s: clamp((event.clientX - box.left) / box.width), v: 1 - clamp((event.clientY - box.top) / box.height) })
  }

  const nudge = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowLeft: [-0.02, 0], ArrowRight: [0.02, 0], ArrowUp: [0, 0.02], ArrowDown: [0, -0.02] }[event.key]
    if (!step) return
    event.preventDefault()
    const clamp = (n: number) => Math.max(0, Math.min(1, n))
    apply({ ...hsv, s: clamp(hsv.s + step[0]), v: clamp(hsv.v + step[1]) })
  }

  return (
    <div className="field color-field" data-type="color" ref={root}>
      <span id={id}>{label}</span>
      <button
        type="button"
        className="swatch"
        aria-labelledby={id}
        aria-expanded={open}
        style={{ background: value }}
        onClick={toggle}
      />
      <div className="picker" data-open={open} role="dialog" aria-labelledby={id}>
        <div
          className="sv"
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
        <Range className="hue" min={0} max={359} aria-label="Hue" value={Math.round(hsv.h)} onChange={(h) => apply({ ...hsv, h })} />
        <div className="presets">
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
          className="hex"
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

function Draggable({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const origin = useRef<{ x: number; y: number }>(null)

  const grab = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) return
    origin.current = { x: event.clientX - offset.x, y: event.clientY - offset.y }
  }
  const release = () => {
    origin.current = null
  }
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!origin.current) return
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      const moved = Math.hypot(
        event.clientX - offset.x - origin.current.x,
        event.clientY - offset.y - origin.current.y,
      )
      if (moved < 5) return
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    const limitX = event.currentTarget.offsetWidth / 2
    const limitY = event.currentTarget.offsetHeight / 2
    setOffset({
      x: Math.max(-limitX, Math.min(limitX, event.clientX - origin.current.x)),
      y: Math.max(-limitY, Math.min(limitY, event.clientY - origin.current.y)),
    })
  }

  return (
    <div
      className="drag"
      style={{ ...style, transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onPointerDown={grab}
      onPointerMove={move}
      onPointerUp={release}
      onPointerCancel={release}
    >
      {children}
    </div>
  )
}

function Snippet({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <figure className="snippet">
      <figcaption>
        {label}
        <button
          type="button"
          className="btn icon-btn"
          aria-label={copied ? 'Copied' : `Copy ${label.toLowerCase()}`}
          data-tip={`Copy ${label.toLowerCase()}`}
          data-copied={copied}
          onClick={copy}
        >
          <span key={String(copied)} className="swap">
            <Svg d={copied ? icons.check : icons.copy} />
          </span>
        </button>
      </figcaption>
      <pre>{text}</pre>
    </figure>
  )
}

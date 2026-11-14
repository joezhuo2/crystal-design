import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type InputHTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'
import { Checkbox } from '@crystal-design/checkbox'
import { ColorPicker } from '@crystal-design/color-picker'
import { FeedbackButton } from '@crystal-design/feedback-button'
import { Tooltip } from '@crystal-design/tooltip'
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
          <Tooltip content="View source on GitHub" align="end">
            <a className="btn icon-btn" href="https://github.com/joezhuo2/crystal-design" aria-label="GitHub">
              <GitHubMark />
            </a>
          </Tooltip>
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
    <Tooltip content={`Switch to ${next} mode`} align="end">
      <button type="button" className="btn icon-btn" aria-label={`Switch to ${next} mode`} onClick={toggle}>
        <span key={theme} className="spin">
          <Svg d={theme === 'dark' ? icons.sun : icons.moon} />
        </span>
      </button>
    </Tooltip>
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
              <div
                className="thumb"
                data-glass={entry.glass !== false}
                data-hover={entry.hover || undefined}
                inert={!entry.hover}
                aria-hidden={entry.hover || undefined}
                onClick={entry.hover ? () => (location.hash = `#/${entry.id}`) : undefined}
              >
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

const initialBackdrop: Backdrop = { kind: 'text', text: 'Crystal', color: '', image: '' }

function Detail({ entry }: { entry: Entry }) {
  const [values, setValues] = useState<Values>(() => defaultsOf(entry))
  const [view, setView] = useState<'preview' | 'code'>('preview')
  const [backdrop, setBackdrop] = useState<Backdrop>(initialBackdrop)
  const set = (key: string, value: Values[string]) => setValues((current) => ({ ...current, [key]: value }))
  const setBack = (patch: Partial<Backdrop>) => setBackdrop((current) => ({ ...current, ...patch }))

  const reset = () =>
    new Promise<void>((done) =>
      setTimeout(() => {
        if (backdrop.image) URL.revokeObjectURL(backdrop.image)
        setValues(defaultsOf(entry))
        setBackdrop(initialBackdrop)
        done()
      }, 600),
    )

  const pickImage = (file?: File) => {
    if (!file) return
    if (backdrop.image) URL.revokeObjectURL(backdrop.image)
    setBack({ kind: 'image', image: URL.createObjectURL(file) })
  }

  const glass = entry.glass !== false
  const vars = glass ? lookVars(values) : {}
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
${css ? `\n3. Add these CSS variables to tune the glass look:\n\n${css}\n` : ''}${
    glass
      ? '\nIt is a liquid glass surface that refracts whatever is behind it, so place it over an image, gradient or other visual content. The radius, strength and bezel props tune the shape and the amount of refraction. Chromium browsers refract; other browsers fall back to frosted blur.'
      : '\nIt is themed with CSS variables (--cd-accent, --cd-fg, --cd-bg, --cd-raised, --cd-line, --cd-radius, --cd-ease); set them on :root to match my app.'
  }`

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

          {glass && (
            <div className="group">
              <h2>Glass</h2>
              {lookControls.map((control) => (
                <Field key={control.key} control={control} value={values[control.key]} onChange={(value) => set(control.key, value)} />
              ))}
            </div>
          )}

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
                <ColorPicker className="field" data-type="color" label="Backdrop color" value={backdrop.color || '#808080'} onChange={(color) => setBack({ color })} />
              )
            )}
          </div>

          <div className="controls-footer">
            <FeedbackButton className="btn" action={reset} busy="Resetting…" done="✓ Settings reset" resetAfter={1600}>
              Reset settings
            </FeedbackButton>
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
  if (control.type === 'color')
    return <ColorPicker className="field" data-type="color" label={control.label} value={value as string} onChange={onChange} />

  return (
    <label className="field" data-type={control.type}>
      <span>
        {control.label}
        {control.type === 'range' && <output>{value}</output>}
      </span>
      {control.type === 'range' ? (
        <Range min={control.min} max={control.max} value={value as number} onChange={onChange} />
      ) : control.type === 'select' ? (
        <select value={value as string} onChange={(event) => onChange(event.target.value)}>
          {control.options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : control.type === 'toggle' ? (
        <Checkbox checked={value as boolean} onChange={(event) => onChange(event.target.checked)} />
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
  const name = `Copy ${label.toLowerCase()}`

  return (
    <figure className="snippet">
      <figcaption>
        {label}
        <Tooltip content={copied ? 'Copied!' : name} align="end">
          <FeedbackButton
            className="btn icon-btn"
            aria-label={copied ? 'Copied' : name}
            action={() => navigator.clipboard.writeText(text)}
            busy={<Svg d={icons.copy} />}
            done={<Svg d={icons.check} />}
            onStateChange={(state) => setCopied(state === 'done')}
          >
            <Svg d={icons.copy} />
          </FeedbackButton>
        </Tooltip>
      </figcaption>
      <pre>{text}</pre>
    </figure>
  )
}

import { useRef, useState, useSyncExternalStore, type PointerEvent, type ReactNode } from 'react'
import { catalog, defaultsOf, type Entry, type Values } from './catalog'

const backdrop = [1, 2, 3, 4, 5, 6]
const categories = ['All', ...new Set(catalog.map((entry) => entry.category))]

const subscribe = (notify: () => void) => {
  addEventListener('hashchange', notify)
  return () => removeEventListener('hashchange', notify)
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
        <a href="https://github.com/joezhuo2/crystal-design">GitHub</a>
      </header>
      {entry ? <Detail key={entry.id} entry={entry} /> : <List />}
    </div>
  )
}

function List() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('az')

  const needle = query.trim().toLowerCase()
  const items = catalog
    .filter(
      (entry) =>
        (category === 'All' || entry.category === category) &&
        `${entry.name} ${entry.category} ${entry.description}`.toLowerCase().includes(needle),
    )
    .sort((a, b) => a.name.localeCompare(b.name) * (sort === 'az' ? 1 : -1))

  return (
    <main>
      <h1>Components</h1>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Search components"
          aria-label="Search components"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="chips" role="group" aria-label="Filter by category">
          {categories.map((name) => (
            <button key={name} type="button" aria-pressed={name === category} onClick={() => setCategory(name)}>
              {name}
            </button>
          ))}
        </div>
        <select aria-label="Sort" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="az">Name A–Z</option>
          <option value="za">Name Z–A</option>
        </select>
      </div>
      {items.length ? (
        <ul className="grid">
          {items.map((entry) => (
            <li key={entry.id}>
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

function Detail({ entry }: { entry: Entry }) {
  const [values, setValues] = useState<Values>(() => defaultsOf(entry))
  const [view, setView] = useState<'preview' | 'code'>('preview')
  const set = (key: string, value: Values[string]) => setValues((current) => ({ ...current, [key]: value }))

  const install = `npm install ${entry.pkg}`
  const usage = entry.code(values)
  const prompt = `Add the Crystal Design ${entry.name} component to my React project.

1. Install it: ${install}
2. Use it like this, adapting the content to my app:

${usage}

It is a liquid glass surface that refracts whatever is behind it, so place it over an image, gradient or other visual content. The radius, strength and bezel props tune the shape and the amount of refraction. Chromium browsers refract; other browsers fall back to frosted blur.`

  return (
    <main>
      <a href="#/">← All components</a>
      <h1>{entry.name}</h1>
      <p>{entry.description}</p>

      <p className="hint">Drag the component around. Scroll inside the preview to move the backdrop.</p>

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
          <div className="preview" tabIndex={0} aria-label={`${entry.name} preview. Drag the component, scroll the backdrop.`}>
            <div className="overlay">
              <Draggable>{entry.render(values)}</Draggable>
            </div>
            {backdrop.map((id) => (
              <section key={id} />
            ))}
          </div>
        ) : (
          <div className="code">
            <Snippet label="Install" text={install} />
            <Snippet label="Usage" text={usage} />
          </div>
        )}

        <form className="controls" onSubmit={(event) => event.preventDefault()}>
          <h2>Customize</h2>
          {entry.controls.map((control) => (
            <label key={control.key} data-type={control.type}>
              <span>
                {control.label}
                {control.type === 'range' && <output>{values[control.key]}</output>}
              </span>
              {control.type === 'range' ? (
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  value={values[control.key] as number}
                  onChange={(event) => set(control.key, Number(event.target.value))}
                />
              ) : control.type === 'text' ? (
                <input
                  type="text"
                  value={values[control.key] as string}
                  onChange={(event) => set(control.key, event.target.value)}
                />
              ) : (
                <input
                  type="checkbox"
                  checked={values[control.key] as boolean}
                  onChange={(event) => set(control.key, event.target.checked)}
                />
              )}
            </label>
          ))}
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

function Draggable({ children }: { children: ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const origin = useRef({ x: 0, y: 0 })

  const grab = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) return
    event.currentTarget.setPointerCapture(event.pointerId)
    origin.current = { x: event.clientX - offset.x, y: event.clientY - offset.y }
  }
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
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
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onPointerDown={grab}
      onPointerMove={move}
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
        <button type="button" onClick={copy}>
          <span aria-live="polite">{copied ? 'Copied' : `Copy ${label.toLowerCase()}`}</span>
        </button>
      </figcaption>
      <pre>{text}</pre>
    </figure>
  )
}

import { useState, type CSSProperties } from 'react'
import { GlideEffect } from '@crystal-design/glide-effect'
import { GlassNavbar } from '@crystal-design/navbar-glass'
import { changed, Glyph, glyphs, styleAttr, type Entry, type Values } from '../entry'

const labels = ['Home', 'Components', 'Favorites']
const icons = [glyphs.home, glyphs.grid, glyphs.star]

const panel: CSSProperties = {
  padding: 4,
  gap: 4,
  borderRadius: 12,
  background: 'var(--cd-raised, #111)',
  border: '1px solid var(--cd-line, rgb(255 255 255 / 0.2))',
}

const button: CSSProperties = {
  appearance: 'none',
  border: 0,
  background: 'none',
  color: 'inherit',
  font: 'inherit',
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: 8,
  cursor: 'pointer',
}

function Demo({ v }: { v: Values }) {
  const [active, setActive] = useState(0)
  const style = { '--cd-glide-radius': `${v.radius}px` } as CSSProperties

  if (v.layout === 'Navbar')
    return (
      <GlassNavbar aria-label="Demo" style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}>
        <GlideEffect style={{ ...style, display: 'flex', gap: 4 }}>
          {labels.map((label, i) => (
            <a
              key={label}
              href="#/glide-effect"
              aria-current={i === active ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                setActive(i)
              }}
            >
              {label}
            </a>
          ))}
        </GlideEffect>
      </GlassNavbar>
    )

  if (v.layout === 'Sidebar')
    return (
      <GlideEffect
        as="nav"
        orientation="vertical"
        aria-label="Demo"
        style={{ ...style, ...panel, display: 'flex', flexDirection: 'column', width: 200 }}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-current={i === active ? 'page' : undefined}
            style={{ ...button, display: 'flex', alignItems: 'center', gap: 10 }}
            onClick={() => setActive(i)}
          >
            <Glyph d={icons[i]} />
            {label}
          </button>
        ))}
      </GlideEffect>
    )

  return (
    <GlideEffect active={active} style={{ ...style, ...panel, display: 'inline-flex' }}>
      {labels.map((label, i) => (
        <button key={label} type="button" aria-pressed={i === active} style={button} onClick={() => setActive(i)}>
          {label}
        </button>
      ))}
    </GlideEffect>
  )
}

const snippets: Record<string, (style: string) => string> = {
  Tabs: (style) => `<GlideEffect active={tab}${style}>
  {tabs.map((label, i) => (
    <button key={label} aria-pressed={i === tab} onClick={() => setTab(i)}>
      {label}
    </button>
  ))}
</GlideEffect>`,
  Navbar: (style) => `<GlassNavbar aria-label="Main">
  <GlideEffect${style}>
    <a href="/" aria-current={page === '/' ? 'page' : undefined}>Home</a>
    <a href="/components" aria-current={page === '/components' ? 'page' : undefined}>Components</a>
    <a href="/favorites" aria-current={page === '/favorites' ? 'page' : undefined}>Favorites</a>
  </GlideEffect>
</GlassNavbar>`,
  Sidebar: (style) => `<GlideEffect as="nav" orientation="vertical" aria-label="Sections"${style}>
  {sections.map((label) => (
    <button key={label} aria-current={label === section ? 'page' : undefined} onClick={() => setSection(label)}>
      {label}
    </button>
  ))}
</GlideEffect>`,
}

export const entry: Entry = {
  id: 'glide-effect',
  name: 'Glide Effect',
  pkg: '@crystal-design/glide-effect',
  category: 'Effects',
  description: 'A stretchy indicator that glides behind the active tab, link or sidebar row.',
  glass: false,
  controls: [
    { key: 'layout', label: 'Layout', type: 'select', options: ['Tabs', 'Navbar', 'Sidebar'], value: 'Tabs' },
    { key: 'radius', label: 'Radius', type: 'range', min: 0, max: 20, value: 8 },
  ],
  render: (v) => <Demo v={v} />,
  code(v) {
    const style = styleAttr({ "'--cd-glide-radius'": changed(this, v, 'radius') && `${v.radius}px` })
    const layout = v.layout as string
    return `import { GlideEffect } from '@crystal-design/glide-effect'${
      layout === 'Navbar' ? `\nimport { GlassNavbar } from '@crystal-design/navbar-glass'` : ''
    }

${snippets[layout](style)}`
  },
}

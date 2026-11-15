import { useState, type CSSProperties } from 'react'
import { FollowEffect } from '@crystalflux/follow-effect'
import { GlassNavbar } from '@crystalflux/navbar-glass'
import { Glyph, glyphs, type Entry, type Values } from '../entry'

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
  const rest = v.rest as 'hide' | 'active'
  const current = (i: number) => (i === active ? 'page' : undefined)

  if (v.layout === 'Navbar')
    return (
      <GlassNavbar aria-label="Demo" style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}>
        <FollowEffect rest={rest} active={active} style={{ display: 'flex', gap: 4 }}>
          {labels.map((label, i) => (
            <a
              key={label}
              href="#/follow-effect"
              aria-current={current(i)}
              style={{ background: 'none' }}
              onClick={(event) => {
                event.preventDefault()
                setActive(i)
              }}
            >
              {label}
            </a>
          ))}
        </FollowEffect>
      </GlassNavbar>
    )

  if (v.layout === 'Sidebar')
    return (
      <FollowEffect
        as="nav"
        rest={rest}
        active={active}
        aria-label="Demo"
        style={{ ...panel, display: 'flex', flexDirection: 'column', width: 200 }}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-current={current(i)}
            style={{ ...button, display: 'flex', alignItems: 'center', gap: 10, opacity: i === active ? 1 : 0.75 }}
            onClick={() => setActive(i)}
          >
            <Glyph d={icons[i]} />
            {label}
          </button>
        ))}
      </FollowEffect>
    )

  return (
    <FollowEffect rest={rest} active={active} style={{ ...panel, display: 'inline-flex' }}>
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          aria-pressed={i === active}
          style={{ ...button, opacity: i === active ? 1 : 0.75 }}
          onClick={() => setActive(i)}
        >
          {label}
        </button>
      ))}
    </FollowEffect>
  )
}

const snippets: Record<string, (attrs: string) => string> = {
  Tabs: (attrs) => `<FollowEffect${attrs}>
  {tabs.map((label, i) => (
    <button key={label} aria-pressed={i === tab} onClick={() => setTab(i)}>
      {label}
    </button>
  ))}
</FollowEffect>`,
  Navbar: (attrs) => `<GlassNavbar aria-label="Main">
  <FollowEffect${attrs}>
    <a href="/">Home</a>
    <a href="/components">Components</a>
    <a href="/favorites">Favorites</a>
  </FollowEffect>
</GlassNavbar>`,
  Sidebar: (attrs) => `<FollowEffect as="nav" aria-label="Sections"${attrs}>
  {sections.map((label, i) => (
    <button key={label} onClick={() => setSection(i)}>
      {label}
    </button>
  ))}
</FollowEffect>`,
}

const indexName: Record<string, string> = { Tabs: 'tab', Navbar: 'page', Sidebar: 'section' }

export const entry: Entry = {
  id: 'follow-effect',
  name: 'Follow Effect',
  pkg: '@crystalflux/follow-effect',
  category: 'Effects',
  description: 'A highlight pill that glides to whichever row, link or tab is under the pointer or focus.',
  glass: false,
  hover: true,
  controls: [
    { key: 'layout', label: 'Layout', type: 'select', options: ['Tabs', 'Navbar', 'Sidebar'], value: 'Tabs' },
    { key: 'rest', label: 'On leave', type: 'select', options: ['hide', 'active'], value: 'hide' },
  ],
  render: (v) => <Demo v={v} />,
  code: (v) => {
    const layout = v.layout as string
    const attrs = v.rest === 'active' ? ` rest="active" active={${indexName[layout]}}` : ''
    return `import { FollowEffect } from '@crystalflux/follow-effect'${
      layout === 'Navbar' ? `\nimport { GlassNavbar } from '@crystalflux/navbar-glass'` : ''
    }

${snippets[layout](attrs)}`
  },
}

import { useState, type ReactNode } from 'react'
import { Button } from '@crystal-design/button'
import { Card } from '@crystal-design/card'
import { GlassSurface } from '@crystal-design/glass'
import { Icon } from '@crystal-design/icon'
import { Navbar } from '@crystal-design/navbar'
import { Sidebar, SidebarItem, type SidebarProps } from '@crystal-design/sidebar'

export type Values = Record<string, string | number | boolean>

export type Control =
  | { key: string; label: string; type: 'range'; min: number; max: number; value: number }
  | { key: string; label: string; type: 'text'; value: string }
  | { key: string; label: string; type: 'toggle'; value: boolean }

export type Entry = {
  id: string
  name: string
  pkg: string
  category: string
  description: string
  controls: Control[]
  render: (values: Values) => ReactNode
  code: (values: Values) => string
}

const GLASS_KEYS = ['radius', 'strength', 'bezel']

const glassControls = (radius: number, maxRadius: number): Control[] => [
  { key: 'radius', label: 'Radius', type: 'range', min: 0, max: maxRadius, value: radius },
  { key: 'strength', label: 'Refraction', type: 'range', min: 0, max: 120, value: 30 },
  { key: 'bezel', label: 'Bezel', type: 'range', min: 4, max: 40, value: 20 },
]

const glassProps = (v: Values) => ({
  radius: v.radius as number,
  strength: v.strength as number,
  bezel: v.bezel as number,
})

const glassAttrs = (entry: Entry, v: Values) =>
  entry.controls
    .filter((control) => GLASS_KEYS.includes(control.key) && v[control.key] !== control.value)
    .map((control) => ` ${control.key}={${v[control.key]}}`)
    .join('')

const glyphs = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  star: 'M12 3l2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.3l-5.6 3 1.2-6.3L3 9.6l6.3-.8z',
}

function Glyph({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

const sidebarItems = [
  { label: 'Home', glyph: glyphs.home },
  { label: 'Components', glyph: glyphs.grid },
  { label: 'Favorites', glyph: glyphs.star },
]

function SidebarDemo(props: SidebarProps) {
  const [active, setActive] = useState('Home')
  return (
    <Sidebar {...props} aria-label="Demo">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.label}
          icon={<Glyph d={item.glyph} />}
          label={item.label}
          active={item.label === active}
          onClick={() => setActive(item.label)}
        />
      ))}
    </Sidebar>
  )
}

const surface: Entry = {
  id: 'glass',
  name: 'Surface (Liquid Glass)',
  pkg: '@crystal-design/glass',
  category: 'Surfaces',
  description: 'Core panel that bends what is behind it.',
  controls: glassControls(10, 80),
  render: (v) => <GlassSurface {...glassProps(v)} style={{ width: 200, height: 120 }} />,
  code: (v) => `import { GlassSurface } from '@crystal-design/glass'

<GlassSurface${glassAttrs(surface, v)} style={{ width: 200, height: 120 }} />`,
}

const button: Entry = {
  id: 'button',
  name: 'Button (Liquid Glass)',
  pkg: '@crystal-design/button',
  category: 'Actions',
  description: 'Glass button with hover and press states.',
  controls: [
    ...glassControls(10, 23),
    { key: 'label', label: 'Label', type: 'text', value: 'Get started' },
    { key: 'disabled', label: 'Disabled', type: 'toggle', value: false },
  ],
  render: (v) => (
    <Button {...glassProps(v)} disabled={v.disabled as boolean}>
      {v.label}
    </Button>
  ),
  code: (v) => `import { Button } from '@crystal-design/button'

<Button${glassAttrs(button, v)}${v.disabled ? ' disabled' : ''}>${v.label}</Button>`,
}

const card: Entry = {
  id: 'card',
  name: 'Card (Liquid Glass)',
  pkg: '@crystal-design/card',
  category: 'Surfaces',
  description: 'Padded panel for text, media or actions.',
  controls: [
    ...glassControls(15, 64),
    { key: 'title', label: 'Title', type: 'text', value: 'Liquid glass' },
    { key: 'body', label: 'Body', type: 'text', value: 'Content stays sharp while the rim bends the page behind it.' },
  ],
  render: (v) => (
    <Card {...glassProps(v)} style={{ maxWidth: 250 }}>
      <h3>{v.title}</h3>
      <p>{v.body}</p>
    </Card>
  ),
  code: (v) => `import { Card } from '@crystal-design/card'

<Card${glassAttrs(card, v)}>
  <h3>${v.title}</h3>
  <p>${v.body}</p>
</Card>`,
}

const navbar: Entry = {
  id: 'navbar',
  name: 'Navbar (Liquid Glass)',
  pkg: '@crystal-design/navbar',
  category: 'Navigation',
  description: 'Top bar pinned while the page scrolls.',
  controls: [...glassControls(10, 27), { key: 'brand', label: 'Brand', type: 'text', value: 'Crystal' }],
  render: (v) => (
    <Navbar {...glassProps(v)} aria-label="Demo">
      <a href="#/navbar">
        <strong>{v.brand}</strong>
      </a>
      <a href="#/navbar">Docs</a>
      <a href="#/navbar">Pricing</a>
    </Navbar>
  ),
  code: (v) => `import { Navbar } from '@crystal-design/navbar'

<Navbar${glassAttrs(navbar, v)} aria-label="Main">
  <a href="/"><strong>${v.brand}</strong></a>
  <a href="/docs">Docs</a>
  <a href="/pricing">Pricing</a>
</Navbar>`,
}

const sidebar: Entry = {
  id: 'sidebar',
  name: 'Sidebar (Liquid Glass)',
  pkg: '@crystal-design/sidebar',
  category: 'Navigation',
  description: 'Icon rail that expands on hover.',
  controls: glassControls(10, 32),
  render: (v) => <SidebarDemo {...glassProps(v)} />,
  code: (v) => `import { useState } from 'react'
import { Sidebar, SidebarItem } from '@crystal-design/sidebar'

const [active, setActive] = useState('Home')

<Sidebar${glassAttrs(sidebar, v)} aria-label="Sections">
  <SidebarItem icon={<HomeIcon />} label="Home" active={active === 'Home'} onClick={() => setActive('Home')} />
  <SidebarItem icon={<GridIcon />} label="Components" active={active === 'Components'} onClick={() => setActive('Components')} />
  <SidebarItem icon={<StarIcon />} label="Favorites" active={active === 'Favorites'} onClick={() => setActive('Favorites')} />
</Sidebar>`,
}

const icon: Entry = {
  id: 'icon',
  name: 'Icon (Liquid Glass)',
  pkg: '@crystal-design/icon',
  category: 'Surfaces',
  description: 'Glass tile around a glyph or logo.',
  controls: [
    { key: 'size', label: 'Size', type: 'range', min: 32, max: 240, value: 56 },
    { key: 'strength', label: 'Refraction', type: 'range', min: 0, max: 120, value: 30 },
    { key: 'bezel', label: 'Bezel', type: 'range', min: 4, max: 40, value: 20 },
  ],
  render: (v) => (
    <Icon size={v.size as number} strength={v.strength as number} bezel={v.bezel as number} label="Favorite">
      <Glyph d={glyphs.star} />
    </Icon>
  ),
  code: (v) => `import { Icon } from '@crystal-design/icon'

<Icon size={${v.size}}${glassAttrs(icon, v)} label="Favorite">
  <StarIcon />
</Icon>`,
}

export const catalog: Entry[] = [surface, button, card, navbar, sidebar, icon]

export const defaultsOf = (entry: Entry): Values =>
  Object.fromEntries(entry.controls.map((control) => [control.key, control.value]))

import { useState, type ReactNode } from 'react'
import { GlassButton } from '@crystal-design/button-glass'
import { GlassCard } from '@crystal-design/card-glass'
import { GlassSurface } from '@crystal-design/surface-glass'
import { GlassIcon } from '@crystal-design/icon-glass'
import { GlassNavbar } from '@crystal-design/navbar-glass'
import { GlassSidebar, GlassSidebarItem, type GlassSidebarProps } from '@crystal-design/sidebar-glass'

export type Values = Record<string, string | number | boolean>

export type Control =
  | { key: string; label: string; type: 'range'; min: number; max: number; value: number }
  | { key: string; label: string; type: 'text'; value: string }
  | { key: string; label: string; type: 'color'; value: string }
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

const changed = (entry: Entry, v: Values, key: string) =>
  v[key] !== entry.controls.find((control) => control.key === key)?.value

const styleAttr = (style: Record<string, string | number | false>) => {
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

function SidebarDemo(props: GlassSidebarProps) {
  const [active, setActive] = useState('Home')
  return (
    <GlassSidebar {...props} aria-label="Demo">
      {sidebarItems.map((item) => (
        <GlassSidebarItem
          key={item.label}
          icon={<Glyph d={item.glyph} />}
          label={item.label}
          active={item.label === active}
          onClick={() => setActive(item.label)}
        />
      ))}
    </GlassSidebar>
  )
}

const surface: Entry = {
  id: 'surface-glass',
  name: 'Glass Surface',
  pkg: '@crystal-design/surface-glass',
  category: 'Surfaces',
  description: 'Core panel that bends what is behind it.',
  controls: [
    ...glassControls(12, 80),
    { key: 'width', label: 'Width', type: 'range', min: 80, max: 400, value: 200 },
    { key: 'height', label: 'Height', type: 'range', min: 60, max: 300, value: 120 },
  ],
  render: (v) => <GlassSurface {...glassProps(v)} style={{ width: v.width as number, height: v.height as number }} />,
  code: (v) => `import { GlassSurface } from '@crystal-design/surface-glass'

<GlassSurface${glassAttrs(surface, v)}${styleAttr({ width: v.width as number, height: v.height as number })} />`,
}

const button: Entry = {
  id: 'button-glass',
  name: 'Glass Button',
  pkg: '@crystal-design/button-glass',
  category: 'Actions',
  description: 'Glass button with hover and press states.',
  controls: [
    ...glassControls(12, 23),
    { key: 'padding', label: 'Side padding', type: 'range', min: 8, max: 48, value: 22 },
    { key: 'label', label: 'Label', type: 'text', value: 'Get started' },
    { key: 'disabled', label: 'Disabled', type: 'toggle', value: false },
  ],
  render: (v) => (
    <GlassButton {...glassProps(v)} disabled={v.disabled as boolean} style={{ paddingInline: v.padding as number }}>
      {v.label}
    </GlassButton>
  ),
  code: (v) => `import { GlassButton } from '@crystal-design/button-glass'

<GlassButton${glassAttrs(button, v)}${styleAttr({ paddingInline: changed(button, v, 'padding') && (v.padding as number) })}${v.disabled ? ' disabled' : ''}>${v.label}</GlassButton>`,
}

const card: Entry = {
  id: 'card-glass',
  name: 'Glass Card',
  pkg: '@crystal-design/card-glass',
  category: 'Surfaces',
  description: 'Padded panel for text, media or actions.',
  controls: [
    ...glassControls(18, 64),
    { key: 'width', label: 'Max width', type: 'range', min: 160, max: 400, value: 250 },
    { key: 'padding', label: 'Padding', type: 'range', min: 8, max: 48, value: 24 },
    { key: 'title', label: 'Title', type: 'text', value: 'Liquid glass' },
    { key: 'body', label: 'Body', type: 'text', value: 'Content stays sharp while the rim bends the page behind it.' },
  ],
  render: (v) => (
    <GlassCard {...glassProps(v)} style={{ maxWidth: v.width as number, padding: v.padding as number }}>
      <h3>{v.title}</h3>
      <p>{v.body}</p>
    </GlassCard>
  ),
  code: (v) => `import { GlassCard } from '@crystal-design/card-glass'

<GlassCard${glassAttrs(card, v)}${styleAttr({ maxWidth: v.width as number, padding: changed(card, v, 'padding') && (v.padding as number) })}>
  <h3>${v.title}</h3>
  <p>${v.body}</p>
</GlassCard>`,
}

const navbar: Entry = {
  id: 'navbar-glass',
  name: 'Glass Navbar',
  pkg: '@crystal-design/navbar-glass',
  category: 'Navigation',
  description: 'Top bar pinned while the page scrolls.',
  controls: [
    ...glassControls(12, 27),
    { key: 'gap', label: 'Link gap', type: 'range', min: 0, max: 32, value: 4 },
    { key: 'brand', label: 'Brand', type: 'text', value: 'Crystal' },
  ],
  render: (v) => (
    <GlassNavbar {...glassProps(v)} aria-label="Demo" style={{ gap: v.gap as number }}>
      <a href="#/navbar-glass">
        <strong>{v.brand}</strong>
      </a>
      <a href="#/navbar-glass">Docs</a>
      <a href="#/navbar-glass">Pricing</a>
    </GlassNavbar>
  ),
  code: (v) => `import { GlassNavbar } from '@crystal-design/navbar-glass'

<GlassNavbar${glassAttrs(navbar, v)}${styleAttr({ gap: changed(navbar, v, 'gap') && (v.gap as number) })} aria-label="Main">
  <a href="/"><strong>${v.brand}</strong></a>
  <a href="/docs">Docs</a>
  <a href="/pricing">Pricing</a>
</GlassNavbar>`,
}

const sidebar: Entry = {
  id: 'sidebar-glass',
  name: 'Glass Sidebar',
  pkg: '@crystal-design/sidebar-glass',
  category: 'Navigation',
  description: 'Icon rail that expands on hover.',
  controls: [...glassControls(12, 32), { key: 'padding', label: 'Padding', type: 'range', min: 4, max: 16, value: 10 }],
  render: (v) => <SidebarDemo {...glassProps(v)} style={{ padding: v.padding as number }} />,
  code: (v) => `import { useState } from 'react'
import { GlassSidebar, GlassSidebarItem } from '@crystal-design/sidebar-glass'

const [active, setActive] = useState('Home')

<GlassSidebar${glassAttrs(sidebar, v)}${styleAttr({ padding: changed(sidebar, v, 'padding') && (v.padding as number) })} aria-label="Sections">
  <GlassSidebarItem icon={<HomeIcon />} label="Home" active={active === 'Home'} onClick={() => setActive('Home')} />
  <GlassSidebarItem icon={<GridIcon />} label="Components" active={active === 'Components'} onClick={() => setActive('Components')} />
  <GlassSidebarItem icon={<StarIcon />} label="Favorites" active={active === 'Favorites'} onClick={() => setActive('Favorites')} />
</GlassSidebar>`,
}

const icon: Entry = {
  id: 'icon-glass',
  name: 'Glass Icon',
  pkg: '@crystal-design/icon-glass',
  category: 'Surfaces',
  description: 'Glass tile around a glyph or logo.',
  controls: [
    { key: 'size', label: 'Size', type: 'range', min: 32, max: 240, value: 56 },
    { key: 'radius', label: 'Radius', type: 'range', min: 0, max: 60, value: 12 },
    { key: 'strength', label: 'Refraction', type: 'range', min: 0, max: 120, value: 30 },
    { key: 'bezel', label: 'Bezel', type: 'range', min: 4, max: 40, value: 20 },
  ],
  render: (v) => (
    <GlassIcon size={v.size as number} {...glassProps(v)} label="Favorite">
      <Glyph d={glyphs.star} />
    </GlassIcon>
  ),
  code: (v) => `import { GlassIcon } from '@crystal-design/icon-glass'

<GlassIcon size={${v.size}}${glassAttrs(icon, v)} label="Favorite">
  <StarIcon />
</GlassIcon>`,
}

export const catalog: Entry[] = [surface, button, card, navbar, sidebar, icon]

export const defaultsOf = (entry: Entry): Values =>
  Object.fromEntries([...entry.controls, ...lookControls].map((control) => [control.key, control.value]))

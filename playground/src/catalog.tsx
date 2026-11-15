import { useState } from 'react'
import { GlassButton } from '@crystalflux/button-glass'
import { GlassCard } from '@crystalflux/card-glass'
import { GlassSurface } from '@crystalflux/surface-glass'
import { GlassIcon } from '@crystalflux/icon-glass'
import { GlassNavbar } from '@crystalflux/navbar-glass'
import {
  changed,
  glassAttrs,
  glassControls,
  glassProps,
  Glyph,
  glyphs,
  lookControls,
  styleAttr,
  type Entry,
  type Values,
} from './entry'
import { GlassSidebar, GlassSidebarItem, type GlassSidebarProps } from '@crystalflux/sidebar-glass'
import { entry as tabsGlass } from './entries/tabs-glass'
import { entry as selectGlass } from './entries/select-glass'
import { entry as tooltipGlass } from './entries/tooltip-glass'
import { entry as menuGlass } from './entries/menu-glass'
import { entry as modalGlass } from './entries/modal-glass'
import { entry as toastGlass } from './entries/toast-glass'
import { entry as commandPaletteGlass } from './entries/command-palette-glass'
import { entry as switchGlass } from './entries/switch-glass'
import { entry as accordionGlass } from './entries/accordion-glass'
import { entry as skeletonGlass } from './entries/skeleton-glass'
import { entry as islandGlass } from './entries/island-glass'
import { entry as spotlight } from './entries/spotlight'
import { entry as stardust } from './entries/stardust'
import { entry as animatedNumber } from './entries/animated-number'
import { entry as position } from './entries/position'
import { entry as feedbackButton } from './entries/feedback-button'
import { entry as checkbox } from './entries/checkbox'
import { entry as colorPicker } from './entries/color-picker'
import { entry as tooltip } from './entries/tooltip'
import { entry as smoothScroll } from './entries/smooth-scroll'
import { entry as checkboxGlassEntry } from './entries/checkbox-glass'
import { entry as progressRingGlassEntry } from './entries/progress-ring-glass'
import { entry as timedButtonGlassEntry } from './entries/timed-button-glass'
import { entry as navbarEntry } from './entries/navbar'
import { entry as sidebarEntry } from './entries/sidebar'
import { entry as progressRingEntry } from './entries/progress-ring'
import { entry as timedButtonEntry } from './entries/timed-button'
import { entry as smoothRangeEntry } from './entries/smooth-range'
import { entry as introLoaderEntry } from './entries/intro-loader'
import { entry as glideEffectEntry } from './entries/glide-effect'
import { entry as followEffectEntry } from './entries/follow-effect'
import { entry as focusEffectEntry } from './entries/focus-effect'
import { entry as clickEffectEntry } from './entries/click-effect'
import { entry as orbitEffectEntry } from './entries/orbit-effect'
import { entry as shimmerEffectEntry } from './entries/shimmer-effect'
import { entry as fuseEffectEntry } from './entries/fuse-effect'
import { entry as popEffectEntry } from './entries/pop-effect'
import { entry as fadeInEffectEntry } from './entries/fade-in-effect'
import { entry as collapseEffectEntry } from './entries/collapse-effect'
import { entry as morphEffectEntry } from './entries/morph-effect'
import { entry as swapEffectEntry } from './entries/swap-effect'
import { entry as drawEffectEntry } from './entries/draw-effect'
import { entry as pulseEffectEntry } from './entries/pulse-effect'
import { entry as textScrambleEntry } from './entries/text-scramble'
import { entry as glitchTextEntry } from './entries/glitch-text'
import { entry as rippleHoverEffectEntry } from './entries/ripple-hover-effect'

export { lookControls, lookVars, type Control, type Entry, type Values } from './entry'

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
  pkg: '@crystalflux/surface-glass',
  category: 'Surfaces',
  description: 'Core panel that bends what is behind it.',
  controls: [
    ...glassControls(12, 80),
    { key: 'width', label: 'Width', type: 'range', min: 80, max: 400, value: 200 },
    { key: 'height', label: 'Height', type: 'range', min: 60, max: 300, value: 120 },
  ],
  render: (v) => <GlassSurface {...glassProps(v)} style={{ width: v.width as number, height: v.height as number }} />,
  code: (v) => `import { GlassSurface } from '@crystalflux/surface-glass'

<GlassSurface${glassAttrs(surface, v)}${styleAttr({ width: v.width as number, height: v.height as number })} />`,
}

const button: Entry = {
  id: 'button-glass',
  name: 'Glass Button',
  pkg: '@crystalflux/button-glass',
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
  code: (v) => `import { GlassButton } from '@crystalflux/button-glass'

<GlassButton${glassAttrs(button, v)}${styleAttr({ paddingInline: changed(button, v, 'padding') && (v.padding as number) })}${v.disabled ? ' disabled' : ''}>${v.label}</GlassButton>`,
}

const card: Entry = {
  id: 'card-glass',
  name: 'Glass Card',
  pkg: '@crystalflux/card-glass',
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
  code: (v) => `import { GlassCard } from '@crystalflux/card-glass'

<GlassCard${glassAttrs(card, v)}${styleAttr({ maxWidth: v.width as number, padding: changed(card, v, 'padding') && (v.padding as number) })}>
  <h3>${v.title}</h3>
  <p>${v.body}</p>
</GlassCard>`,
}

const navbar: Entry = {
  id: 'navbar-glass',
  name: 'Glass Navbar',
  pkg: '@crystalflux/navbar-glass',
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
  code: (v) => `import { GlassNavbar } from '@crystalflux/navbar-glass'

<GlassNavbar${glassAttrs(navbar, v)}${styleAttr({ gap: changed(navbar, v, 'gap') && (v.gap as number) })} aria-label="Main">
  <a href="/"><strong>${v.brand}</strong></a>
  <a href="/docs">Docs</a>
  <a href="/pricing">Pricing</a>
</GlassNavbar>`,
}

const sidebar: Entry = {
  id: 'sidebar-glass',
  name: 'Glass Sidebar',
  pkg: '@crystalflux/sidebar-glass',
  category: 'Navigation',
  description: 'Icon rail that expands on hover.',
  controls: [...glassControls(12, 32), { key: 'padding', label: 'Padding', type: 'range', min: 4, max: 16, value: 10 }],
  render: (v) => <SidebarDemo {...glassProps(v)} style={{ padding: v.padding as number }} />,
  code: (v) => `import { useState } from 'react'
import { GlassSidebar, GlassSidebarItem } from '@crystalflux/sidebar-glass'

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
  pkg: '@crystalflux/icon-glass',
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
  code: (v) => `import { GlassIcon } from '@crystalflux/icon-glass'

<GlassIcon size={${v.size}}${glassAttrs(icon, v)} label="Favorite">
  <StarIcon />
</GlassIcon>`,
}

export const catalog: Entry[] = [
  surface,
  button,
  card,
  navbar,
  sidebar,
  icon,
  tabsGlass,
  selectGlass,
  tooltipGlass,
  menuGlass,
  modalGlass,
  toastGlass,
  commandPaletteGlass,
  switchGlass,
  checkboxGlassEntry,
  progressRingGlassEntry,
  timedButtonGlassEntry,
  accordionGlass,
  skeletonGlass,
  islandGlass,
  spotlight,
  stardust,
  animatedNumber,
  position,
  feedbackButton,
  checkbox,
  colorPicker,
  tooltip,
  smoothScroll,
  navbarEntry,
  sidebarEntry,
  progressRingEntry,
  timedButtonEntry,
  smoothRangeEntry,
  introLoaderEntry,
  glideEffectEntry,
  followEffectEntry,
  focusEffectEntry,
  clickEffectEntry,
  orbitEffectEntry,
  shimmerEffectEntry,
  fuseEffectEntry,
  popEffectEntry,
  fadeInEffectEntry,
  collapseEffectEntry,
  morphEffectEntry,
  swapEffectEntry,
  drawEffectEntry,
  pulseEffectEntry,
  textScrambleEntry,
  glitchTextEntry,
  rippleHoverEffectEntry,
]

export const defaultsOf = (entry: Entry): Values =>
  Object.fromEntries([...entry.controls, ...lookControls].map((control) => [control.key, control.value]))

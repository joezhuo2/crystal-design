import { useState } from 'react'
import { GlassContextMenu, GlassMenu, type GlassMenuItem } from '@crystalflux/menu-glass'
import { Glyph, glyphs, type Entry } from '../entry'

const items = (log: (text: string) => void): GlassMenuItem[] => [
  { label: 'Open', icon: <Glyph d={glyphs.home} />, onSelect: () => log('Open') },
  { label: 'Favorite', icon: <Glyph d={glyphs.star} />, onSelect: () => log('Favorite') },
  { label: 'Disabled', disabled: true },
  { separator: true },
  { label: 'Delete', danger: true, onSelect: () => log('Delete') },
]

function MenuDemo() {
  const [last, setLast] = useState('Nothing yet')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <GlassMenu trigger="Actions" items={items(setLast)} />
      <GlassContextMenu
        items={items(setLast)}
        style={{
          padding: '22px 28px',
          border: '1px dashed rgb(255 255 255 / 0.35)',
          borderRadius: 12,
          fontSize: 14,
        }}
      >
        Right-click here
      </GlassContextMenu>
      <small style={{ opacity: 0.7 }}>Last: {last}</small>
    </div>
  )
}

export const entry: Entry = {
  id: 'menu-glass',
  name: 'Glass Menu',
  pkg: '@crystalflux/menu-glass',
  category: 'Overlays',
  description: 'Dropdown and context menu with a springy entrance and gliding highlight.',
  controls: [],
  render: () => <MenuDemo />,
  code: () => `import { GlassMenu, GlassContextMenu } from '@crystalflux/menu-glass'

const items = [
  { label: 'Open', onSelect: open },
  { separator: true },
  { label: 'Delete', danger: true, onSelect: remove },
]

<GlassMenu trigger="Actions" items={items} />

<GlassContextMenu items={items}>Right-click here</GlassContextMenu>`,
}

import { useState } from 'react'
import { Sidebar, SidebarItem } from '@crystalflux/sidebar'
import { changed, Glyph, glyphs, styleAttr, type Entry } from '../entry'

const items = [
  { label: 'Home', glyph: glyphs.home },
  { label: 'Components', glyph: glyphs.grid },
  { label: 'Favorites', glyph: glyphs.star },
]

function Demo({ padding }: { padding: number }) {
  const [active, setActive] = useState('Home')
  return (
    <Sidebar aria-label="Demo" style={{ padding }}>
      {items.map((item) => (
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

export const entry: Entry = {
  id: 'sidebar',
  name: 'Sidebar',
  pkg: '@crystalflux/sidebar',
  category: 'Navigation',
  description: 'Solid themed icon rail that expands on hover or focus.',
  glass: false,
  controls: [{ key: 'padding', label: 'Padding', type: 'range', min: 4, max: 16, value: 10 }],
  render: (v) => <Demo padding={v.padding as number} />,
  code(v) {
    return `import { useState } from 'react'
import { Sidebar, SidebarItem } from '@crystalflux/sidebar'

const [active, setActive] = useState('Home')

<Sidebar${styleAttr({ padding: changed(this, v, 'padding') && (v.padding as number) })} aria-label="Sections">
  <SidebarItem icon={<HomeIcon />} label="Home" active={active === 'Home'} onClick={() => setActive('Home')} />
  <SidebarItem icon={<GridIcon />} label="Components" active={active === 'Components'} onClick={() => setActive('Components')} />
  <SidebarItem icon={<StarIcon />} label="Favorites" active={active === 'Favorites'} onClick={() => setActive('Favorites')} />
</Sidebar>`
  },
}

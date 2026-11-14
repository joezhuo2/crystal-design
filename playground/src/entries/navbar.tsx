import { Navbar } from '@crystal-design/navbar'
import { changed, styleAttr, type Entry } from '../entry'

export const entry: Entry = {
  id: 'navbar',
  name: 'Navbar',
  pkg: '@crystal-design/navbar',
  category: 'Navigation',
  description: 'Solid themed top bar pinned while the page scrolls.',
  glass: false,
  controls: [
    { key: 'gap', label: 'Link gap', type: 'range', min: 0, max: 32, value: 4 },
    { key: 'brand', label: 'Brand', type: 'text', value: 'Crystal' },
  ],
  render: (v) => (
    <Navbar aria-label="Demo" style={{ gap: v.gap as number }}>
      <a href="#/navbar">
        <strong>{v.brand}</strong>
      </a>
      <a href="#/navbar">Docs</a>
      <a href="#/navbar">Pricing</a>
    </Navbar>
  ),
  code(v) {
    return `import { Navbar } from '@crystal-design/navbar'

<Navbar${styleAttr({ gap: changed(this, v, 'gap') && (v.gap as number) })} aria-label="Main">
  <a href="/"><strong>${v.brand}</strong></a>
  <a href="/docs">Docs</a>
  <a href="/pricing">Pricing</a>
</Navbar>`
  },
}

import { GlassButton } from '@crystal-design/button-glass'
import { GlassIsland } from '@crystal-design/island-glass'
import { glassAttrs, glassControls, glassProps, type Entry } from '../entry'

export const entry: Entry = {
  id: 'island-glass',
  name: 'Glass Island',
  pkg: '@crystal-design/island-glass',
  category: 'Surfaces',
  description: 'A pill that morphs into a panel.',
  controls: [
    ...glassControls(28, 40),
    { key: 'expandOn', label: 'Expand on', type: 'select', options: ['click', 'hover'], value: 'click' },
  ],
  render: (v) => (
    <GlassIsland
      {...glassProps(v)}
      expandOn={v.expandOn as 'click' | 'hover'}
      pill={<span>&#9679; Recording 0:42</span>}
      aria-label="Recording"
    >
      <div style={{ display: 'grid', gap: 10 }}>
        <strong>Recording 0:42</strong>
        <div style={{ display: 'flex', gap: 8 }}>
          <GlassButton>Pause</GlassButton>
          <GlassButton>Stop</GlassButton>
        </div>
      </div>
    </GlassIsland>
  ),
  code: (v) => `import { GlassButton } from '@crystal-design/button-glass'
import { GlassIsland } from '@crystal-design/island-glass'

<GlassIsland${v.expandOn !== 'click' ? ` expandOn="${v.expandOn}"` : ''}${glassAttrs(entry, v)} pill={<span>&#9679; Recording 0:42</span>}>
  <strong>Recording 0:42</strong>
  <GlassButton>Pause</GlassButton>
  <GlassButton>Stop</GlassButton>
</GlassIsland>`,
}

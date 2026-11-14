import { GlassCard } from '@crystal-design/card-glass'
import { changed, glassAttrs, glassControls, glassProps, type Entry } from '../entry'

export const entry: Entry = {
  id: 'spotlight',
  name: 'Spotlight',
  pkg: '@crystal-design/spotlight',
  category: 'Effects',
  hover: true,
  description: 'Cursor-lit border and inner glow that follow the pointer across a surface.',
  controls: [
    { key: 'on', label: 'Spotlight', type: 'toggle', value: true },
    { key: 'color', label: 'Light color', type: 'color', value: '#bef4ff' },
    ...glassControls(18, 60),
  ],
  render: (v) => (
    <GlassCard
      {...glassProps(v)}
      spotlight={v.on ? (v.color as string) : false}
      style={{ width: 260, height: 140, display: 'grid', placeItems: 'center', padding: 16 }}
    >
      Move your cursor over me
    </GlassCard>
  ),
  code: (v) =>
    `import { GlassCard } from '@crystal-design/card-glass'

<GlassCard${glassAttrs(entry, v)}${
      !v.on ? '' : changed(entry, v, 'color') ? ` spotlight="${v.color}"` : ' spotlight'
    }>
  Move your cursor over me
</GlassCard>`,
}

import { GlassButton } from '@crystal-design/button-glass'
import { GlassTooltip } from '@crystal-design/tooltip-glass'
import { changed, type Entry } from '../entry'

export const entry: Entry = {
  id: 'tooltip-glass',
  name: 'Glass Tooltip',
  pkg: '@crystal-design/tooltip-glass',
  category: 'Overlays',
  hover: true,
  description: 'Glass tooltip with a warm window so neighbours show instantly.',
  controls: [
    { key: 'content', label: 'Content', type: 'text', value: 'Saved to library' },
    { key: 'side', label: 'Side', type: 'select', options: ['top', 'bottom', 'left', 'right'], value: 'top' },
    { key: 'delay', label: 'Delay (ms)', type: 'range', min: 0, max: 1500, value: 500 },
  ],
  render: (v) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <GlassTooltip content={v.content as string} side={v.side as 'top'} delay={v.delay as number}>
        <GlassButton>Hover me</GlassButton>
      </GlassTooltip>
      <GlassTooltip content="Another tip" side={v.side as 'top'} delay={v.delay as number}>
        <GlassButton>Then me</GlassButton>
      </GlassTooltip>
    </div>
  ),
  code: (v) => `import { GlassTooltip } from '@crystal-design/tooltip-glass'

<GlassTooltip content="${v.content}"${changed(entry, v, 'side') ? ` side="${v.side}"` : ''}${changed(entry, v, 'delay') ? ` delay={${v.delay}}` : ''}>
  <button>Hover me</button>
</GlassTooltip>`,
}

import { PulseEffect } from '@crystal-design/pulse-effect'
import { GlassSurface } from '@crystal-design/surface-glass'
import type { Entry } from '../entry'

type Mode = 'opacity' | 'scale' | 'glow'

export const entry: Entry = {
  id: 'pulse-effect',
  name: 'Pulse Effect',
  pkg: '@crystal-design/pulse-effect',
  category: 'Effects',
  description: 'A breathing opacity, scale or glow pulse for any element.',
  glass: false,
  controls: [
    { key: 'mode', label: 'Mode', type: 'select', options: ['opacity', 'scale', 'glow'], value: 'glow' },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 300, max: 3000, value: 1200 },
    { key: 'min', label: 'Min opacity (%)', type: 'range', min: 0, max: 100, value: 40 },
    { key: 'active', label: 'Active', type: 'toggle', value: true },
  ],
  render: (v) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', color: '#fff' }}>
      <PulseEffect active={v.active as boolean} mode={v.mode as Mode} duration={v.duration as number} min={(v.min as number) / 100} radius={20}>
        <GlassSurface radius={20} style={{ padding: '12px 20px' }}>
          Syncing
        </GlassSurface>
      </PulseEffect>
      <PulseEffect active={v.active as boolean} mode={v.mode as Mode} duration={v.duration as number} min={(v.min as number) / 100} radius={10}>
        <button className="btn">Syncing</button>
      </PulseEffect>
    </div>
  ),
  code: (v) => `import { PulseEffect } from '@crystal-design/pulse-effect'

<PulseEffect active={busy} mode="${v.mode}" duration={${v.duration}} min={${(v.min as number) / 100}}>
  <button>Syncing</button>
</PulseEffect>`,
}

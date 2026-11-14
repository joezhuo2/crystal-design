import { GlassButton } from '@crystal-design/button-glass'
import { GlassCard } from '@crystal-design/card-glass'
import { OrbitEffect } from '@crystal-design/orbit-effect'
import { changed, type Entry } from '../entry'

const Star = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" />
  </svg>
)

export const entry: Entry = {
  id: 'orbit-effect',
  name: 'Orbit Effect',
  pkg: '@crystal-design/orbit-effect',
  category: 'Effects',
  description: 'A bright highlight that orbits around the border of any element.',
  glass: false,
  controls: [
    { key: 'trigger', label: 'Trigger', type: 'select', options: ['always', 'hover'], value: 'always' },
    { key: 'color', label: 'Color', type: 'color', value: '#ffffff' },
    { key: 'speed', label: 'Seconds per lap', type: 'range', min: 1, max: 10, value: 4 },
    { key: 'thickness', label: 'Thickness', type: 'range', min: 1, max: 6, value: 2 },
  ],
  render: (v) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
      <OrbitEffect trigger={v.trigger as 'always' | 'hover'} color={v.color as string} speed={v.speed as number} thickness={v.thickness as number} radius={12}>
        <GlassButton>
          <Star />
          Glass
        </GlassButton>
      </OrbitEffect>
      <OrbitEffect trigger={v.trigger as 'always' | 'hover'} color={v.color as string} speed={v.speed as number} thickness={v.thickness as number} radius={8}>
        <button className="btn" style={{ borderRadius: 8 }}>
          <Star />
          Plain
        </button>
      </OrbitEffect>
      <OrbitEffect trigger={v.trigger as 'always' | 'hover'} color={v.color as string} speed={v.speed as number} thickness={v.thickness as number} radius={20}>
        <GlassCard radius={20} style={{ padding: '16px 22px' }}>
          Any card
        </GlassCard>
      </OrbitEffect>
    </div>
  ),
  code(v) {
    return `import { OrbitEffect } from '@crystal-design/orbit-effect'

<OrbitEffect${changed(this, v, 'trigger') ? `\n  trigger="${v.trigger}"` : ''}${changed(this, v, 'color') ? `\n  color="${v.color}"` : ''}${changed(this, v, 'speed') ? `\n  speed={${v.speed}}` : ''}${changed(this, v, 'thickness') ? `\n  thickness={${v.thickness}}` : ''}>
  <GlassButton>Go</GlassButton>
</OrbitEffect>`
  },
}

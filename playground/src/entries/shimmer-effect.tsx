import { GlassButton } from '@crystal-design/button-glass'
import { GlassCard } from '@crystal-design/card-glass'
import { ShimmerEffect } from '@crystal-design/shimmer-effect'
import { changed, type Entry } from '../entry'

const Star = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" />
  </svg>
)

export const entry: Entry = {
  id: 'shimmer-effect',
  name: 'Shimmer Effect',
  pkg: '@crystal-design/shimmer-effect',
  category: 'Effects',
  description: 'A diagonal band of light that sweeps across any element, clipped to its corners.',
  glass: false,
  controls: [
    { key: 'trigger', label: 'Trigger', type: 'select', options: ['loop', 'hover'], value: 'loop' },
    { key: 'color', label: 'Color', type: 'color', value: '#ffffff' },
    { key: 'duration', label: 'Sweep (s)', type: 'range', min: 1, max: 4, value: 1 },
    { key: 'delay', label: 'Pause (s)', type: 'range', min: 0, max: 6, value: 2 },
  ],
  render: (v) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
      <ShimmerEffect trigger={v.trigger as 'loop' | 'hover'} color={v.color as string} duration={v.duration as number} delay={v.delay as number} radius={12}>
        <GlassButton>
          <Star />
          Glass
        </GlassButton>
      </ShimmerEffect>
      <ShimmerEffect trigger={v.trigger as 'loop' | 'hover'} color={v.color as string} duration={v.duration as number} delay={v.delay as number} radius={8}>
        <button className="btn" style={{ borderRadius: 8 }}>
          <Star />
          Plain
        </button>
      </ShimmerEffect>
      <ShimmerEffect trigger={v.trigger as 'loop' | 'hover'} color={v.color as string} duration={v.duration as number} delay={v.delay as number} radius={20}>
        <GlassCard radius={20} style={{ padding: '16px 22px' }}>
          Any card
        </GlassCard>
      </ShimmerEffect>
    </div>
  ),
  code(v) {
    return `import { ShimmerEffect } from '@crystal-design/shimmer-effect'

<ShimmerEffect${changed(this, v, 'trigger') ? `\n  trigger="${v.trigger}"` : ''}${changed(this, v, 'color') ? `\n  color="${v.color}"` : ''}${changed(this, v, 'duration') ? `\n  duration={${v.duration}}` : ''}${changed(this, v, 'delay') ? `\n  delay={${v.delay}}` : ''}>
  <GlassButton>Go</GlassButton>
</ShimmerEffect>`
  },
}

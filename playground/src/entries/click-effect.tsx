import { GlassButton } from '@crystal-design/button-glass'
import { GlassCard } from '@crystal-design/card-glass'
import { ClickEffect, type ClickEffectName } from '@crystal-design/click-effect'
import { changed, type Entry } from '../entry'

const Star = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" />
  </svg>
)

export const entry: Entry = {
  id: 'click-effect',
  name: 'Click Effect',
  pkg: '@crystal-design/click-effect',
  category: 'Effects',
  description: 'Press scale that depends on element size, with a spring release and a click animation, around any element.',
  glass: false,
  controls: [
    { key: 'effect', label: 'Effect', type: 'select', options: ['pop', 'ring', 'shake', 'spin', 'jelly', 'none'], value: 'pop' },
  ],
  render: (v) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
      <ClickEffect effect={v.effect as ClickEffectName} radius={12}>
        <GlassButton>
          <Star />
          Glass
        </GlassButton>
      </ClickEffect>
      <ClickEffect effect={v.effect as ClickEffectName} radius={8}>
        <button className="btn" style={{ borderRadius: 8 }}>
          <Star />
          Plain
        </button>
      </ClickEffect>
      <ClickEffect effect={v.effect as ClickEffectName} radius={20}>
        <GlassCard radius={20} style={{ padding: '16px 22px' }}>
          Any card
        </GlassCard>
      </ClickEffect>
    </div>
  ),
  code(v) {
    return `import { ClickEffect, type ClickEffectName } from '@crystal-design/click-effect'

<ClickEffect${changed(this, v, 'effect') ? `\n  effect="${v.effect}"` : ''}>
  <GlassButton>Go</GlassButton>
</ClickEffect>`
  },
}

import { useState } from 'react'
import { FuseEffect } from '@crystal-design/fuse-effect'
import { GlassCard } from '@crystal-design/card-glass'
import { changed, type Entry, type Values } from '../entry'

function Demo({ v }: { v: Values }) {
  const [active, setActive] = useState(false)
  const [paused, setPaused] = useState(false)
  const common = {
    active,
    paused,
    duration: v.duration as number,
    variant: v.variant as 'outline' | 'bar',
    onEnd: () => setActive(false),
  }
  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 14 }}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <FuseEffect {...common}>
          <GlassCard radius={20} style={{ padding: '16px 22px' }}>
            Glass card
          </GlassCard>
        </FuseEffect>
        <FuseEffect {...common} radius={12}>
          <button className="btn">Plain button</button>
        </FuseEffect>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={() => { setPaused(false); setActive(false); requestAnimationFrame(() => setActive(true)) }}>
          Start
        </button>
        <button className="btn" onClick={() => setPaused((p) => !p)}>
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  )
}

export const entry: Entry = {
  id: 'fuse-effect',
  name: 'Fuse Effect',
  pkg: '@crystal-design/fuse-effect',
  category: 'Effects',
  description: 'Wrap any element to burn a fuse along its border or a bottom bar over a set duration.',
  glass: false,
  controls: [
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 1000, max: 10000, value: 4000 },
    { key: 'variant', label: 'Variant', type: 'select', options: ['outline', 'bar'], value: 'outline' },
  ],
  render: (v) => <Demo v={v} />,
  code(v) {
    const attrs = [
      changed(this, v, 'duration') && `\n  duration={${v.duration}}`,
      changed(this, v, 'variant') && `\n  variant="${v.variant}"`,
    ]
      .filter(Boolean)
      .join('')
    return `import { FuseEffect } from '@crystal-design/fuse-effect'

<FuseEffect
  active={armed}${attrs}
  onEnd={() => setArmed(false)}
>
  <button>Delete</button>
</FuseEffect>`
  },
}

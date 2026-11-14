import { SwapEffect } from '@crystal-design/swap-effect'
import { GlassSurface } from '@crystal-design/surface-glass'
import { useState } from 'react'
import type { Entry } from '../entry'

const WORDS = ['Copy', 'Copied to clipboard', 'Done', 'Try again']

function Demo({ duration, direction }: { duration: number; direction: 'up' | 'down' | 'none' }) {
  const [i, setI] = useState(0)
  const next = () => setI((n) => (n + 1) % WORDS.length)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: '#fff' }}>
      <GlassSurface radius={20} style={{ padding: '12px 20px', cursor: 'pointer' }} onClick={next}>
        <SwapEffect swapKey={i} duration={duration} direction={direction}>
          {WORDS[i]}
        </SwapEffect>
      </GlassSurface>
      <button className="btn" onClick={next}>
        <SwapEffect swapKey={i} duration={duration} direction={direction}>
          {WORDS[i]}
        </SwapEffect>
      </button>
    </div>
  )
}

export const entry: Entry = {
  id: 'swap-effect',
  name: 'Swap Effect',
  pkg: '@crystal-design/swap-effect',
  category: 'Effects',
  description: 'Swaps content with a blur, fade and slide while the width animates.',
  glass: false,
  controls: [
    { key: 'direction', label: 'Direction', type: 'select', options: ['up', 'down', 'none'], value: 'up' },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 100, max: 1000, value: 300 },
  ],
  render: (v) => <Demo duration={v.duration as number} direction={v.direction as 'up' | 'down' | 'none'} />,
  code: (v) => `import { SwapEffect } from '@crystal-design/swap-effect'

<SwapEffect swapKey={state} direction="${v.direction}" duration={${v.duration}}>
  {labels[state]}
</SwapEffect>`,
}

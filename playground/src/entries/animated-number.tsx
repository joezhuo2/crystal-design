import { useEffect, useState } from 'react'
import { AnimatedNumber } from '@crystalflux/animated-number'
import { changed, type Entry, type Values } from '../entry'

function Demo({ v }: { v: Values }) {
  const [value, setValue] = useState(v.value as number)
  useEffect(() => setValue(v.value as number), [v.value])
  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
      <AnimatedNumber value={value} duration={v.duration as number} style={{ fontSize: 56, fontWeight: 600 }} />
      <button className="btn" onClick={() => setValue(Math.round(Math.random() * 10000))}>
        Randomize
      </button>
    </div>
  )
}

export const entry: Entry = {
  id: 'animated-number',
  name: 'Animated Number',
  pkg: '@crystalflux/animated-number',
  category: 'Effects',
  description: 'Number that tweens to its new value and retargets smoothly when interrupted.',
  glass: false,
  controls: [
    { key: 'value', label: 'Value', type: 'range', min: 0, max: 10000, value: 1234 },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 100, max: 2000, value: 600 },
  ],
  render: (v) => <Demo v={v} />,
  code: (v) =>
    `import { AnimatedNumber } from '@crystalflux/animated-number'

<AnimatedNumber value={${v.value}}${changed(entry, v, 'duration') ? ` duration={${v.duration}}` : ''} />`,
}

import { useState } from 'react'
import { SmoothRange } from '@crystal-design/smooth-range'
import { changed, type Entry } from '../entry'

function Demo({ continuous, step }: { continuous: boolean; step: number }) {
  const [value, setValue] = useState(40)
  return (
    <div style={{ width: 'min(280px, 90%)', display: 'grid', gap: 8, color: '#fff', textAlign: 'center' }}>
      <SmoothRange
        aria-label="Value"
        min={0}
        max={100}
        step={step}
        value={value}
        continuous={continuous}
        onValue={setValue}
      />
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{Number.isInteger(value) ? value : value.toFixed(1)}</span>
    </div>
  )
}

export const entry: Entry = {
  id: 'smooth-range',
  name: 'Smooth Range',
  pkg: '@crystal-design/smooth-range',
  category: 'Inputs',
  description: 'A native range input whose value eases toward the clicked point instead of jumping.',
  glass: false,
  controls: [
    { key: 'step', label: 'Step', type: 'range', min: 1, max: 20, value: 1 },
    { key: 'continuous', label: 'Continuous', type: 'toggle', value: false },
  ],
  render: (v) => <Demo continuous={v.continuous as boolean} step={v.step as number} />,
  code(v) {
    const extra = [
      changed(this, v, 'step') ? `\n  step={${v.step}}` : '',
      v.continuous ? '\n  continuous' : '',
    ].join('')
    return `import { SmoothRange } from '@crystal-design/smooth-range'

<SmoothRange
  min={0}
  max={100}${extra}
  value={value}
  onValue={setValue}
/>`
  },
}

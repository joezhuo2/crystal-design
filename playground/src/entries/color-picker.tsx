import { useState } from 'react'
import { ColorPicker } from '@crystal-design/color-picker'
import type { Entry } from '../entry'

function Demo({ label, initial }: { label: string; initial: string }) {
  const [color, setColor] = useState(initial)
  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <ColorPicker label={label} value={color} onChange={setColor} />
      <code>{color}</code>
    </div>
  )
}

export const entry: Entry = {
  id: 'color-picker',
  name: 'Color Picker',
  pkg: '@crystal-design/color-picker',
  category: 'Inputs',
  description: 'Swatch button opening an HSV picker with hue slider, presets and hex input.',
  glass: false,
  controls: [
    { key: 'label', label: 'Label', type: 'text', value: 'Accent' },
    { key: 'initial', label: 'Initial color', type: 'color', value: '#a8e0ff' },
  ],
  render: (v) => <Demo key={v.initial as string} label={v.label as string} initial={v.initial as string} />,
  code: (v) => `import { ColorPicker } from '@crystal-design/color-picker'

const [color, setColor] = useState('${v.initial}')

<ColorPicker label="${v.label}" value={color} onChange={setColor} />`,
}

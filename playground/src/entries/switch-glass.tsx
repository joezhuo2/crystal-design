import { useState } from 'react'
import { GlassSwitch } from '@crystal-design/switch-glass'
import type { Entry, Values } from '../entry'

function Demo({ v }: { v: Values }) {
  const [on, setOn] = useState(true)
  const label = v.label as string
  const disabled = v.disabled as boolean
  return <GlassSwitch checked={on} onChange={setOn} disabled={disabled} label={label || undefined} />
}

export const entry: Entry = {
  id: 'switch-glass',
  name: 'Glass Switch',
  pkg: '@crystal-design/switch-glass',
  category: 'Inputs',
  description: 'Glass switch with a spring knob.',
  controls: [
    { key: 'label', label: 'Label', type: 'text', value: 'Notifications' },
    { key: 'disabled', label: 'Disabled', type: 'toggle', value: false },
  ],
  render: (v) => <Demo v={v} />,
  code: (v) => {
    const attrs = `${v.disabled ? ' disabled' : ''}${v.label ? ` label="${v.label}"` : ''}`
    return `import { GlassSwitch } from '@crystal-design/switch-glass'

<GlassSwitch checked={on} onChange={setOn}${attrs} />`
  },
}

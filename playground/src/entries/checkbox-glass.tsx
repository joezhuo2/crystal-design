import { useState } from 'react'
import { GlassCheckbox } from '@crystal-design/checkbox-glass'
import type { Entry, Values } from '../entry'

function Demo({ v }: { v: Values }) {
  const [checked, setChecked] = useState(true)
  const label = v.label as string
  const disabled = v.disabled as boolean
  return <GlassCheckbox checked={checked} onChange={setChecked} disabled={disabled} label={label || undefined} />
}

export const entry: Entry = {
  id: 'checkbox-glass',
  name: 'Glass Checkbox',
  pkg: '@crystal-design/checkbox-glass',
  category: 'Inputs',
  description: 'Glass checkbox that draws its check.',
  controls: [
    { key: 'label', label: 'Label', type: 'text', value: 'Notifications' },
    { key: 'disabled', label: 'Disabled', type: 'toggle', value: false },
  ],
  render: (v) => <Demo v={v} />,
  code: (v) => {
    const attrs = `${v.disabled ? ' disabled' : ''}${v.label ? ` label="${v.label}"` : ''}`
    return `import { GlassCheckbox } from '@crystal-design/checkbox-glass'

<GlassCheckbox checked={checked} onChange={setChecked}${attrs} />`
  },
}

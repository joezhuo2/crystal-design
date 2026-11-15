import { useState } from 'react'
import { Checkbox } from '@crystalflux/checkbox'
import type { Entry } from '../entry'

function Demo({ checked, disabled, label }: { checked: boolean; disabled: boolean; label: string }) {
  const [state, setState] = useState([true, false])
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <Checkbox key={String(checked)} defaultChecked={checked} disabled={disabled} label={label || undefined} aria-label={label ? undefined : 'Demo'} />
      {state.map((on, i) => (
        <Checkbox key={i} checked={on} onChange={(e) => setState(state.map((s, j) => (j === i ? e.target.checked : s)))} label={`Option ${i + 1}`} />
      ))}
    </div>
  )
}

export const entry: Entry = {
  id: 'checkbox',
  name: 'Checkbox',
  pkg: '@crystalflux/checkbox',
  category: 'Inputs',
  description: 'Native checkbox with a spring fill, drawn check mark and squish.',
  glass: false,
  controls: [
    { key: 'checked', label: 'Checked', type: 'toggle', value: false },
    { key: 'disabled', label: 'Disabled', type: 'toggle', value: false },
    { key: 'label', label: 'Label', type: 'text', value: 'Accept terms' },
  ],
  render: (v) => <Demo checked={v.checked as boolean} disabled={v.disabled as boolean} label={v.label as string} />,
  code(v) {
    const attrs = `${v.checked ? ' defaultChecked' : ''}${v.disabled ? ' disabled' : ''}${v.label ? ` label="${v.label}"` : ''}`
    return `import { Checkbox } from '@crystalflux/checkbox'

<Checkbox${attrs} />`
  },
}

import { useState } from 'react'
import { GlassSelect } from '@crystal-design/select-glass'
import { changed, type Entry } from '../entry'

const options = ['Apple', 'Banana', 'Cherry', 'Dragon fruit', 'Elderberry']

function SelectDemo({ placeholder, disabled }: { placeholder: string; disabled: boolean }) {
  const [value, setValue] = useState<string>()
  return (
    <GlassSelect
      aria-label="Fruit"
      options={options}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export const entry: Entry = {
  id: 'select-glass',
  name: 'Glass Select',
  pkg: '@crystal-design/select-glass',
  category: 'Inputs',
  description: 'Glass listbox with a gliding highlight and full keyboard support.',
  controls: [
    { key: 'placeholder', label: 'Placeholder', type: 'text', value: 'Pick a fruit' },
    { key: 'disabled', label: 'Disabled', type: 'toggle', value: false },
  ],
  render: (v) => <SelectDemo placeholder={v.placeholder as string} disabled={v.disabled as boolean} />,
  code: (v) => `import { GlassSelect } from '@crystal-design/select-glass'

<GlassSelect
  aria-label="Fruit"
  options={['Apple', 'Banana', 'Cherry']}
  value={value}
  onChange={setValue}${changed(entry, v, 'placeholder') ? `\n  placeholder="${v.placeholder}"` : ''}${v.disabled ? '\n  disabled' : ''}
/>`,
}

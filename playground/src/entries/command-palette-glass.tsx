import { useState } from 'react'
import { GlassButton } from '@crystal-design/button-glass'
import { GlassCommandPalette, type CommandItem } from '@crystal-design/command-palette-glass'
import type { Entry, Values } from '../entry'

const items: CommandItem[] = [
  { id: 'new', label: 'New file', hint: 'N', group: 'File', onSelect: () => {} },
  { id: 'open', label: 'Open file', hint: 'O', group: 'File', onSelect: () => {} },
  { id: 'save', label: 'Save', hint: 'S', group: 'File', keywords: ['write'], onSelect: () => {} },
  { id: 'theme', label: 'Toggle theme', group: 'View', keywords: ['dark', 'light'], onSelect: () => {} },
  { id: 'zoom', label: 'Zoom in', group: 'View', onSelect: () => {} },
  { id: 'help', label: 'Help', keywords: ['docs'], onSelect: () => {} },
]

function PaletteDemo({ v }: { v: Values }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <GlassButton onClick={() => setOpen(true)}>Open palette</GlassButton>
      <GlassCommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        placeholder={v.placeholder as string}
        hotkey={v.hotkey ? 'k' : false}
      />
    </>
  )
}

export const entry: Entry = {
  id: 'command-palette-glass',
  name: 'Glass Command Palette',
  pkg: '@crystal-design/command-palette-glass',
  category: 'Overlays',
  description: 'Searchable command list in a glass overlay, opened with Ctrl or Cmd K.',
  controls: [
    { key: 'placeholder', label: 'Placeholder', type: 'text', value: 'Type a command or search' },
    { key: 'hotkey', label: 'Ctrl/Cmd+K hotkey', type: 'toggle', value: false },
  ],
  render: (v) => <PaletteDemo v={v} />,
  code: (v) => `import { useState } from 'react'
import { GlassCommandPalette } from '@crystal-design/command-palette-glass'

const [open, setOpen] = useState(false)
const items = [
  { id: 'save', label: 'Save', group: 'File', hint: 'S', onSelect: save },
]

<GlassCommandPalette open={open} onOpenChange={setOpen} items={items}${
    v.placeholder !== 'Type a command or search' ? ` placeholder="${v.placeholder}"` : ''
  }${v.hotkey ? '' : ' hotkey={false}'} />`,
}

import { useState } from 'react'
import { TimedButton } from '@crystal-design/timed-button'
import { changed, type Entry, type Values } from '../entry'

function Demo({ v }: { v: Values }) {
  const [status, setStatus] = useState('Nothing archived yet')
  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
      <TimedButton
        className="btn"
        label="Archive"
        undoLabel="Undo"
        doneLabel="Archived"
        duration={v.duration as number}
        fuse={v.fuse as 'outline' | 'bar'}
        commitOn={v.commitOn as 'press' | 'end'}
        settle={v.settle as 'reset' | 'stay'}
        size={v.size as 'sm' | 'md' | 'lg'}
        pauseOnHover={v.pauseOnHover as boolean}
        onCommit={() => setStatus('Committed')}
        onUndo={() => setStatus('Undone')}
      />
      <span style={{ fontSize: 13, opacity: 0.8 }}>{status}</span>
    </div>
  )
}

export const entry: Entry = {
  id: 'timed-button',
  name: 'Timed Button',
  pkg: '@crystal-design/timed-button',
  category: 'Actions',
  description: 'An action button that arms an undo window with a burning fuse around its rim.',
  glass: false,
  controls: [
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 1000, max: 8000, value: 4000 },
    { key: 'fuse', label: 'Fuse', type: 'select', options: ['outline', 'bar'], value: 'outline' },
    { key: 'commitOn', label: 'Commit on', type: 'select', options: ['press', 'end'], value: 'press' },
    { key: 'settle', label: 'Settle', type: 'select', options: ['reset', 'stay'], value: 'reset' },
    { key: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], value: 'md' },
    { key: 'pauseOnHover', label: 'Pause on hover', type: 'toggle', value: true },
  ],
  render: (v) => <Demo v={v} />,
  code(v) {
    const attrs = [
      changed(this, v, 'duration') && `\n  duration={${v.duration}}`,
      changed(this, v, 'fuse') && `\n  fuse="${v.fuse}"`,
      changed(this, v, 'commitOn') && `\n  commitOn="${v.commitOn}"`,
      changed(this, v, 'settle') && `\n  settle="${v.settle}"`,
      changed(this, v, 'size') && `\n  size="${v.size}"`,
      changed(this, v, 'pauseOnHover') && `\n  pauseOnHover={${v.pauseOnHover}}`,
    ]
      .filter(Boolean)
      .join('')
    return `import { TimedButton } from '@crystal-design/timed-button'

<TimedButton
  label="Archive"
  undoLabel="Undo"
  doneLabel="Archived"${attrs}
  onCommit={() => archive(id)}
  onUndo={() => restore(id)}
/>`
  },
}

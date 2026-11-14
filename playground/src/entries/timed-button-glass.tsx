import { useState } from 'react'
import { GlassTimedButton } from '@crystal-design/timed-button-glass'
import { glassAttrs, glassControls, glassProps, type Entry, type Values } from '../entry'

function Demo({ v }: { v: Values }) {
  const [status, setStatus] = useState('Nothing archived yet')
  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
      <GlassTimedButton
        {...glassProps(v)}
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
      <span style={{ fontSize: 13, color: '#fff' }}>{status}</span>
    </div>
  )
}

export const entry: Entry = {
  id: 'timed-button-glass',
  name: 'Glass Timed Button',
  pkg: '@crystal-design/timed-button-glass',
  category: 'Actions',
  description: 'A glass action button that arms an undo window with a burning fuse around its rim.',
  controls: [
    ...glassControls(12, 30),
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 1000, max: 8000, value: 4000 },
    { key: 'fuse', label: 'Fuse', type: 'select', options: ['outline', 'bar'], value: 'outline' },
    { key: 'commitOn', label: 'Commit on', type: 'select', options: ['press', 'end'], value: 'press' },
    { key: 'settle', label: 'Settle', type: 'select', options: ['reset', 'stay'], value: 'reset' },
    { key: 'size', label: 'Size', type: 'select', options: ['sm', 'md', 'lg'], value: 'md' },
    { key: 'pauseOnHover', label: 'Pause on hover', type: 'toggle', value: true },
  ],
  render: (v) => <Demo v={v} />,
  code(v) {
    const changedAttr = (key: string, text: string) =>
      v[key] !== this.controls.find((control) => control.key === key)?.value ? `\n  ${text}` : ''
    const attrs = [
      changedAttr('duration', `duration={${v.duration}}`),
      changedAttr('fuse', `fuse="${v.fuse}"`),
      changedAttr('commitOn', `commitOn="${v.commitOn}"`),
      changedAttr('settle', `settle="${v.settle}"`),
      changedAttr('size', `size="${v.size}"`),
      changedAttr('pauseOnHover', `pauseOnHover={${v.pauseOnHover}}`),
    ].join('')
    return `import { GlassTimedButton } from '@crystal-design/timed-button-glass'

<GlassTimedButton${glassAttrs(entry, v)}
  label="Archive"
  undoLabel="Undo"
  doneLabel="Archived"${attrs}
  onCommit={() => archive(id)}
  onUndo={() => restore(id)}
/>`
  },
}

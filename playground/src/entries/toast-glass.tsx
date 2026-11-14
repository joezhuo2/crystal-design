import { useState } from 'react'
import { GlassButton } from '@crystal-design/button-glass'
import { GlassToaster, toast } from '@crystal-design/toast-glass'
import { changed, type Entry, type Values } from '../entry'

type Position = 'bottom-right' | 'bottom-center' | 'top-right' | 'top-center'

function ToastDemo({ v }: { v: Values }) {
  const [armed, setArmed] = useState(false)
  return (
    <>
      <GlassButton
        onClick={() => {
          setArmed(true)
          toast(v.message as string, {
            duration: v.duration as number,
            action: v.undo ? { label: 'Undo', onClick: () => toast('Undone') } : undefined,
          })
        }}
      >
        Show toast
      </GlassButton>
      {armed && <GlassToaster position={v.position as Position} max={v.max as number} />}
    </>
  )
}

export const entry: Entry = {
  id: 'toast-glass',
  name: 'Glass Toast',
  pkg: '@crystal-design/toast-glass',
  category: 'Feedback',
  description: 'Glass toasts with a border that burns down like a fuse.',
  controls: [
    { key: 'message', label: 'Message', type: 'text', value: 'Saved to library' },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 1000, max: 10000, value: 4000 },
    {
      key: 'position',
      label: 'Position',
      type: 'select',
      options: ['bottom-right', 'bottom-center', 'top-right', 'top-center'],
      value: 'bottom-right',
    },
    { key: 'max', label: 'Max visible', type: 'range', min: 1, max: 6, value: 3 },
    { key: 'undo', label: 'Undo action', type: 'toggle', value: false },
  ],
  render: (v) => <ToastDemo v={v} />,
  code: (v) => {
    const options = [
      changed(entry, v, 'duration') && `duration: ${v.duration}`,
      v.undo && `action: { label: 'Undo', onClick: undo }`,
    ].filter(Boolean)
    return `import { toast, GlassToaster } from '@crystal-design/toast-glass'

<GlassToaster${changed(entry, v, 'position') ? ` position="${v.position}"` : ''}${changed(entry, v, 'max') ? ` max={${v.max}}` : ''} />

toast('${v.message}'${options.length ? `, { ${options.join(', ')} }` : ''})`
  },
}

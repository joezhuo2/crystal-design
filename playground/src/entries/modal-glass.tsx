import { useState } from 'react'
import { GlassButton } from '@crystalflux/button-glass'
import { GlassDrawer, GlassModal } from '@crystalflux/modal-glass'
import { changed, glassAttrs, glassControls, glassProps, type Entry, type Values } from '../entry'

function ModalDemo({ v }: { v: Values }) {
  const [open, setOpen] = useState<'modal' | 'drawer' | null>(null)
  const close = () => setOpen(null)
  const title = v.title as string
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
      <GlassButton onClick={() => setOpen('modal')}>Open modal</GlassButton>
      <GlassButton onClick={() => setOpen('drawer')}>Open drawer</GlassButton>
      <GlassModal {...glassProps(v)} open={open === 'modal'} onClose={close} title={title}>
        <p style={{ margin: '0 0 20px' }}>Press Escape or click outside to close. Focus returns to the button.</p>
        <GlassButton onClick={close}>Done</GlassButton>
      </GlassModal>
      <GlassDrawer
        {...glassProps(v)}
        side={v.side as 'right' | 'left' | 'bottom'}
        open={open === 'drawer'}
        onClose={close}
        title={title}
      >
        <p style={{ margin: '0 0 20px' }}>A drawer slides in from the {v.side as string}.</p>
        <GlassButton onClick={close}>Done</GlassButton>
      </GlassDrawer>
    </div>
  )
}

export const entry: Entry = {
  id: 'modal-glass',
  name: 'Glass Modal',
  pkg: '@crystalflux/modal-glass',
  category: 'Overlays',
  description: 'Native dialog modal and drawer on a glass panel.',
  controls: [
    { key: 'title', label: 'Title', type: 'text', value: 'Hello' },
    { key: 'side', label: 'Drawer side', type: 'select', options: ['right', 'left', 'bottom'], value: 'right' },
    ...glassControls(20, 40),
  ],
  render: (v) => <ModalDemo v={v} />,
  code: (v) => `import { useState } from 'react'
import { GlassModal, GlassDrawer } from '@crystalflux/modal-glass'

const [open, setOpen] = useState(false)

<GlassModal${glassAttrs(entry, v)} open={open} onClose={() => setOpen(false)} title="${v.title}">
  Content
</GlassModal>

<GlassDrawer${changed(entry, v, 'side') ? ` side="${v.side}"` : ''}${glassAttrs(entry, v)} open={open} onClose={() => setOpen(false)} title="${v.title}">
  Content
</GlassDrawer>`,
}

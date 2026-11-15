import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { GlassButton } from '@crystalflux/button-glass'
import { place, useDismiss } from '@crystalflux/position'
import { changed, type Entry, type Values } from '../entry'

type Side = 'top' | 'bottom' | 'left' | 'right'
type Align = 'start' | 'center' | 'end'

function PositionDemo({ side, align }: { side: Side; align: Align }) {
  const trigger = useRef<HTMLSpanElement>(null)
  const popup = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number }>()

  useDismiss([trigger, popup], open, () => setOpen(false))

  useLayoutEffect(() => {
    if (!open || !trigger.current || !popup.current) return setPos(undefined)
    const { offsetWidth: width, offsetHeight: height } = popup.current
    setPos(place(trigger.current.getBoundingClientRect(), { width, height }, { side, align }))
  }, [open, side, align])

  return (
    <>
      <span ref={trigger} style={{ display: 'inline-flex' }}>
        <GlassButton onClick={() => setOpen(!open)} aria-expanded={open}>
          Toggle popup
        </GlassButton>
      </span>
      {open &&
        createPortal(
          <div
            ref={popup}
            style={{
              position: 'fixed',
              left: pos?.x ?? 0,
              top: pos?.y ?? 0,
              visibility: pos ? 'visible' : 'hidden',
              zIndex: 1000,
            }}
          >
            <GlassButton onClick={() => setOpen(false)}>Placed with place()</GlassButton>
          </div>,
          document.body,
        )}
    </>
  )
}

export const entry: Entry = {
  id: 'position',
  name: 'Position',
  pkg: '@crystalflux/position',
  category: 'Overlays',
  description: 'Popup placement that flips and clamps, plus a layered dismiss hook.',
  glass: false,
  controls: [
    { key: 'side', label: 'Side', type: 'select', options: ['bottom', 'top', 'left', 'right'], value: 'bottom' },
    { key: 'align', label: 'Align', type: 'select', options: ['start', 'center', 'end'], value: 'start' },
  ],
  render: (v: Values) => <PositionDemo side={v.side as Side} align={v.align as Align} />,
  code: (v) => `import { place, useDismiss } from '@crystalflux/position'

const { x, y, side } = place(trigger.getBoundingClientRect(), { width, height }, { ${[
    changed(entry, v, 'side') && `side: '${v.side}'`,
    changed(entry, v, 'align') && `align: '${v.align}'`,
  ]
    .filter(Boolean)
    .join(', ')} })

useDismiss([triggerRef, popupRef], open, () => setOpen(false))`,
}

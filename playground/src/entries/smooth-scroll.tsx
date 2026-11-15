import { useRef, type RefObject } from 'react'
import { useSmoothScroll } from '@crystalflux/smooth-scroll'
import { changed, type Entry } from '../entry'

function Smooth({ boxRef, ease }: { boxRef: RefObject<HTMLDivElement | null>; ease: number }) {
  useSmoothScroll(boxRef, ease)
  return null
}

function ScrollBox({ smooth, ease }: { smooth: boolean; ease: number }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <>
      {smooth && <Smooth boxRef={ref} ease={ease} />}
      <div
        ref={ref}
        style={{ boxSizing: 'border-box', height: 180, width: 'min(calc(100% - 32px), 360px)', overflow: 'auto', padding: 16, border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <p key={i} style={{ margin: '0 0 12px' }}>
            Line {i + 1}. Scroll the wheel over this box.
          </p>
        ))}
      </div>
    </>
  )
}

export const entry: Entry = {
  id: 'smooth-scroll',
  name: 'Smooth Scroll',
  pkg: '@crystalflux/smooth-scroll',
  category: 'Effects',
  description: 'Inertial wheel scrolling for the window or any scrollable element.',
  glass: false,
  controls: [
    { key: 'smooth', label: 'Smooth', type: 'toggle', value: true },
    { key: 'ease', label: 'Ease (%)', type: 'range', min: 2, max: 30, value: 8 },
  ],
  render: (v) => <ScrollBox smooth={v.smooth as boolean} ease={(v.ease as number) / 100} />,
  code(v) {
    const ease = changed(this, v, 'ease') ? `, ${(v.ease as number) / 100}` : ''
    return `import { useRef } from 'react'
import { useSmoothScroll } from '@crystalflux/smooth-scroll'

function Panel() {
  const ref = useRef<HTMLDivElement>(null)
  useSmoothScroll(ref${ease})
  return <div ref={ref} style={{ height: 220, overflow: 'auto' }}>...</div>
}`
  },
}

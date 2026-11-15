import { DrawEffect } from '@crystalflux/draw-effect'
import { GlassSurface } from '@crystalflux/surface-glass'
import { useEffect, useState } from 'react'
import type { Entry } from '../entry'

const Marks = ({ size }: { size: number }) => (
  <svg viewBox="0 0 48 24" width={size * 2} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 13l5 5 10-12" />
    <circle cx="30" cy="12" r="7" />
    <path d="M42 6v12" />
  </svg>
)

function Demo({ duration, stagger, mode }: { duration: number; stagger: number; mode: 'stroke' | 'wipe' }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
    const t = setInterval(() => setShow((s) => !s), 1800)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: '#fff' }}>
      <GlassSurface radius={20} style={{ padding: 16 }}>
        <DrawEffect show={show} duration={duration} stagger={stagger} mode={mode}>
          <Marks size={32} />
        </DrawEffect>
      </GlassSurface>
      <button className="btn" onClick={() => setShow((s) => !s)}>
        <DrawEffect show={show} duration={duration} stagger={stagger} mode={mode}>
          <Marks size={16} />
        </DrawEffect>
      </button>
    </div>
  )
}

export const entry: Entry = {
  id: 'draw-effect',
  name: 'Draw Effect',
  pkg: '@crystalflux/draw-effect',
  category: 'Effects',
  description: 'Draws any inline SVG in stroke by stroke, or wipes it in.',
  glass: false,
  controls: [
    { key: 'mode', label: 'Mode', type: 'select', options: ['stroke', 'wipe'], value: 'stroke' },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 100, max: 1500, value: 500 },
    { key: 'stagger', label: 'Stagger (ms)', type: 'range', min: 0, max: 400, value: 150 },
  ],
  render: (v) => <Demo duration={v.duration as number} stagger={v.stagger as number} mode={v.mode as 'stroke' | 'wipe'} />,
  code: (v) => `import { DrawEffect } from '@crystalflux/draw-effect'

<DrawEffect show={done} mode="${v.mode}" duration={${v.duration}} stagger={${v.stagger}}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
</DrawEffect>`,
}

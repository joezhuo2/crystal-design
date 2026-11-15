import { useState } from 'react'
import { PopEffect } from '@crystalflux/pop-effect'
import { GlassSurface } from '@crystalflux/surface-glass'
import { changed, type Entry } from '../entry'

type Props = { origin: string; scale: number; duration: number; exitDuration: number }

function Demo({ origin, scale, duration, exitDuration }: Props) {
  const [show, setShow] = useState(true)
  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
      <button className="btn" onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </button>
      <div style={{ display: 'flex', gap: 12, minHeight: 90 }}>
        <PopEffect show={show} origin={origin} scale={scale} duration={duration} exitDuration={exitDuration}>
          <GlassSurface radius={16} style={{ padding: '18px 22px' }}>
            Glass card
          </GlassSurface>
        </PopEffect>
        <PopEffect show={show} origin={origin} scale={scale} duration={duration} exitDuration={exitDuration}>
          <div style={{ padding: '18px 22px', borderRadius: 16, background: 'rgb(0 0 0 / 0.4)' }}>Plain card</div>
        </PopEffect>
      </div>
    </div>
  )
}

export const entry: Entry = {
  id: 'pop-effect',
  name: 'Pop Effect',
  pkg: '@crystalflux/pop-effect',
  category: 'Effects',
  description: 'Springy scale and fade entrance and exit for any element, unmounting after the exit plays.',
  glass: false,
  controls: [
    {
      key: 'origin',
      label: 'Origin',
      type: 'select',
      options: ['center', 'top left', 'top', 'top right', 'bottom left', 'bottom', 'bottom right'],
      value: 'center',
    },
    { key: 'scale', label: 'Start scale', type: 'range', min: 0, max: 100, value: 90 },
    { key: 'duration', label: 'Enter (ms)', type: 'range', min: 0, max: 1000, value: 260 },
    { key: 'exitDuration', label: 'Exit (ms)', type: 'range', min: 0, max: 1000, value: 160 },
  ],
  render: (v) => (
    <Demo
      origin={v.origin as string}
      scale={(v.scale as number) / 100}
      duration={v.duration as number}
      exitDuration={v.exitDuration as number}
    />
  ),
  code(v) {
    const props = [
      changed(this, v, 'origin') ? ` origin="${v.origin}"` : '',
      changed(this, v, 'scale') ? ` scale={${(v.scale as number) / 100}}` : '',
      changed(this, v, 'duration') ? ` duration={${v.duration}}` : '',
      changed(this, v, 'exitDuration') ? ` exitDuration={${v.exitDuration}}` : '',
    ].join('')
    return `import { PopEffect } from '@crystalflux/pop-effect'

<PopEffect show={open}${props}>
  <div>Anything</div>
</PopEffect>`
  },
}

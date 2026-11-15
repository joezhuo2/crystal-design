import { useState } from 'react'
import { FadeInEffect, type FadeInEffectProps } from '@crystalflux/fade-in-effect'
import { GlassSurface } from '@crystalflux/surface-glass'
import { changed, type Entry } from '../entry'

type Props = { from: FadeInEffectProps['from']; split: FadeInEffectProps['split']; stagger: number; duration: number }

function Demo({ from, split, stagger, duration }: Props) {
  const [run, setRun] = useState(0)
  const [show, setShow] = useState(true)
  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'start', maxWidth: 'calc(100% - 32px)' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={() => (setShow(true), setRun(run + 1))}>
          Replay
        </button>
        <button className="btn" onClick={() => setShow(!show)}>
          {show ? 'Exit' : 'Enter'}
        </button>
      </div>
      <FadeInEffect key={run} from={from} split={split} stagger={stagger} duration={duration} show={show} as="h2" style={{ margin: 0, fontSize: 26 }}>
        Text that fades in
      </FadeInEffect>
      <FadeInEffect key={`g${run}`} from={from} duration={duration} show={show} delay={150}>
        <GlassSurface radius={16} style={{ padding: '14px 20px' }}>
          Glass card
        </GlassSurface>
      </FadeInEffect>
    </div>
  )
}

export const entry: Entry = {
  id: 'fade-in-effect',
  name: 'Fade In Effect',
  pkg: '@crystalflux/fade-in-effect',
  category: 'Effects',
  description: 'Fades any element or text in from the bottom, top, a side or in place, optionally word by word.',
  glass: false,
  controls: [
    { key: 'from', label: 'From', type: 'select', options: ['bottom', 'top', 'left', 'right', 'none'], value: 'bottom' },
    { key: 'split', label: 'Split text', type: 'select', options: ['none', 'words', 'chars', 'lines'], value: 'words' },
    { key: 'stagger', label: 'Stagger (ms)', type: 'range', min: 0, max: 200, value: 60 },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 100, max: 2000, value: 600 },
  ],
  render: (v) => (
    <Demo
      from={v.from as Props['from']}
      split={v.split as Props['split']}
      stagger={v.stagger as number}
      duration={v.duration as number}
    />
  ),
  code(v) {
    const props = [
      changed(this, v, 'from') ? ` from="${v.from}"` : '',
      v.split !== 'none' ? ` split="${v.split}"` : '',
      v.split !== 'none' && changed(this, v, 'stagger') ? ` stagger={${v.stagger}}` : '',
      changed(this, v, 'duration') ? ` duration={${v.duration}}` : '',
    ].join('')
    return `import { FadeInEffect } from '@crystalflux/fade-in-effect'

<FadeInEffect${props}>
  Text that fades in
</FadeInEffect>`
  },
}

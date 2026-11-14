import { useState } from 'react'
import { GlitchText } from '@crystal-design/glitch-text'
import { changed, type Entry } from '../entry'

function Demo({ duration, intensity }: { duration: number; intensity: number }) {
  const [show, setShow] = useState(true)
  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
      <div style={{ fontSize: 40, fontWeight: 700, minHeight: 56 }}>
        <GlitchText show={show} duration={duration} intensity={intensity}>
          SIGNAL LOST
        </GlitchText>
      </div>
      <button className="btn" onClick={() => setShow((s) => !s)}>
        {show ? 'Glitch out' : 'Glitch in'}
      </button>
    </div>
  )
}

export const entry: Entry = {
  id: 'glitch-text',
  name: 'Glitch Text',
  pkg: '@crystal-design/glitch-text',
  category: 'Effects',
  description: 'Text that glitches in and out with RGB-split slices and a stepped displacement filter.',
  glass: false,
  controls: [
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 150, max: 1500, value: 450 },
    { key: 'intensity', label: 'Intensity (x10)', type: 'range', min: 2, max: 20, value: 10 },
  ],
  render: (v) => <Demo duration={v.duration as number} intensity={(v.intensity as number) / 10} />,
  code(v) {
    const dur = changed(this, v, 'duration') ? `\n  duration={${v.duration}}` : ''
    const int = changed(this, v, 'intensity') ? `\n  intensity={${(v.intensity as number) / 10}}` : ''
    return `import { GlitchText } from '@crystal-design/glitch-text'

<GlitchText
  show={show}${dur}${int}
  onExited={() => setMounted(false)}
>
  SIGNAL LOST
</GlitchText>`
  },
}

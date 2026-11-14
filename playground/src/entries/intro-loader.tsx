import { useState } from 'react'
import { IntroLoader } from '@crystal-design/intro-loader'
import { changed, type Entry } from '../entry'

const stages = ['mapping header', 'loading assets', 'allocating memory', 'warming up', 'ready']

function Demo({ duration, exitDuration }: { duration: number; exitDuration: number }) {
  const [run, setRun] = useState(0)
  const [active, setActive] = useState(true)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 220, overflow: 'hidden' }}>
      <button
        className="btn"
        style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        onClick={() => {
          setActive(true)
          setRun((n) => n + 1)
        }}
      >
        Replay
      </button>
      <IntroLoader
        key={run}
        show={active}
        stages={stages}
        duration={duration}
        exitDuration={exitDuration}
        onDone={() => setActive(false)}
      />
    </div>
  )
}

export const entry: Entry = {
  id: 'intro-loader',
  name: 'Intro Loader',
  pkg: '@crystal-design/intro-loader',
  category: 'Feedback',
  description: 'A boot-style loading overlay that steps through stages, then fades out.',
  glass: false,
  controls: [
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 600, max: 6000, value: 2400 },
    { key: 'exitDuration', label: 'Exit (ms)', type: 'range', min: 100, max: 1500, value: 600 },
  ],
  render: (v) => <Demo duration={v.duration as number} exitDuration={v.exitDuration as number} />,
  code(v) {
    const extra = [
      changed(this, v, 'duration') ? `\n  duration={${v.duration}}` : '',
      changed(this, v, 'exitDuration') ? `\n  exitDuration={${v.exitDuration}}` : '',
    ].join('')
    return `import { IntroLoader } from '@crystal-design/intro-loader'

<IntroLoader
  fixed
  stages={['mapping header', 'loading assets', 'ready']}${extra}
  onDone={() => setBooted(true)}
/>`
  },
}

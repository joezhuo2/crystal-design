import { useState } from 'react'
import { CollapseEffect } from '@crystal-design/collapse-effect'
import { GlassSurface } from '@crystal-design/surface-glass'
import { changed, type Entry } from '../entry'

function Demo({ duration }: { duration: number }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ display: 'grid', gap: 12, width: 300, maxWidth: 'calc(100% - 32px)', justifyItems: 'start' }}>
      <button className="btn" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      <GlassSurface radius={18} style={{ width: '100%' }}>
        <CollapseEffect open={open} duration={duration}>
          <p style={{ margin: 0, padding: 16 }}>A glass card whose body slides shut. Closed content is inert and hidden from assistive tech.</p>
        </CollapseEffect>
      </GlassSurface>
      <CollapseEffect open={open} duration={duration} style={{ width: '100%' }}>
        <p style={{ margin: 0, padding: 12, background: 'rgb(0 0 0 / 0.35)', borderRadius: 10 }}>Plain content works too.</p>
      </CollapseEffect>
    </div>
  )
}

export const entry: Entry = {
  id: 'collapse-effect',
  name: 'Collapse Effect',
  pkg: '@crystal-design/collapse-effect',
  category: 'Effects',
  description: 'Animates the height of any content open and closed, keeping it mounted but inert while closed.',
  glass: false,
  controls: [{ key: 'duration', label: 'Duration (ms)', type: 'range', min: 0, max: 1000, value: 300 }],
  render: (v) => <Demo duration={v.duration as number} />,
  code(v) {
    const duration = changed(this, v, 'duration') ? ` duration={${v.duration}}` : ''
    return `import { CollapseEffect } from '@crystal-design/collapse-effect'

<CollapseEffect open={open}${duration}>
  <p>Any content</p>
</CollapseEffect>`
  },
}

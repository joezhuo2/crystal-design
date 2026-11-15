import { useState } from 'react'
import { GlassCard } from '@crystalflux/card-glass'
import { MorphEffect, type MorphAnchor } from '@crystalflux/morph-effect'
import { changed, type Entry, type Values } from '../entry'

const panelStyle = {
  padding: 20,
  borderRadius: 18,
  background: 'var(--cd-raised, #111)',
  border: '1px solid var(--cd-line, rgb(255 255 255 / 0.2))',
}

function Demo({ v }: { v: Values }) {
  const [open, setOpen] = useState(false)
  const hover = v.trigger === 'hover'
  const body = (
    <div data-morph-content style={{ display: 'grid', gap: 6, width: 220 }}>
      <strong>Now playing</strong>
      <span style={{ opacity: 0.75 }}>Midnight City, M83</span>
      <span style={{ opacity: 0.6, fontSize: 13 }}>2:14 / 4:03</span>
    </div>
  )
  return (
    <div style={{ display: 'grid', gap: 14, justifyItems: 'center' }}>
      {!hover && (
        <button type="button" className="btn" aria-pressed={open} onClick={() => setOpen(!open)}>
          {open ? 'Collapse' : 'Expand'}
        </button>
      )}
      <MorphEffect
        open={!hover && open}
        trigger={hover ? 'hover' : 'controlled'}
        anchor={v.anchor as MorphAnchor}
        collapsed={{ width: 140, height: 36 }}
        duration={v.duration as number}
        collapsedContent={<span style={{ fontWeight: 600, fontSize: 14 }}>&#9679; Now playing</span>}
        aria-label="Now playing"
      >
        {v.panel === 'glass' ? <GlassCard style={{ padding: 20 }}>{body}</GlassCard> : <div style={panelStyle}>{body}</div>}
      </MorphEffect>
    </div>
  )
}

export const entry: Entry = {
  id: 'morph-effect',
  name: 'Morph Effect',
  pkg: '@crystalflux/morph-effect',
  category: 'Effects',
  description: 'Morphs any panel from a small pill into its full shape, clipping glass blur cleanly along the way.',
  glass: false,
  controls: [
    { key: 'panel', label: 'Panel', type: 'select', options: ['glass', 'themed'], value: 'glass' },
    { key: 'trigger', label: 'Trigger', type: 'select', options: ['controlled', 'hover'], value: 'controlled' },
    {
      key: 'anchor',
      label: 'Anchor',
      type: 'select',
      options: ['top', 'center', 'bottom', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      value: 'top',
    },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 150, max: 1200, value: 500 },
  ],
  render: (v) => <Demo v={v} />,
  code(v) {
    const hover = v.trigger === 'hover'
    const attrs = [
      hover ? 'trigger="hover"' : 'open={open}',
      'collapsed={{ width: 140, height: 36 }}',
      changed(this, v, 'anchor') && `anchor="${v.anchor}"`,
      changed(this, v, 'duration') && `duration={${v.duration}}`,
      'collapsedContent={<span>Now playing</span>}',
    ]
      .filter(Boolean)
      .map((attr) => `\n  ${attr}`)
      .join('')
    const panel = v.panel === 'glass' ? 'GlassCard' : 'div className="panel"'
    const close = v.panel === 'glass' ? 'GlassCard' : 'div'
    return `import { MorphEffect } from '@crystalflux/morph-effect'${v.panel === 'glass' ? "\nimport { GlassCard } from '@crystalflux/card-glass'" : ''}
${hover ? '' : '\nconst [open, setOpen] = useState(false)\n'}
<MorphEffect${attrs}
>
  <${panel}>
    <div data-morph-content>Midnight City, M83</div>
  </${close}>
</MorphEffect>`
  },
}

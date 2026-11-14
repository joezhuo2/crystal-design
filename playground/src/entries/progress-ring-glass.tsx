import { GlassProgressRing } from '@crystal-design/progress-ring-glass'
import { glassAttrs, glassProps, type Entry } from '../entry'

export const entry: Entry = {
  id: 'progress-ring-glass',
  name: 'Glass Progress Ring',
  pkg: '@crystal-design/progress-ring-glass',
  category: 'Feedback',
  description: 'A progress ring set on a round glass disc.',
  controls: [
    { key: 'value', label: 'Value (%)', type: 'range', min: 0, max: 100, value: 62 },
    { key: 'size', label: 'Size', type: 'range', min: 32, max: 160, value: 80 },
    { key: 'strength', label: 'Refraction', type: 'range', min: 0, max: 120, value: 30 },
    { key: 'bezel', label: 'Bezel', type: 'range', min: 4, max: 40, value: 20 },
    { key: 'pulse', label: 'Pulse when high', type: 'toggle', value: true },
  ],
  render: (v) => {
    const { strength, bezel } = glassProps(v)
    return (
      <GlassProgressRing
        strength={strength}
        bezel={bezel}
        value={v.value as number}
        max={100}
        size={v.size as number}
        pulse={v.pulse as boolean}
        aria-label="Usage"
      >
        {v.value}%
      </GlassProgressRing>
    )
  },
  code: (v) => `import { GlassProgressRing } from '@crystal-design/progress-ring-glass'

<GlassProgressRing${glassAttrs(entry, v)}
  value={${v.value}}
  max={100}${v.size !== 80 ? `\n  size={${v.size}}` : ''}${v.pulse ? '\n  pulse' : ''}
  aria-label="Usage"
>
  ${v.value}%
</GlassProgressRing>`,
}

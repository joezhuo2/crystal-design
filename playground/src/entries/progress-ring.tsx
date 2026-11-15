import { ProgressRing } from '@crystalflux/progress-ring'
import { changed, type Entry } from '../entry'

export const entry: Entry = {
  id: 'progress-ring',
  name: 'Progress Ring',
  pkg: '@crystalflux/progress-ring',
  category: 'Feedback',
  description: 'A circular progress ring that shifts colour at warn and high thresholds.',
  glass: false,
  controls: [
    { key: 'value', label: 'Value (%)', type: 'range', min: 0, max: 100, value: 62 },
    { key: 'size', label: 'Size', type: 'range', min: 32, max: 160, value: 96 },
    { key: 'thickness', label: 'Thickness', type: 'range', min: 2, max: 20, value: 8 },
    { key: 'pulse', label: 'Pulse when high', type: 'toggle', value: true },
  ],
  render: (v) => (
    <ProgressRing
      value={v.value as number}
      max={100}
      size={v.size as number}
      thickness={v.thickness as number}
      pulse={v.pulse as boolean}
      aria-label="Usage"
    >
      {v.value}%
    </ProgressRing>
  ),
  code(v) {
    const extra =
      (changed(this, v, 'size') ? `\n  size={${v.size}}` : '') +
      (changed(this, v, 'thickness') ? `\n  thickness={${v.thickness}}` : '') +
      (v.pulse ? '\n  pulse' : '')
    return `import { ProgressRing } from '@crystalflux/progress-ring'

<ProgressRing
  value={${v.value}}
  max={100}
  levels={{ warn: 0.7, high: 0.9 }}${extra}
  aria-label="Usage"
>
  ${v.value}%
</ProgressRing>`
  },
}

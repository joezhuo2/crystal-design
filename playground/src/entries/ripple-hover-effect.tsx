import { RippleHoverEffect } from '@crystal-design/ripple-hover-effect'
import { changed, type Entry } from '../entry'

export const entry: Entry = {
  id: 'ripple-hover-effect',
  name: 'Ripple Hover Effect',
  pkg: '@crystal-design/ripple-hover-effect',
  category: 'Effects',
  description: 'Text whose characters lift and swell around the pointer, with a wave travelling out from where it enters.',
  glass: false,
  controls: [
    { key: 'text', label: 'Text', type: 'text', value: 'Hover over these letters' },
    { key: 'radius', label: 'Radius', type: 'range', min: 20, max: 240, value: 90 },
    { key: 'lift', label: 'Lift (px)', type: 'range', min: 0, max: 40, value: 14 },
    { key: 'scale', label: 'Scale', type: 'range', min: 1, max: 2, value: 1.25 },
    { key: 'wave', label: 'Wave', type: 'toggle', value: true },
    { key: 'speed', label: 'Wave speed', type: 'range', min: 100, max: 2000, value: 700 },
  ],
  render: (v) => (
    <div style={{ fontSize: 40, fontWeight: 700, color: '#fff', textAlign: 'center', padding: 16 }}>
      <RippleHoverEffect
      text={v.text as string}
      radius={v.radius as number}
      lift={v.lift as number}
      scale={v.scale as number}
      wave={v.wave as boolean}
      speed={v.speed as number}
      />
    </div>
  ),
  code(v) {
    const props = (['radius', 'lift', 'scale', 'speed'] as const)
      .filter((k) => changed(this, v, k))
      .map((k) => `\n  ${k}={${v[k]}}`)
      .join('')
    const wave = v.wave ? '' : '\n  wave={false}'
    return `import { RippleHoverEffect } from '@crystal-design/ripple-hover-effect'

<RippleHoverEffect
  text="${v.text}"${props}${wave}
/>`
  },
}

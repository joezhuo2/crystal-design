import { Stardust } from '@crystal-design/stardust'
import { changed, type Entry } from '../entry'

export const entry: Entry = {
  id: 'stardust',
  name: 'Stardust',
  pkg: '@crystal-design/stardust',
  category: 'Effects',
  hover: true,
  description: 'Twinkling particle trail that follows the cursor inside a container or the whole window.',
  glass: false,
  controls: [
    { key: 'color', label: 'Color', type: 'color', value: '#bef4ff' },
    { key: 'size', label: 'Size', type: 'range', min: 1, max: 6, value: 2 },
    { key: 'density', label: 'Density', type: 'range', min: 1, max: 6, value: 2 },
    { key: 'lifetime', label: 'Lifetime (s)', type: 'range', min: 1, max: 4, value: 1 },
  ],
  render: (v) => (
    <Stardust
      color={v.color as string}
      size={v.size as number}
      density={v.density as number}
      lifetime={v.lifetime as number}
      style={{
        width: 'min(280px, calc(100% - 32px))',
        height: 160,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 12,
        border: '1px solid rgb(255 255 255 / 0.2)',
        overflow: 'hidden',
      }}
    >
      Move your cursor here
    </Stardust>
  ),
  code: (v) => {
    const attrs = ['color', 'size', 'density', 'lifetime']
      .filter((key) => changed(entry, v, key))
      .map((key) => ` ${key}=${typeof v[key] === 'number' ? `{${v[key]}}` : `"${v[key]}"`}`)
      .join('')
    return `import { Stardust } from '@crystal-design/stardust'

<Stardust${attrs}>
  Move your cursor here
</Stardust>`
  },
}

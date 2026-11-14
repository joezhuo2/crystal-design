import { Tooltip } from '@crystal-design/tooltip'
import { changed, type Entry } from '../entry'

export const entry: Entry = {
  id: 'tooltip',
  name: 'Tooltip',
  pkg: '@crystal-design/tooltip',
  category: 'Overlays',
  hover: true,
  description: 'CSS-only themed tooltip that shows on hover and focus.',
  glass: false,
  controls: [
    { key: 'content', label: 'Content', type: 'text', value: 'Save changes' },
    { key: 'side', label: 'Side', type: 'select', options: ['bottom', 'top'], value: 'bottom' },
    { key: 'align', label: 'Align', type: 'select', options: ['start', 'center', 'end'], value: 'center' },
  ],
  render: (v) => (
    <Tooltip content={v.content as string} side={v.side as 'top' | 'bottom'} align={v.align as 'start' | 'center' | 'end'}>
      <button type="button" className="btn">
        Hover me
      </button>
    </Tooltip>
  ),
  code(v) {
    const side = changed(this, v, 'side') ? ` side="${v.side}"` : ''
    const align = changed(this, v, 'align') ? ` align="${v.align}"` : ''
    return `import { Tooltip } from '@crystal-design/tooltip'

<Tooltip content="${v.content}"${side}${align}>
  <button>Hover me</button>
</Tooltip>`
  },
}

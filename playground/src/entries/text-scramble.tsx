import { TextScramble } from '@crystalflux/text-scramble'
import { changed, type Entry } from '../entry'

export const entry: Entry = {
  id: 'text-scramble',
  name: 'Text Scramble',
  pkg: '@crystalflux/text-scramble',
  category: 'Effects',
  description: 'Text that decodes into place left to right through look-alike glyphs.',
  glass: false,
  controls: [
    { key: 'text', label: 'Text', type: 'text', value: 'Decoding the signal' },
    { key: 'duration', label: 'Duration (ms)', type: 'range', min: 200, max: 3000, value: 900 },
    { key: 'trigger', label: 'Trigger', type: 'select', options: ['change', 'mount', 'hover'], value: 'change' },
  ],
  render: (v) => (
    <TextScramble
      key={v.trigger as string}
      text={v.text as string}
      duration={v.duration as number}
      trigger={v.trigger as 'change' | 'mount' | 'hover'}
      className="btn"
    />
  ),
  code(v) {
    const trig = changed(this, v, 'trigger') ? `\n  trigger="${v.trigger}"` : ''
    return `import { TextScramble } from '@crystalflux/text-scramble'

<TextScramble
  text="${v.text}"
  duration={${v.duration}}${trig}
/>`
  },
}

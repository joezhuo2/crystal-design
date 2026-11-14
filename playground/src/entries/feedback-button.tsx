import { FeedbackButton } from '@crystal-design/feedback-button'
import { changed, type Entry } from '../entry'

const Check = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

const SAMPLE = 'npm i @crystal-design/glass'

export const entry: Entry = {
  id: 'feedback-button',
  name: 'Feedback Button',
  pkg: '@crystal-design/feedback-button',
  category: 'Actions',
  description: 'A button that swaps to busy, done or error content while its action runs.',
  glass: false,
  controls: [
    { key: 'idle', label: 'Idle label', type: 'text', value: 'Copy' },
    { key: 'done', label: 'Done label', type: 'text', value: 'Copied' },
    { key: 'resetAfter', label: 'Reset after (ms)', type: 'range', min: 300, max: 4000, value: 1500 },
  ],
  render: (v) => (
    <FeedbackButton
      className="btn"
      action={() => navigator.clipboard.writeText(SAMPLE)}
      done={
        <>
          <Check />
          {v.done as string}
        </>
      }
      error="Copy failed"
      resetAfter={v.resetAfter as number}
    >
      {v.idle as string}
    </FeedbackButton>
  ),
  code(v) {
    const reset = changed(this, v, 'resetAfter') ? `\n  resetAfter={${v.resetAfter}}` : ''
    return `import { FeedbackButton } from '@crystal-design/feedback-button'

<FeedbackButton
  action={() => navigator.clipboard.writeText(text)}
  done="${v.done}"${reset}
>
  ${v.idle}
</FeedbackButton>`
  },
}

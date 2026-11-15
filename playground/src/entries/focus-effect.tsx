import { useState, type KeyboardEvent } from 'react'
import { GlassButton } from '@crystalflux/button-glass'
import { FocusEffect } from '@crystalflux/focus-effect'
import { changed, glassAttrs, glassControls, glassProps, type Entry, type Values } from '../entry'

const CHIPS = ['Docs', 'Components', 'Themes', 'Blog']

const motion = (v: Values) => ({
  swell: (v.swell as number) / 100,
  barge: v.barge as number,
  bounce: (v.bounce as number) / 100,
  stagger: v.stagger as number,
})

function Demo({ v }: { v: Values }) {
  const [power, setPower] = useState(0)
  const [chip, setChip] = useState<number | null>(null)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    const next = (power + step + 2) % 2
    setPower(next)
    ;(event.currentTarget.children[next] as HTMLElement).focus()
  }

  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
      <FocusEffect {...motion(v)} active={power} gap={12} role="radiogroup" aria-label="Power" onKeyDown={onKeyDown}>
        {['On', 'Off'].map((label, i) => (
          <GlassButton
            key={label}
            {...glassProps(v)}
            role="radio"
            aria-checked={power === i}
            tabIndex={power === i ? 0 : -1}
            onClick={() => setPower(i)}
          >
            {label}
          </GlassButton>
        ))}
      </FocusEffect>
      <FocusEffect {...motion(v)} active={chip}>
        {CHIPS.map((label, i) => (
          <button key={label} type="button" className="btn" aria-pressed={chip === i} onClick={() => setChip(chip === i ? null : i)}>
            {label}
          </button>
        ))}
      </FocusEffect>
    </div>
  )
}

export const entry: Entry = {
  id: 'focus-effect',
  name: 'Focus Effect',
  pkg: '@crystalflux/focus-effect',
  category: 'Effects',
  description: 'Jelly springs that swell the active item of any group and nudge its neighbours aside.',
  glass: true,
  controls: [
    ...glassControls(12, 30),
    { key: 'swell', label: 'Swell (%)', type: 'range', min: 0, max: 50, value: 20 },
    { key: 'barge', label: 'Barge (px)', type: 'range', min: 0, max: 24, value: 6 },
    { key: 'bounce', label: 'Bounce (%)', type: 'range', min: 0, max: 60, value: 25 },
    { key: 'stagger', label: 'Stagger (ms)', type: 'range', min: 0, max: 80, value: 22 },
  ],
  render: (v) => <Demo v={v} />,
  code(v) {
    const m = motion(v)
    const attrs = (['swell', 'barge', 'bounce', 'stagger'] as const)
      .filter((key) => changed(this, v, key))
      .map((key) => ` ${key}={${m[key]}}`)
      .join('')
    return `import { useState } from 'react'
import { GlassButton } from '@crystalflux/button-glass'
import { FocusEffect } from '@crystalflux/focus-effect'

const [power, setPower] = useState(0)

<FocusEffect active={power}${attrs} role="radiogroup" aria-label="Power">
  {['On', 'Off'].map((label, i) => (
    <GlassButton${glassAttrs(this, v)}
      key={label}
      role="radio"
      aria-checked={power === i}
      tabIndex={power === i ? 0 : -1}
      onClick={() => setPower(i)}
    >
      {label}
    </GlassButton>
  ))}
</FocusEffect>`
  },
}

import { useState } from 'react'
import { GlassTabs } from '@crystal-design/tabs-glass'
import { glassAttrs, glassControls, glassProps, type Entry, type Values } from '../entry'

function Demo({ v }: { v: Values }) {
  const [value, setValue] = useState('Overview')
  const items = ['Overview', 'Activity', 'Settings'].slice(0, v.count as number)
  const current = items.includes(value) ? value : items[0]
  return <GlassTabs {...glassProps(v)} items={items} value={current} onChange={setValue} aria-label="Demo" />
}

export const entry: Entry = {
  id: 'tabs-glass',
  name: 'Glass Tabs',
  pkg: '@crystal-design/tabs-glass',
  category: 'Navigation',
  description: 'Segmented tabs with a stretchy thumb that leads with its edge.',
  controls: [...glassControls(14, 30), { key: 'count', label: 'Tabs', type: 'range', min: 2, max: 3, value: 3 }],
  render: (v) => <Demo v={v} />,
  code: (v) => `import { useState } from 'react'
import { GlassTabs } from '@crystal-design/tabs-glass'

const [tab, setTab] = useState('Overview')

<GlassTabs${glassAttrs(entry, v)}
  items={[${['Overview', 'Activity', 'Settings'].slice(0, v.count as number).map((s) => `'${s}'`).join(', ')}]}
  value={tab}
  onChange={setTab}
  aria-label="Sections"
/>`,
}

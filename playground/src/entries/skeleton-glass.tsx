import { GlassCard } from '@crystal-design/card-glass'
import { GlassSkeleton } from '@crystal-design/skeleton-glass'
import { glassAttrs, glassControls, glassProps, type Entry } from '../entry'

export const entry: Entry = {
  id: 'skeleton-glass',
  name: 'Glass Skeleton',
  pkg: '@crystal-design/skeleton-glass',
  category: 'Feedback',
  description: 'Frosted placeholder blocks with a sweeping shimmer.',
  controls: glassControls(8, 40),
  render: (v) => {
    const g = glassProps(v)
    return (
      <GlassCard style={{ width: 280, display: 'grid', gap: 14 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <GlassSkeleton circle width={44} {...g} />
          <GlassSkeleton width="55%" height={14} {...g} />
        </div>
        <GlassSkeleton height={12} {...g} />
        <GlassSkeleton height={12} {...g} />
        <GlassSkeleton width="70%" height={12} {...g} />
      </GlassCard>
    )
  },
  code: (v) => `import { GlassSkeleton } from '@crystal-design/skeleton-glass'

<GlassSkeleton circle width={44}${glassAttrs(entry, v)} />
<GlassSkeleton height={12}${glassAttrs(entry, v)} />
<GlassSkeleton width="70%" height={12}${glassAttrs(entry, v)} />`,
}

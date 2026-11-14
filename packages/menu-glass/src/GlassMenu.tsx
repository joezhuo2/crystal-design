import { useRef, useState, type ReactNode } from 'react'
import { GlassSurface } from '@crystal-design/surface-glass'
import { MenuPanel, type GlassMenuItem } from './MenuPanel'
import styles from './GlassMenu.module.css'

export type GlassMenuProps = {
  trigger: ReactNode
  items: GlassMenuItem[]
  className?: string
  'aria-label'?: string
}

export function GlassMenu({ trigger, items, className, 'aria-label': ariaLabel }: GlassMenuProps) {
  const root = useRef<HTMLSpanElement>(null)
  const [anchor, setAnchor] = useState<DOMRect>()

  return (
    <>
      <span ref={root} className={styles.root}>
        <GlassSurface
          as="button"
          type="button"
          radius={12}
          aria-haspopup="menu"
          aria-expanded={!!anchor}
          aria-label={ariaLabel}
          className={[styles.trigger, className].filter(Boolean).join(' ')}
          onClick={() => setAnchor(anchor ? undefined : root.current!.getBoundingClientRect())}
        >
          {trigger}
        </GlassSurface>
      </span>
      {anchor && <MenuPanel items={items} anchor={anchor} ignore={[root]} onClose={() => setAnchor(undefined)} />}
    </>
  )
}

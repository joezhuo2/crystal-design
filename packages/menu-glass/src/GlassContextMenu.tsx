import { useState, type ComponentPropsWithoutRef } from 'react'
import { MenuPanel, type GlassMenuItem } from './MenuPanel'

export type GlassContextMenuProps = Omit<ComponentPropsWithoutRef<'div'>, 'onContextMenu'> & {
  items: GlassMenuItem[]
}

export function GlassContextMenu({ items, children, ...rest }: GlassContextMenuProps) {
  const [anchor, setAnchor] = useState<DOMRect>()

  return (
    <div
      {...rest}
      onContextMenu={(event) => {
        event.preventDefault()
        setAnchor(new DOMRect(event.clientX, event.clientY, 0, 0))
      }}
    >
      {children}
      {anchor && <MenuPanel items={items} anchor={anchor} gap={0} onClose={() => setAnchor(undefined)} />}
    </div>
  )
}

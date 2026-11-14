import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { collapsedSides, type MorphAnchor, type MorphInset, type MorphSize } from './morph'
import styles from './MorphEffect.module.css'

export type MorphEffectProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  open?: boolean
  collapsed?: MorphSize
  collapsedInset?: MorphInset
  anchor?: MorphAnchor
  radius?: number
  openRadius?: number
  duration?: number
  easing?: string
  trigger?: 'controlled' | 'hover'
  onOpenChange?: (open: boolean) => void
  collapsedContent?: ReactNode
  children?: ReactNode
}

export function MorphEffect({
  open = false,
  collapsed = { width: 120, height: 36 },
  collapsedInset,
  anchor = 'top',
  radius,
  openRadius = 18,
  duration,
  easing,
  trigger = 'controlled',
  onOpenChange,
  collapsedContent,
  className,
  style,
  children,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}: MorphEffectProps) {
  const [hovered, setHovered] = useState(false)
  const hover = trigger === 'hover'
  const shown = open || (hover && hovered)
  const sides = collapsedSides(collapsedInset ?? collapsed, anchor)

  const set = (next: boolean) => {
    if (!hover || next === hovered) return
    setHovered(next)
    onOpenChange?.(next)
  }

  return (
    <div
      className={[styles.morph, className].filter(Boolean).join(' ')}
      data-open={shown}
      tabIndex={hover ? 0 : undefined}
      style={
        {
          '--cd-morph-top': sides.top,
          '--cd-morph-right': sides.right,
          '--cd-morph-bottom': sides.bottom,
          '--cd-morph-left': sides.left,
          '--cd-morph-radius': `${radius ?? (collapsedInset ? 18 : collapsed.height / 2)}px`,
          '--cd-morph-open-radius': `${openRadius}px`,
          '--cd-morph-duration': duration === undefined ? undefined : `${duration}ms`,
          '--cd-morph-ease': easing,
          ...style,
        } as CSSProperties
      }
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (event.pointerType !== 'touch') set(true)
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        if (event.pointerType !== 'touch') set(false)
      }}
      onFocus={(event) => {
        onFocus?.(event)
        set(true)
      }}
      onBlur={(event) => {
        onBlur?.(event)
        if (!event.currentTarget.contains(event.relatedTarget)) set(false)
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.key !== 'Escape' || !hover) return
        event.currentTarget.focus()
        set(false)
      }}
      {...rest}
    >
      <div className={styles.content} inert={!shown}>
        {children}
      </div>
      {collapsedContent != null && (
        <div className={styles.pill} inert={shown}>
          {collapsedContent}
        </div>
      )}
    </div>
  )
}

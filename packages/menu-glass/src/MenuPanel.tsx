import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { GlassSurface } from '@crystalflux/surface-glass'
import { place, useDismiss, type Side } from '@crystalflux/position'
import styles from './GlassMenu.module.css'

export type GlassMenuItem = {
  label?: string
  onSelect?: () => void
  icon?: ReactNode
  danger?: boolean
  disabled?: boolean
  separator?: boolean
}

type Props = {
  items: GlassMenuItem[]
  anchor: DOMRect
  side?: Side
  gap?: number
  ignore?: RefObject<Element | null>[]
  onClose: () => void
}

export function MenuPanel({ items, anchor, side = 'bottom', gap = 6, ignore = [], onClose }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number; side: Side }>()

  useDismiss([box, ...ignore], true, onClose)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    return () => {
      const current = document.activeElement
      if (opener?.isConnected && (!current || current === document.body || box.current?.contains(current))) opener.focus()
    }
  }, [])

  useLayoutEffect(() => {
    if (!box.current) return
    const { offsetWidth: width, offsetHeight: height } = box.current
    setPos(place(anchor, { width, height }, { side, align: 'start', gap }))
  }, [anchor, side, gap])

  const enabled = () => [...(box.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? [])]

  useEffect(() => {
    if (pos) enabled()[0]?.focus()
  }, [!!pos])

  const glide = (el: HTMLElement) => {
    const g = pill.current
    if (!g) return
    g.style.transform = `translateY(${el.offsetTop}px)`
    g.style.height = `${el.offsetHeight}px`
    g.style.opacity = '1'
    if (!g.hasAttribute('data-glide')) requestAnimationFrame(() => g.setAttribute('data-glide', ''))
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const list = enabled()
    const at = list.indexOf(document.activeElement as HTMLElement)
    const go = (next: number) => {
      event.preventDefault()
      list[(next + list.length) % list.length]?.focus()
    }
    if (event.key === 'ArrowDown') go(at + 1)
    else if (event.key === 'ArrowUp') go(at < 0 ? -1 : at - 1)
    else if (event.key === 'Home') go(0)
    else if (event.key === 'End') go(-1)
    else if (event.key === 'Tab') {
      event.preventDefault()
      onClose()
    }
  }

  return createPortal(
    <div
      ref={box}
      className={styles.positioner}
      style={{ left: pos?.x ?? 0, top: pos?.y ?? 0, visibility: pos ? 'visible' : 'hidden' }}
    >
      <GlassSurface
        role="menu"
        radius={14}
        strength={24}
        bezel={14}
        className={styles.menu}
        data-side={pos?.side ?? side}
        onKeyDown={onKeyDown}
        onContextMenu={(event: MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
        }}
      >
        <span ref={pill} className={styles.pill} aria-hidden="true" />
        {items.map((item, index) =>
          item.separator ? (
            <div key={index} role="separator" className={styles.separator} />
          ) : (
            <button
              key={index}
              type="button"
              role="menuitem"
              tabIndex={-1}
              disabled={item.disabled}
              data-danger={item.danger || undefined}
              className={styles.item}
              onPointerMove={(event) => !item.disabled && glide(event.currentTarget)}
              onFocus={(event) => glide(event.currentTarget)}
              onClick={() => {
                item.onSelect?.()
                onClose()
              }}
            >
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          ),
        )}
      </GlassSurface>
    </div>,
    document.body,
  )
}

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { GlassSurface } from '@crystalflux/surface-glass'
import styles from './GlassCommandPalette.module.css'
import { filterItems, type CommandItem } from './filter'

export type { CommandItem }

export type GlassCommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CommandItem[]
  placeholder?: string
  hotkey?: string | false
}

export function GlassCommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = 'Type a command or search',
  hotkey = 'k',
}: GlassCommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const id = useId()
  const results = filterItems(items, query)

  useEffect(() => {
    if (!hotkey) return
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === hotkey.toLowerCase()) {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hotkey, open, onOpenChange])

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    return () => {
      setQuery('')
      setActive(0)
      if (opener instanceof HTMLElement) opener.focus()
    }
  }, [open])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, query])

  if (!open || typeof document === 'undefined') return null

  const select = (item?: CommandItem) => {
    if (!item) return
    onOpenChange(false)
    item.onSelect()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const count = results.length
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (count) setActive((active + (event.key === 'ArrowDown' ? 1 : -1) + count) % count)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      select(results[active])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onOpenChange(false)
    } else if (event.key === 'Tab') {
      event.preventDefault()
    }
  }

  const optionId = (item: CommandItem) => `${id}-${item.id}`

  return createPortal(
    <div
      className={styles.scrim}
      onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}
    >
      <GlassSurface radius={20} className={styles.panel} role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          autoFocus
          className={styles.input}
          role="combobox"
          aria-expanded="true"
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={results[active] ? optionId(results[active]) : undefined}
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
        />
        <ul ref={listRef} id={`${id}-list`} role="listbox" className={styles.list}>
          {results.map((item, index) => (
            <li key={item.id} role="presentation">
              {item.group && item.group !== results[index - 1]?.group && (
                <div className={styles.group}>{item.group}</div>
              )}
              <div
                id={optionId(item)}
                role="option"
                aria-selected={index === active}
                className={styles.option}
                onMouseMove={() => setActive(index)}
                onClick={() => select(item)}
              >
                <span>{item.label}</span>
                {item.hint && <span className={styles.hint}>{item.hint}</span>}
              </div>
            </li>
          ))}
          {!results.length && <li className={styles.empty}>No results</li>}
        </ul>
      </GlassSurface>
    </div>,
    document.body,
  )
}

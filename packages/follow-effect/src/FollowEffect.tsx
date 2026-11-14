import { useLayoutEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { place } from './follow'
import styles from './FollowEffect.module.css'

type OwnProps = {
  active?: number
  rest?: 'hide' | 'active'
  itemSelector?: string
  pillClassName?: string
}

export type FollowEffectProps<T extends ElementType = 'div'> = OwnProps & { as?: T } & Omit<
    ComponentPropsWithoutRef<T>,
    keyof OwnProps | 'as'
  >

export function FollowEffect<T extends ElementType = 'div'>({
  as,
  active,
  rest = 'hide',
  itemSelector,
  pillClassName,
  className,
  children,
  ...props
}: FollowEffectProps<T>) {
  const Tag: ElementType = as ?? 'div'
  const root = useRef<HTMLElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  const target = useRef<Element>(undefined)

  useLayoutEffect(() => {
    const el = root.current!
    const glow = pill.current!
    const items = () =>
      itemSelector ? [...el.querySelectorAll(itemSelector)] : [...el.children].filter((child) => child !== glow)
    const itemOf = (node: EventTarget | Element | null) =>
      node instanceof Node ? items().find((item) => item.contains(node)) : undefined

    const show = (item: Element | undefined) => {
      target.current = item
      if (!item) {
        glow.removeAttribute('data-show')
        glow.removeAttribute('data-glide')
        return
      }
      const { x, y, width, height } = place(item.getBoundingClientRect(), el.getBoundingClientRect(), el)
      glow.style.transform = `translate(${x}px, ${y}px)`
      glow.style.width = `${width}px`
      glow.style.height = `${height}px`
      glow.setAttribute('data-show', '')
      if (glow.hasAttribute('data-glide')) return
      glow.getBoundingClientRect()
      glow.setAttribute('data-glide', '')
    }
    const settle = () => {
      const focused = itemOf(el.querySelector(':focus-visible'))
      show(focused ?? (rest === 'active' && active !== undefined ? items()[active] : undefined))
    }

    const over = (event: Event) => {
      const item = itemOf(event.target)
      if (item) show(item)
    }
    const out = (event: FocusEvent) => {
      if (!el.contains(event.relatedTarget as Node | null) && !el.matches(':hover')) settle()
    }
    const resize = new ResizeObserver(() => (target.current?.isConnected ? show(target.current) : settle()))

    el.addEventListener('pointerover', over)
    el.addEventListener('focusin', over)
    el.addEventListener('pointerleave', settle)
    el.addEventListener('focusout', out)
    resize.observe(el)
    if (!el.matches(':hover')) settle()
    return () => {
      el.removeEventListener('pointerover', over)
      el.removeEventListener('focusin', over)
      el.removeEventListener('pointerleave', settle)
      el.removeEventListener('focusout', out)
      resize.disconnect()
    }
  }, [active, rest, itemSelector])

  return (
    <Tag ref={root} className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
      {children}
      <span ref={pill} aria-hidden="true" className={[styles.pill, pillClassName].filter(Boolean).join(' ')} />
    </Tag>
  )
}

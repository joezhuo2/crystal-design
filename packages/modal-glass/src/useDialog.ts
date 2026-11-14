import { useEffect, useRef } from 'react'

export function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null)
  const opener = useRef<Element | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) {
      el.removeAttribute('data-closing')
      if (!el.open) {
        opener.current = document.activeElement
        el.showModal()
      }
      return
    }
    if (!el.open) return
    el.setAttribute('data-closing', '')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(() => {
      el.close()
      el.removeAttribute('data-closing')
      if (opener.current instanceof HTMLElement) opener.current.focus()
    }, reduce ? 0 : 160)
    return () => clearTimeout(timer)
  }, [open])

  return ref
}

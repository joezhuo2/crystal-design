import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react'
import styles from './Sidebar.module.css'

export type SidebarProps = ComponentPropsWithoutRef<'nav'>

export type SidebarItemProps = {
  icon: ReactNode
  label: string
  href?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

export function Sidebar({ className, ...rest }: SidebarProps) {
  return <nav className={[styles.sidebar, className].filter(Boolean).join(' ')} {...rest} />
}

export function SidebarItem({ icon, label, href, active, onClick }: SidebarItemProps) {
  const content = (
    <>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.label}>{label}</span>
    </>
  )
  const current = active ? 'page' : undefined
  return href ? (
    <a className={styles.item} href={href} aria-current={current} onClick={onClick}>
      {content}
    </a>
  ) : (
    <button className={styles.item} type="button" aria-current={current} onClick={onClick}>
      {content}
    </button>
  )
}

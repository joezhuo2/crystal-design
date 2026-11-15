import { GlassSurface, type GlassSurfaceProps } from '@crystalflux/surface-glass'
import type { MouseEventHandler, ReactNode } from 'react'
import styles from './GlassSidebar.module.css'

export type GlassSidebarProps = Omit<GlassSurfaceProps<'nav'>, 'as'>

export type GlassSidebarItemProps = {
  icon: ReactNode
  label: string
  href?: string
  active?: boolean
  onClick?: MouseEventHandler<HTMLElement>
}

export function GlassSidebar({ radius = 12, className, ...rest }: GlassSidebarProps) {
  return (
    <GlassSurface
      as="nav"
      radius={radius}
      className={[styles.sidebar, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}

export function GlassSidebarItem({ icon, label, href, active, onClick }: GlassSidebarItemProps) {
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

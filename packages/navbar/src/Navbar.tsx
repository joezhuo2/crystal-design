import type { ComponentPropsWithoutRef } from 'react'
import styles from './Navbar.module.css'

export type NavbarProps = ComponentPropsWithoutRef<'nav'>

export function Navbar({ className, ...rest }: NavbarProps) {
  return <nav className={[styles.navbar, className].filter(Boolean).join(' ')} {...rest} />
}

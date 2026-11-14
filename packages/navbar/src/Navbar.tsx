import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/glass'
import styles from './Navbar.module.css'

export type NavbarProps = Omit<GlassSurfaceProps<'nav'>, 'as'>

export function Navbar({ radius = 8, className, ...rest }: NavbarProps) {
  return (
    <GlassSurface
      as="nav"
      radius={radius}
      className={[styles.navbar, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}

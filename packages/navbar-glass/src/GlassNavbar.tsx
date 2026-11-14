import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/surface-glass'
import styles from './GlassNavbar.module.css'

export type GlassNavbarProps = Omit<GlassSurfaceProps<'nav'>, 'as'>

export function GlassNavbar({ radius = 12, className, ...rest }: GlassNavbarProps) {
  return (
    <GlassSurface
      as="nav"
      radius={radius}
      className={[styles.navbar, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}

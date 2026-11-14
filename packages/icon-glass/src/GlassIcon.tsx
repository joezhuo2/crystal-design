import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/surface-glass'
import styles from './GlassIcon.module.css'

export type GlassIconProps = Omit<GlassSurfaceProps<'span'>, 'as' | 'mask'> & {
  src?: string
  size?: number
  label?: string
}

export function GlassIcon({ src, size = 56, label, radius = 12, className, style, ...rest }: GlassIconProps) {
  return (
    <GlassSurface
      as="span"
      mask={src}
      radius={radius}
      role={src || label ? 'img' : undefined}
      aria-label={label}
      className={[styles.icon, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  )
}

import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/glass'
import styles from './Icon.module.css'

export type IconProps = Omit<GlassSurfaceProps<'span'>, 'as' | 'mask'> & {
  src?: string
  size?: number
  label?: string
}

export function Icon({ src, size = 64, label, radius = Math.round(size * 0.28), className, style, ...rest }: IconProps) {
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

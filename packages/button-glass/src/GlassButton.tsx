import { GlassSurface, type GlassSurfaceProps } from '@crystalflux/surface-glass'
import styles from './GlassButton.module.css'

export type GlassButtonProps = Omit<GlassSurfaceProps<'button'>, 'as'>

export function GlassButton({ radius = 12, type = 'button', className, ...rest }: GlassButtonProps) {
  return (
    <GlassSurface
      as="button"
      radius={radius}
      type={type}
      className={[styles.button, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}

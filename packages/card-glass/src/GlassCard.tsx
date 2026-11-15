import { GlassSurface, type GlassSurfaceProps } from '@crystalflux/surface-glass'
import styles from './GlassCard.module.css'

export type GlassCardProps = Omit<GlassSurfaceProps<'div'>, 'as'>

export function GlassCard({ radius = 18, className, ...rest }: GlassCardProps) {
  return (
    <GlassSurface
      radius={radius}
      className={[styles.card, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}

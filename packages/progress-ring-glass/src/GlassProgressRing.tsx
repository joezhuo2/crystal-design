import { ProgressRing, type ProgressRingProps } from '@crystalflux/progress-ring'
import { GlassSurface, type GlassSurfaceProps } from '@crystalflux/surface-glass'
import styles from './GlassProgressRing.module.css'

export type GlassProgressRingProps = ProgressRingProps &
  Pick<GlassSurfaceProps, 'radius' | 'strength' | 'bezel' | 'spotlight'> & { padding?: number }

export function GlassProgressRing({
  size = 64,
  thickness = 6,
  padding = 12,
  radius,
  strength,
  bezel,
  spotlight,
  className,
  style,
  ...ring
}: GlassProgressRingProps) {
  const disc = size + padding * 2
  return (
    <GlassSurface
      radius={radius ?? disc / 2}
      strength={strength}
      bezel={bezel}
      spotlight={spotlight}
      className={[styles.disc, className].filter(Boolean).join(' ')}
      style={{ width: disc, height: disc, ...style }}
    >
      <ProgressRing size={size} thickness={thickness} {...ring} />
    </GlassSurface>
  )
}

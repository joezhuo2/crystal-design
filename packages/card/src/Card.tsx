import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/glass'
import styles from './Card.module.css'

export type CardProps = Omit<GlassSurfaceProps<'div'>, 'as'>

export function Card({ radius = 28, className, ...rest }: CardProps) {
  return (
    <GlassSurface
      radius={radius}
      className={[styles.card, className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}

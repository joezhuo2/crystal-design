import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/glass'
import styles from './Button.module.css'

export type ButtonProps = Omit<GlassSurfaceProps<'button'>, 'as'>

export function Button({ radius = 6, type = 'button', className, ...rest }: ButtonProps) {
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

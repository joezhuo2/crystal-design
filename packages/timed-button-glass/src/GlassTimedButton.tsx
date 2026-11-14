import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/surface-glass'
import { TimedButtonBase, type TimedButtonProps } from '@crystal-design/timed-button'

export type GlassTimedButtonProps = TimedButtonProps &
  Pick<GlassSurfaceProps<'button'>, 'radius' | 'strength' | 'bezel' | 'mask' | 'spotlight'>

export function GlassTimedButton({ radius = 12, ...rest }: GlassTimedButtonProps) {
  return <TimedButtonBase component={GlassSurface} as="button" radius={radius} {...rest} />
}

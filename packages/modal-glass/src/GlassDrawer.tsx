import { Dialog, type DialogProps } from './Dialog'
import styles from './Dialog.module.css'

export type GlassDrawerProps = DialogProps & { side?: 'right' | 'left' | 'bottom' }

export function GlassDrawer({ side = 'right', radius = 20, ...rest }: GlassDrawerProps) {
  return <Dialog radius={radius} side={side} panelClass={styles.drawer} {...rest} />
}

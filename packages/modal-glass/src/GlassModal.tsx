import { Dialog, type DialogProps } from './Dialog'
import styles from './Dialog.module.css'

export type GlassModalProps = DialogProps

export function GlassModal({ radius = 20, ...rest }: GlassModalProps) {
  return <Dialog radius={radius} panelClass={styles.modal} {...rest} />
}

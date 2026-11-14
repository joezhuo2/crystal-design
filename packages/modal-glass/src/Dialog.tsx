import { useId, type ReactNode } from 'react'
import { GlassSurface, type GlassSurfaceProps } from '@crystal-design/surface-glass'
import styles from './Dialog.module.css'
import { useDialog } from './useDialog'

export type DialogProps = Omit<GlassSurfaceProps<'div'>, 'as' | 'title'> & {
  open: boolean
  onClose: () => void
  title?: ReactNode
}

type Props = DialogProps & { side?: string; panelClass: string }

export function Dialog({ open, onClose, title, side, panelClass, className, children, ...rest }: Props) {
  const ref = useDialog(open)
  const titleId = useId()

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      data-side={side}
      aria-labelledby={title ? titleId : undefined}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClose={() => open && onClose()}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <GlassSurface className={[styles.panel, panelClass, className].filter(Boolean).join(' ')} {...rest}>
        <div className={styles.body}>
          {title && (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          )}
          {children}
        </div>
      </GlassSurface>
    </dialog>
  )
}

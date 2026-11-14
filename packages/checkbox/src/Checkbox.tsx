import type { ComponentProps, ReactNode } from 'react'
import styles from './Checkbox.module.css'

export type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
  label?: ReactNode
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  const input = <input {...rest} type="checkbox" className={[styles.box, className].filter(Boolean).join(' ')} />
  if (label === undefined) return input
  return (
    <label className={styles.label}>
      {input}
      <span>{label}</span>
    </label>
  )
}

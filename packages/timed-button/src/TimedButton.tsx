import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ElementType,
  type ReactNode,
} from 'react'
import styles from './TimedButton.module.css'
import { FuseEffect } from '@crystalflux/fuse-effect'
import { nextPhase, type Phase, type Settle } from './timer'

export type TimedButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  label?: ReactNode
  undoLabel?: ReactNode
  doneLabel?: ReactNode
  icon?: ReactNode
  undoIcon?: ReactNode
  duration?: number
  fuse?: 'outline' | 'bar'
  fuseColor?: string
  commitOn?: 'press' | 'end'
  settle?: Settle
  pauseOnHover?: boolean
  size?: 'sm' | 'md' | 'lg'
  onCommit?: () => void
  onUndo?: () => void
  onEnd?: () => void
  onPhaseChange?: (phase: Phase) => void
}

export type TimedButtonBaseProps = TimedButtonProps & {
  component?: ElementType
  [extra: string]: unknown
}

const Undo = () => (
  <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
  </svg>
)

const Tick = () => (
  <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export function TimedButtonBase({
  component: Tag = 'button',
  label = 'Archive',
  undoLabel = 'Undo',
  doneLabel = 'Archived',
  icon,
  undoIcon = <Undo />,
  duration = 4000,
  fuse = 'outline',
  fuseColor,
  commitOn = 'press',
  settle = 'reset',
  pauseOnHover = true,
  size = 'md',
  onCommit,
  onUndo,
  onEnd,
  onPhaseChange,
  className,
  disabled,
  style,
  type = 'button',
  ...rest
}: TimedButtonBaseProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const root = useRef<HTMLElement>(null)
  const [held, setHeld] = useState(false)
  const latest = useRef({ onCommit, onUndo, onEnd, onPhaseChange, commitOn, settle })
  latest.current = { onCommit, onUndo, onEnd, onPhaseChange, commitOn, settle }
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    latest.current.onPhaseChange?.(phase)
  }, [phase])

  useEffect(() => {
    if (phase !== 'armed') return
    const el = root.current
    const cancel = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      latest.current.onUndo?.()
      setPhase((p) => nextPhase(p, 'cancel'))
    }
    const sync = () => setHeld(!!el && (el.matches(':hover') || el.matches(':focus-visible')))
    el?.addEventListener('pointerenter', sync)
    el?.addEventListener('pointerleave', sync)
    el?.addEventListener('focus', sync)
    el?.addEventListener('blur', sync)
    document.addEventListener('keydown', cancel)
    sync()
    return () => {
      el?.removeEventListener('pointerenter', sync)
      el?.removeEventListener('pointerleave', sync)
      el?.removeEventListener('focus', sync)
      el?.removeEventListener('blur', sync)
      document.removeEventListener('keydown', cancel)
      setHeld(false)
    }
  }, [phase])

  const end = () => {
    if (latest.current.commitOn === 'end') latest.current.onCommit?.()
    latest.current.onEnd?.()
    setPhase((p) => nextPhase(p, 'end', latest.current.settle))
  }

  const click = () => {
    if (phase === 'armed') onUndo?.()
    if (phase === 'idle' && commitOn === 'press') onCommit?.()
    setPhase((p) => nextPhase(p, 'press'))
  }

  const face = (name: Phase, content: ReactNode, glyph?: ReactNode) => (
    <span className={styles.face} data-face={name} data-on={phase === name || undefined} aria-hidden={phase !== name}>
      {glyph && <span className={styles.icon}>{glyph}</span>}
      {content}
    </span>
  )

  const announce = phase === 'armed' ? undoLabel : phase === 'done' ? doneLabel : ''

  return (
    <Tag
      type={type}
      {...rest}
      ref={root}
      disabled={disabled}
      data-phase={phase}
      data-size={size}
      data-fuse={fuse}
      className={[styles.root, Tag === 'button' && styles.themed, className].filter(Boolean).join(' ')}
      style={{ ...(fuseColor && { '--tb-fuse': fuseColor }), ...(style as object) }}
      onClick={click}
    >
      <span className={styles.faces}>
        {face('idle', label, icon)}
        {face('armed', undoLabel, undoIcon)}
        {face('done', doneLabel, <Tick />)}
      </span>
      <FuseEffect
        className={styles.fuse}
        active={phase === 'armed'}
        duration={duration}
        variant={fuse}
        paused={pauseOnHover && held}
        onEnd={end}
      />
      <span className={styles.live} role="status" aria-live="polite">
        {announce}
      </span>
    </Tag>
  )
}

export function TimedButton(props: TimedButtonProps) {
  return <TimedButtonBase {...props} />
}

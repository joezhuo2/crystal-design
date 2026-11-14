import { useEffect, useRef, useState } from 'react'
import { initialPhase, phaseOnShow, type PresencePhase } from './presence'

export function usePresence(show: boolean, exitDuration: number, onExited?: () => void, appear = true): PresencePhase {
  const [phase, setPhase] = useState<PresencePhase>(() => initialPhase(show, appear))
  const exited = useRef(onExited)
  exited.current = onExited

  useEffect(() => {
    setPhase((current) => phaseOnShow(current, show))
  }, [show])

  useEffect(() => {
    if (phase !== 'exit') return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => {
      setPhase('gone')
      exited.current?.()
    }, reduced ? 0 : exitDuration)
    return () => window.clearTimeout(timer)
  }, [phase, exitDuration])

  return show && phase === 'gone' ? 'enter' : phase
}

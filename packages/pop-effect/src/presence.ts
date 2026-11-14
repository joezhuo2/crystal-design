export type PresencePhase = 'enter' | 'rest' | 'exit' | 'gone'

export const initialPhase = (show: boolean, appear: boolean): PresencePhase => (show ? (appear ? 'enter' : 'rest') : 'gone')

export const phaseOnShow = (phase: PresencePhase, show: boolean): PresencePhase => {
  if (show) return phase === 'gone' || phase === 'exit' ? 'enter' : phase
  return phase === 'gone' ? 'gone' : 'exit'
}

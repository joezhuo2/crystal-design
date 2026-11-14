export type Phase = 'idle' | 'armed' | 'done'

export type Settle = 'reset' | 'stay'

export type PhaseEvent = 'press' | 'cancel' | 'end'

export function nextPhase(phase: Phase, event: PhaseEvent, settle: Settle = 'reset'): Phase {
  if (phase === 'idle') return event === 'press' ? 'armed' : phase
  if (phase === 'armed') {
    if (event === 'cancel' || event === 'press') return 'idle'
    return settle === 'stay' ? 'done' : 'idle'
  }
  return event === 'press' ? 'idle' : phase
}

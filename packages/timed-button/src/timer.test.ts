import assert from 'node:assert/strict'
import test from 'node:test'
import { nextPhase } from './timer.ts'

test('phases follow press, cancel and end', () => {
  assert.equal(nextPhase('idle', 'press'), 'armed')
  assert.equal(nextPhase('armed', 'press'), 'idle')
  assert.equal(nextPhase('armed', 'cancel'), 'idle')
  assert.equal(nextPhase('armed', 'end'), 'idle')
  assert.equal(nextPhase('armed', 'end', 'stay'), 'done')
  assert.equal(nextPhase('done', 'press', 'stay'), 'idle')
  assert.equal(nextPhase('idle', 'end'), 'idle')
})

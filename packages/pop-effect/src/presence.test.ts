import assert from 'node:assert/strict'
import test from 'node:test'
import { initialPhase, phaseOnShow } from './presence.ts'

test('initial phase honours show and appear', () => {
  assert.equal(initialPhase(false, true), 'gone')
  assert.equal(initialPhase(true, true), 'enter')
  assert.equal(initialPhase(true, false), 'rest')
})

test('hiding exits, showing re-enters, settled states stay put', () => {
  assert.equal(phaseOnShow('rest', false), 'exit')
  assert.equal(phaseOnShow('enter', false), 'exit')
  assert.equal(phaseOnShow('gone', false), 'gone')
  assert.equal(phaseOnShow('gone', true), 'enter')
  assert.equal(phaseOnShow('exit', true), 'enter')
  assert.equal(phaseOnShow('rest', true), 'rest')
  assert.equal(phaseOnShow('enter', true), 'enter')
})

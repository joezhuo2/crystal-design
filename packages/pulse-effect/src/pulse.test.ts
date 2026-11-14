import assert from 'node:assert/strict'
import test from 'node:test'
import { clampMin, pulseScale } from './pulse.ts'

test('clampMin keeps opacity within 0..1', () => {
  assert.equal(clampMin(-1), 0)
  assert.equal(clampMin(0.4), 0.4)
  assert.equal(clampMin(3), 1)
})

test('pulseScale never goes negative', () => {
  assert.equal(pulseScale(-2), 0)
  assert.equal(pulseScale(1.05), 1.05)
})

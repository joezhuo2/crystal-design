import assert from 'node:assert/strict'
import test from 'node:test'
import { ringDash, ringFraction, ringLevel } from './ring.ts'

test('ringFraction clamps and guards bad input', () => {
  assert.equal(ringFraction(0.5, 1), 0.5)
  assert.equal(ringFraction(150, 100), 1)
  assert.equal(ringFraction(-5, 100), 0)
  assert.equal(ringFraction(NaN, 100), 0)
  assert.equal(ringFraction(5, 0), 0)
})

test('ringLevel thresholds', () => {
  assert.equal(ringLevel(0.69), 'ok')
  assert.equal(ringLevel(0.7), 'warn')
  assert.equal(ringLevel(0.9), 'high')
  assert.equal(ringLevel(0.95, { warn: 0.5 }), 'warn')
  assert.equal(ringLevel(1, {}), 'ok')
})

test('ringDash offset', () => {
  const full = ringDash(1, 10)
  assert.equal(full.offset, 0)
  assert.ok(Math.abs(full.circumference - 2 * Math.PI * 10) < 1e-9)
  assert.ok(Math.abs(ringDash(0.25, 10).offset - full.circumference * 0.75) < 1e-9)
  assert.equal(ringDash(2, 10).offset, 0)
})

import assert from 'node:assert/strict'
import test from 'node:test'
import { pressScale } from './pressScale.ts'

test('small elements squash more than large ones', () => {
  assert.ok(pressScale(24, 24) < pressScale(200, 48))
})

test('scale stays within bounds', () => {
  assert.equal(pressScale(0, 0), 0.9)
  assert.ok(pressScale(4000, 4000) < 1)
  assert.ok(pressScale(4000, 4000) > 0.99)
})

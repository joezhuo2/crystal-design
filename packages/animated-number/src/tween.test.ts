import assert from 'node:assert/strict'
import test from 'node:test'
import { easeOut, interpolate } from './tween.ts'

test('easeOut endpoints and ease-out shape', () => {
  assert.equal(easeOut(0), 0)
  assert.equal(easeOut(1), 1)
  assert.ok(easeOut(0.5) > 0.5)
})

test('interpolate clamps and moves between values', () => {
  assert.equal(interpolate(10, 20, 0), 10)
  assert.equal(interpolate(10, 20, 1), 20)
  assert.equal(interpolate(10, 20, 2), 20)
  assert.equal(interpolate(20, 10, -1), 20)
})

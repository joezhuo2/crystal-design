import assert from 'node:assert/strict'
import test from 'node:test'
import { displacement, envelope, frameOf, slice } from './glitch.ts'

test('frames step every 40ms', () => {
  assert.equal(frameOf(39), 0)
  assert.equal(frameOf(40), 1)
})

test('envelope runs down on enter and up on exit', () => {
  assert.equal(envelope(0, 400, true).glitch, 1)
  assert.equal(envelope(400, 400, true).glitch, 0)
  assert.equal(envelope(0, 400, false).glitch, 0)
  assert.equal(envelope(999, 400, false).glitch, 1)
})

test('slice and displacement are deterministic and bounded', () => {
  assert.deepEqual(slice(7, 0, 1, 1), slice(7, 0, 1, 1))
  assert.notDeepEqual(slice(7, 0, 1, 1), slice(8, 0, 1, 1))
  for (let s = 0; s < 50; s++) {
    const sl = slice(s, 1, 1, 1)
    assert.ok(sl.top >= 0 && sl.bottom >= 0 && sl.top + sl.bottom <= 100)
  }
  assert.equal(displacement(3, 0, 1), 0)
  assert.ok(displacement(3, 1, 1) > 0)
})

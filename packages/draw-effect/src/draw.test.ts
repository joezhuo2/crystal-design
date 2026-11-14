import assert from 'node:assert/strict'
import test from 'node:test'
import { drawDelay } from './draw.ts'

test('drawDelay staggers by index and clamps negatives', () => {
  assert.equal(drawDelay(0, 100, 50), 100)
  assert.equal(drawDelay(3, 100, 50), 250)
  assert.equal(drawDelay(2, -10, -5), 0)
})

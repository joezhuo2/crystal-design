import assert from 'node:assert/strict'
import test from 'node:test'
import { encodeMaps } from './maps.ts'

test('bends inward at the edge and stays neutral in the middle', () => {
  const w = 9
  const h = 3
  const rgba = new Uint8ClampedArray(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) rgba[(y * w + x) * 4 + 3] = Math.min(255, x * 64)
  }

  const { map, rim } = encodeMaps(rgba, w, h, 4)
  const edge = (w + 1) * 4
  const middle = (w + 6) * 4

  assert.ok(map[edge] > 128)
  assert.equal(map[edge + 1], 128)
  assert.equal(map[middle], 128)
  assert.equal(map[middle + 1], 128)
  assert.equal(rim[middle + 3], 0)
})

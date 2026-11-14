import assert from 'node:assert/strict'
import test from 'node:test'
import { encodeMap, encodeRim } from './maps.ts'

const w = 9
const h = 3
const at = (x: number) => (w + x) * 4
const mask = (alpha: (x: number) => number) => {
  const rgba = new Uint8ClampedArray(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) rgba[(y * w + x) * 4 + 3] = alpha(x)
  }
  return rgba
}

test('map bends inward at the edge and stays neutral in the middle', () => {
  const map = encodeMap(mask((x) => Math.min(255, x * 64)), w, h, 4)

  assert.ok(map[at(1)] > 128)
  assert.equal(map[at(1) + 1], 128)
  assert.equal(map[at(6)], 128)
  assert.equal(map[at(6) + 1], 128)
})

test('rim is drawn only on the edge', () => {
  const rim = encodeRim(mask((x) => (x < 2 ? 0 : 255)), w, h, 1)

  assert.ok(rim[at(2) + 3] > 0)
  assert.equal(rim[at(6) + 3], 0)
})

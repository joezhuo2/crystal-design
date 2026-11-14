import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hexToHsv, hsvToHex, isHex } from './color.ts'

test('hex survives a round trip through hsv', () => {
  for (const hex of ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#a8e0ff', '#6c4dff', '#808080']) {
    assert.equal(hsvToHex(hexToHsv(hex)), hex)
  }
})

test('hsv of pure colors', () => {
  assert.deepEqual(hexToHsv('#ff0000'), { h: 0, s: 1, v: 1 })
  assert.equal(hexToHsv('#0000ff').h, 240)
})

test('isHex accepts only six digit hex', () => {
  assert.ok(isHex('#A8e0ff'))
  assert.ok(!isHex('#fff'))
  assert.ok(!isHex('a8e0ff'))
})

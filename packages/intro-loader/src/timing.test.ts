import assert from 'node:assert/strict'
import test from 'node:test'
import { percentText, progressAt, randomHex, stageIndex } from './timing.ts'

test('progressAt eases from 0 to 1 and clamps', () => {
  assert.equal(progressAt(0, 1000), 0)
  assert.equal(progressAt(1000, 1000), 1)
  assert.equal(progressAt(5000, 1000), 1)
  assert.ok(progressAt(500, 1000) > 0.5)
  assert.equal(progressAt(0, 0), 1)
})

test('stageIndex maps progress onto stages', () => {
  assert.equal(stageIndex(0, 4), 0)
  assert.equal(stageIndex(0.26, 4), 1)
  assert.equal(stageIndex(1, 4), 3)
  assert.equal(stageIndex(0.5, 0), 0)
})

test('percentText pads to three digits', () => {
  assert.equal(percentText(0), '000%')
  assert.equal(percentText(0.07), '007%')
  assert.equal(percentText(1), '100%')
})

test('randomHex has 0x prefix and fixed length', () => {
  assert.match(randomHex(), /^0x[0-9a-f]{16}$/)
  assert.equal(randomHex(() => 0, 4), '0x0000')
  assert.equal(randomHex(() => 0.999, 2), '0xff')
})

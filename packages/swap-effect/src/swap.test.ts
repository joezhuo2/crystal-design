import assert from 'node:assert/strict'
import test from 'node:test'
import { swapOffsets } from './swap.ts'

test('swapOffsets mirrors enter and leave by direction', () => {
  assert.deepEqual(swapOffsets('up', 6), { enter: 6, leave: -6 })
  assert.deepEqual(swapOffsets('down', 6), { enter: -6, leave: 6 })
  assert.equal(swapOffsets('none', 6).enter + 0, 0)
  assert.equal(swapOffsets('none', 6).leave + 0, 0)
})

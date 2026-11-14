import assert from 'node:assert/strict'
import test from 'node:test'
import { edges, forward, same } from './glide.ts'

const frame = { offsetWidth: 200, clientLeft: 1, clientTop: 1, clientWidth: 198, clientHeight: 38, scrollLeft: 0, scrollTop: 0 }
const rect = { left: 100, top: 50, right: 300, bottom: 90 }

test('edges are insets from the padding box', () => {
  assert.deepEqual(edges({ left: 111, top: 55, right: 161, bottom: 85 }, rect, frame), { left: 10, top: 4, right: 138, bottom: 4 })
})

test('edges undo a scale transform and add scroll', () => {
  const scaled = { left: 100, top: 50, right: 200, bottom: 70 }
  const box = edges({ left: 105.5, top: 52.5, right: 130.5, bottom: 67.5 }, scaled, { ...frame, scrollLeft: 20 })
  assert.deepEqual(box, { left: 30, top: 4, right: 118, bottom: 4 })
})

test('forward follows the moving direction on each axis', () => {
  const a = { left: 0, top: 0, right: 100, bottom: 0 }
  const b = { left: 50, top: 0, right: 50, bottom: 0 }
  assert.equal(forward(undefined, a, false), true)
  assert.equal(forward(a, b, false), true)
  assert.equal(forward(b, a, false), false)
  assert.equal(forward({ left: 0, top: 0, right: 0, bottom: 40 }, { left: 0, top: 40, right: 0, bottom: 0 }, true), true)
  assert.equal(forward({ left: 0, top: 40, right: 0, bottom: 0 }, { left: 0, top: 0, right: 0, bottom: 40 }, true), false)
})

test('same compares all edges', () => {
  const a = { left: 1, top: 2, right: 3, bottom: 4 }
  assert.equal(same(undefined, a), false)
  assert.equal(same(a, { ...a }), true)
  assert.equal(same(a, { ...a, bottom: 5 }), false)
})

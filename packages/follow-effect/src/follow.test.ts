import assert from 'node:assert/strict'
import test from 'node:test'
import { place } from './follow.ts'

const frame = { offsetWidth: 200, clientLeft: 1, clientTop: 1, scrollLeft: 0, scrollTop: 0 }

test('place gives the item box in padding-box coordinates', () => {
  const rect = { left: 100, top: 50, right: 300, bottom: 250 }
  assert.deepEqual(place({ left: 111, top: 91, right: 211, bottom: 123 }, rect, frame), { x: 10, y: 40, width: 100, height: 32 })
})

test('place undoes a scale transform and adds scroll', () => {
  const rect = { left: 100, top: 50, right: 200, bottom: 150 }
  const box = place({ left: 105.5, top: 60.5, right: 130.5, bottom: 70.5 }, rect, { ...frame, scrollTop: 30 })
  assert.deepEqual(box, { x: 10, y: 50, width: 50, height: 20 })
})

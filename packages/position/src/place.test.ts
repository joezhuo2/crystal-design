import assert from 'node:assert/strict'
import test from 'node:test'
import { place } from './place.ts'

const viewport = { width: 800, height: 600 }
const rect = (left: number, top: number, width: number, height: number) =>
  ({ left, top, width, height, right: left + width, bottom: top + height }) as DOMRect
const popup = { width: 100, height: 80 }

test('places below and aligns to start', () => {
  const r = place(rect(100, 100, 60, 30), popup, { viewport })
  assert.deepEqual(r, { x: 100, y: 138, side: 'bottom' })
})

test('centers and ends', () => {
  assert.equal(place(rect(100, 100, 60, 30), popup, { viewport, align: 'center' }).x, 80)
  assert.equal(place(rect(100, 100, 60, 30), popup, { viewport, align: 'end' }).x, 60)
})

test('flips to top when bottom does not fit', () => {
  const r = place(rect(100, 540, 60, 30), popup, { viewport })
  assert.equal(r.side, 'top')
  assert.equal(r.y, 540 - 8 - 80)
})

test('stays when neither side fits better', () => {
  assert.equal(place(rect(100, 10, 60, 30), popup, { viewport, side: 'top' }).side, 'bottom')
})

test('clamps to viewport', () => {
  const r = place(rect(780, 100, 20, 30), popup, { viewport })
  assert.equal(r.x, 800 - 8 - 100)
})

test('left and right sides, flipping', () => {
  assert.equal(place(rect(300, 100, 60, 30), popup, { viewport, side: 'right' }).x, 368)
  assert.equal(place(rect(20, 100, 60, 30), popup, { viewport, side: 'left' }).side, 'right')
})

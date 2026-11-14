import assert from 'node:assert/strict'
import test from 'node:test'
import { easeOutQuart, glideValue, percentOf, snap } from './tween.ts'

test('easeOutQuart endpoints and ease-out shape', () => {
  assert.equal(easeOutQuart(0), 0)
  assert.equal(easeOutQuart(1), 1)
  assert.equal(easeOutQuart(2), 1)
  assert.ok(easeOutQuart(0.5) > 0.5)
})

test('glideValue moves from to and handles zero duration', () => {
  assert.equal(glideValue(10, 20, 0, 300), 10)
  assert.equal(glideValue(10, 20, 300, 300), 20)
  assert.equal(glideValue(20, 10, 300, 300), 10)
  assert.equal(glideValue(10, 20, 0, 0), 20)
})

test('snap rounds to step unless continuous', () => {
  assert.equal(snap(3.4, 0, 1, false), 3)
  assert.equal(snap(3.4, 0, 1, true), 3.4)
  assert.equal(snap(7, 2, 5, false), 7)
  assert.equal(snap(3.4, 0, 0, false), 3.4)
})

test('percentOf clamps and handles empty range', () => {
  assert.equal(percentOf(5, 0, 10), 50)
  assert.equal(percentOf(15, 0, 10), 100)
  assert.equal(percentOf(1, 1, 1), 0)
})

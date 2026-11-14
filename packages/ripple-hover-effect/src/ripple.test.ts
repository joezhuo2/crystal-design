import assert from 'node:assert/strict'
import test from 'node:test'
import { atRest, falloff, stepSpring, waveAt } from './ripple.ts'

test('falloff is 1 at the pointer, 0 at and beyond the radius, monotonic', () => {
  assert.equal(falloff(0, 100), 1)
  assert.ok(Math.abs(falloff(50, 100) - 0.5) < 1e-9)
  assert.equal(falloff(100, 100), 0)
  assert.equal(falloff(250, 100), 0)
  assert.ok(falloff(20, 100) > falloff(60, 100))
  assert.equal(falloff(0, 0), 0)
})

test('waveAt peaks on the front and vanishes outside its width', () => {
  assert.equal(waveAt(200, 200, 60), 1)
  assert.equal(waveAt(100, 200, 60), 0)
  assert.ok(waveAt(180, 200, 60) > waveAt(150, 200, 60))
})

test('spring converges to target and reports rest', () => {
  const s = { x: 0, v: 0 }
  for (let i = 0; i < 200; i++) stepSpring(s, 1, 1 / 60)
  assert.ok(atRest(s, 1))
  assert.ok(Math.abs(s.x - 1) < 0.001)
})

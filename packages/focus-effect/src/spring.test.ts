import assert from 'node:assert/strict'
import test from 'node:test'
import { createSpring, falloff, isMoving, springDamping, stepSpring } from './spring.ts'

const settle = (s: ReturnType<typeof createSpring>) => {
  let frames = 0
  while (stepSpring(s, 16) && frames < 1000) frames++
  return frames
}

test('damping is critical at zero bounce and lighter with bounce', () => {
  assert.equal(springDamping(100, 1, 0), 20)
  assert.equal(springDamping(100, 1, 0.25), 15)
})

test('stiffness falls 12% per step and stops after 3', () => {
  assert.equal(falloff(100, 0), 100)
  assert.equal(falloff(100, 1), 88)
  assert.equal(falloff(100, 3), falloff(100, 9))
})

test('spring overshoots with bounce, then settles exactly on target', () => {
  const s = createSpring(1)
  Object.assign(s, { target: 1.2, stiffness: 580, mass: 0.9, damping: springDamping(580, 0.9, 0.25) })
  let peak = 1
  let frames = 0
  while (stepSpring(s, 16) && frames++ < 1000) peak = Math.max(peak, s.value)
  assert.ok(peak > 1.2)
  assert.ok(frames < 120)
  assert.equal(s.value, 1.2)
  assert.equal(s.velocity, 0)
})

test('critically damped spring does not overshoot', () => {
  const s = createSpring(0)
  Object.assign(s, { target: 10, stiffness: 300, damping: springDamping(300, 1, 0) })
  while (stepSpring(s, 16)) assert.ok(s.value <= 10 + 1e-9)
})

test('delay holds the value before moving', () => {
  const s = createSpring(0)
  Object.assign(s, { target: 1, delay: 50 })
  assert.equal(isMoving(s), false)
  stepSpring(s, 40)
  assert.equal(s.value, 0)
  stepSpring(s, 20)
  assert.ok(s.value > 0)
  assert.ok(isMoving(s))
  assert.ok(settle(s) < 1000)
})

test('retargeting mid-flight keeps velocity', () => {
  const s = createSpring(0)
  Object.assign(s, { target: 10, stiffness: 300, damping: 20 })
  stepSpring(s, 50)
  const v = s.velocity
  s.target = -10
  stepSpring(s, 1)
  assert.ok(v > 0 && s.velocity > 0)
  settle(s)
  assert.equal(s.value, -10)
})

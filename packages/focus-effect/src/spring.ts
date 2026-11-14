export type Spring = {
  value: number
  velocity: number
  target: number
  stiffness: number
  damping: number
  mass: number
  delay: number
}

const REST_DELTA = 0.001
const REST_SPEED = 0.01

export const createSpring = (value: number): Spring => ({
  value,
  velocity: 0,
  target: value,
  stiffness: 100,
  damping: 20,
  mass: 1,
  delay: 0,
})

export const springDamping = (stiffness: number, mass: number, bounce: number) =>
  2 * Math.sqrt(stiffness * mass) * (1 - bounce)

export const falloff = (stiffness: number, distance: number) => stiffness * (1 - 0.12 * Math.min(distance, 3))

export const isMoving = (s: Spring) =>
  s.delay <= 0 && (Math.abs(s.velocity) > REST_SPEED || Math.abs(s.target - s.value) > REST_DELTA)

export function stepSpring(s: Spring, ms: number) {
  const wait = Math.min(Math.max(s.delay, 0), ms)
  s.delay -= wait
  for (let left = ms - wait; left > 0; left -= 1) {
    const dt = Math.min(left, 1) / 1000
    const force = -s.stiffness * (s.value - s.target) - s.damping * s.velocity
    s.velocity += (force / s.mass) * dt
    s.value += s.velocity * dt
  }
  if (s.delay > 0) return true
  if (isMoving(s)) return true
  s.value = s.target
  s.velocity = 0
  return false
}

export type Spring = { x: number; v: number }

export const falloff = (distance: number, radius: number) =>
  radius <= 0 || distance >= radius ? 0 : (1 + Math.cos((Math.PI * Math.max(distance, 0)) / radius)) / 2

export const waveAt = (distance: number, front: number, width: number) => falloff(Math.abs(distance - front), width)

export const stepSpring = (s: Spring, target: number, dt: number, stiffness = 260, damping = 22) => {
  const steps = Math.max(1, Math.ceil(dt / 0.008))
  const h = dt / steps
  for (let i = 0; i < steps; i++) {
    s.v += (stiffness * (target - s.x) - damping * s.v) * h
    s.x += s.v * h
  }
}

export const atRest = (s: Spring, target: number) => Math.abs(s.x - target) < 0.001 && Math.abs(s.v) < 0.001

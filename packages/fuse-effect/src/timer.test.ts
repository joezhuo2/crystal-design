import assert from 'node:assert/strict'
import test, { mock } from 'node:test'
import { createTimer } from './timer.ts'

test('timer pauses and resumes with the time left', () => {
  mock.timers.enable({ apis: ['setTimeout', 'Date'] })
  let done = 0
  const timer = createTimer(1000, () => done++)
  timer.resume()
  mock.timers.tick(400)
  timer.pause()
  assert.equal(timer.remaining(), 600)
  mock.timers.tick(5000)
  assert.equal(done, 0)
  timer.resume()
  mock.timers.tick(599)
  assert.equal(done, 0)
  mock.timers.tick(1)
  assert.equal(done, 1)
  assert.equal(timer.remaining(), 0)
  mock.timers.reset()
})

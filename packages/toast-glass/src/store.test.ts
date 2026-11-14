import assert from 'node:assert/strict'
import { test } from 'node:test'
import { dismiss, getSnapshot, toast } from './store.ts'
import { createTimer } from './timer.ts'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

test('toast adds with defaults and dismiss removes after exit', async () => {
  const id = toast('hi')
  assert.equal(getSnapshot().find((t) => t.id === id)?.duration, 4000)
  dismiss(id)
  assert.equal(getSnapshot().find((t) => t.id === id)?.closing, true)
  await wait(250)
  assert.equal(getSnapshot().some((t) => t.id === id), false)
})

test('timer fires after duration and pause holds the remainder', async () => {
  let done = 0
  const timer = createTimer(120, () => done++)
  timer.resume()
  await wait(60)
  timer.pause()
  await wait(150)
  assert.equal(done, 0)
  timer.resume()
  await wait(40)
  assert.equal(done, 0)
  await wait(80)
  assert.equal(done, 1)
})

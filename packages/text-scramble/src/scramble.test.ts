import assert from 'node:assert/strict'
import test from 'node:test'
import { poolFor, revealedCount, scrambleFrame } from './scramble.ts'

test('pools keep character class and skip punctuation', () => {
  assert.equal(poolFor('i'), 'ijlftr')
  assert.equal(poolFor('m'), 'mw')
  assert.equal(poolFor('7'), '0123456789')
  assert.equal(poolFor(' '), null)
  assert.equal(poolFor('.'), null)
})

test('frame is deterministic and keeps length, spaces and revealed prefix', () => {
  const text = 'Hello, World 42'
  const a = scrambleFrame(text, 0.4, 3)
  assert.equal(a, scrambleFrame(text, 0.4, 3))
  assert.equal([...a].length, [...text].length)
  const n = revealedCount(text.length, 0.4)
  assert.equal(a.slice(0, n), text.slice(0, n))
  assert.equal(a[5], ',')
  assert.equal(a[6], ' ')
  assert.match(a.slice(-2), /^[0-9]{2}$/)
})

test('progress 1 returns the final text', () => {
  assert.equal(scrambleFrame('Hello, World 42', 1, 9), 'Hello, World 42')
})

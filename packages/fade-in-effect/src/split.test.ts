import assert from 'node:assert/strict'
import test from 'node:test'
import { splitText, staggerDelay } from './split.ts'

test('words keep whitespace as space tokens', () => {
  const tokens = splitText('a bc', 'words')
  assert.deepEqual(tokens.map((t) => t.text), ['a', ' ', 'bc'])
  assert.deepEqual(tokens.map((t) => t.space), [false, true, false])
})

test('chars split every character', () => {
  assert.equal(splitText('hi!', 'chars').length, 3)
})

test('lines split on newlines and fall back to words', () => {
  assert.equal(splitText('a b\nc', 'lines').length, 2)
  assert.equal(splitText('a b', 'lines').length, 3)
})

test('stagger skips space tokens', () => {
  const tokens = splitText('a b c', 'words')
  assert.equal(staggerDelay(tokens, 0, 100, 50), 100)
  assert.equal(staggerDelay(tokens, 4, 100, 50), 200)
})

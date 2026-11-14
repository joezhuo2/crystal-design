import assert from 'node:assert/strict'
import { test } from 'node:test'
import { filterItems, type CommandItem } from './filter.ts'

const item = (id: string, label: string, extra: Partial<CommandItem> = {}): CommandItem => ({
  id,
  label,
  onSelect() {},
  ...extra,
})

const items = [
  item('a', 'Open file', { group: 'File' }),
  item('b', 'Toggle theme', { group: 'View', keywords: ['dark', 'light'] }),
  item('c', 'Save file', { group: 'File' }),
]

test('empty query keeps all, grouped by first appearance', () => {
  assert.deepEqual(filterItems(items, '').map((i) => i.id), ['a', 'c', 'b'])
})

test('every token must match label, group or keywords', () => {
  assert.deepEqual(filterItems(items, 'dark').map((i) => i.id), ['b'])
  assert.deepEqual(filterItems(items, 'file sav').map((i) => i.id), ['c'])
  assert.deepEqual(filterItems(items, 'zzz'), [])
})

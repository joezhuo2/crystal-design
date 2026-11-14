import assert from 'node:assert/strict'
import test from 'node:test'
import { anchorFactors, collapsedSides } from './morph.ts'

test('anchorFactors maps anchors to box fractions', () => {
  assert.deepEqual(anchorFactors('center'), [0.5, 0.5])
  assert.deepEqual(anchorFactors('top'), [0.5, 0])
  assert.deepEqual(anchorFactors('bottom'), [0.5, 1])
  assert.deepEqual(anchorFactors('left'), [0, 0.5])
  assert.deepEqual(anchorFactors('top-right'), [1, 0])
  assert.deepEqual(anchorFactors('bottom-left'), [0, 1])
})

test('collapsedSides puts a sized pill at the anchor', () => {
  assert.deepEqual(collapsedSides({ width: 120, height: 36 }, 'top'), {
    top: '0px',
    right: 'calc((100% - 120px) * 0.5)',
    bottom: 'calc(100% - 36px)',
    left: 'calc((100% - 120px) * 0.5)',
  })
  assert.deepEqual(collapsedSides({ width: 40, height: 40 }, 'bottom-right'), {
    top: 'calc(100% - 40px)',
    right: '0px',
    bottom: '0px',
    left: 'calc(100% - 40px)',
  })
})

test('collapsedSides passes an explicit inset through in px', () => {
  assert.deepEqual(collapsedSides({ top: 4, right: 8, bottom: 12, left: 16 }, 'center'), {
    top: '4px',
    right: '8px',
    bottom: '12px',
    left: '16px',
  })
})

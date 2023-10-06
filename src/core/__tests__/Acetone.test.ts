import {test, expect} from '@jest/globals'
import {Acetone} from '../Acetone'

test('adaptation for acetone level = 1 is +4', () => {
  let acetone = new Acetone()

  expect(acetone.computeAdaptation(1)).toEqual(4)
})

test('adaptation for acetone level = 0 is 0', () => {
  let acetone = new Acetone()

  expect(acetone.computeAdaptation(0)).toEqual(0)
})

test('adaptation for acetone level = -1 throws error', () => {
  let acetone = new Acetone()

  const t = () => {
    acetone.computeAdaptation(-1)
  }

  expect(t).toThrow(Error)
})

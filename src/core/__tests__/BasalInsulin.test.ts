import {test, expect} from '@jest/globals'
import BasalInsulin from '../BasalInsulin'

test('basal insulin adaptation is zero if no trend found', () => {
  let basalInsulin = new BasalInsulin()

  expect(basalInsulin.computeAdaptation()).toEqual(0)
})

import {expect} from '@jest/globals'
import BasalInsulin, {NightGlycemiaInterval} from '../BasalInsulin'

describe('basal glycemia adaptation', () => {
  it.each([
    [
      [
        new NightGlycemiaInterval(1, 1.2),
        new NightGlycemiaInterval(1.1, 1.3),
        new NightGlycemiaInterval(2, 2.1),
      ],
      0,
    ],
    [
      [
        new NightGlycemiaInterval(1, 1.4),
        new NightGlycemiaInterval(1.1, 1.6),
        new NightGlycemiaInterval(2, 2.5),
      ],
      +2,
    ],
    [
      [
        new NightGlycemiaInterval(1.4, 1.0),
        new NightGlycemiaInterval(1.6, 1.1),
        new NightGlycemiaInterval(2.5, 2),
      ],
      -2,
    ],
  ])(
    'when glycemia inputs are %j, adaptation is %i',
    (glycemias, expectedAdaptation) => {
      let basalInsulin = new BasalInsulin()
      expect(basalInsulin.computeAdaptation(glycemias)).toEqual(
        expectedAdaptation,
      )
    },
  )
})

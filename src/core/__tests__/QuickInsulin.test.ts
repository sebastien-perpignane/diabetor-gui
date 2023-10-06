import {test, expect} from '@jest/globals'
import {AcetoneNeededError, QuickInsulin} from '../QuickInsulin'

jest.mock(
  '../quick_insulin_conditions.json',
  () => [
    {
      max: 0.7,
      adaptation: -1,
      endOfMeal: true,
    },
    {
      min: 0.7,
      max: 1.4,
      objective: true,
      adaptation: 0,
    },
    {
      min: 1.4,
      max: 2.0,
      adaptation: 1,
    },
    // no condition for interval >= 2.0 and < 2.3
    {
      min: 2.3,
      max: 2.5,
      adaptation: 2,
    },
    {
      min: 2.5,
      max: 3.0,
      adaptation: 3,
      checkAcetone: true,
    },
    {
      min: 3.0,
      adaptation: 4,
      checkAcetone: true,
    },
  ],
  {virtual: true},
)

test('adaptation for glycemia measure 0.8 is 0', () => {
  let quickInsulin = new QuickInsulin()

  let glycemiaLevel = 0.8

  expect(
    quickInsulin.computePunctualAdaptation(glycemiaLevel).totalAdaptation,
  ).toEqual(0)
})

test('adaptation for glycemia measure 2.3 is +2', () => {
  let quickInsulin = new QuickInsulin()

  let glycemiaLevel = 2.3

  expect(
    quickInsulin.computePunctualAdaptation(glycemiaLevel).totalAdaptation,
  ).toEqual(2)
})

test('adaptation for glycemia measure 1.8 is +1', () => {
  let quickInsulin = new QuickInsulin()

  let glycemiaLevel = 1.8

  expect(
    quickInsulin.computePunctualAdaptation(glycemiaLevel).totalAdaptation,
  ).toEqual(1)
})

test('exception when condition not found', () => {
  let quickInsulin = new QuickInsulin()

  let glycemiaLevel = 2.1

  const t = () => quickInsulin.computePunctualAdaptation(glycemiaLevel)

  expect(t).toThrowError()
})

test('adaptation for glycemia measure 2.6 and acetone level = 0 is +3', () => {
  let quickInsulin = new QuickInsulin()

  let glycemiaLevel = 2.6
  let acetoneLevel = 0

  expect(
    quickInsulin.computePunctualAdaptation(glycemiaLevel, acetoneLevel)
      .totalAdaptation,
  ).toEqual(3)
})

test('acetone level required error when glycemia >= 2.5', () => {
  let quickInsulin = new QuickInsulin()

  let glycemiaLevel = 2.5

  const t = () => {
    quickInsulin.computePunctualAdaptation(glycemiaLevel).totalAdaptation
  }

  expect(t).toThrow(AcetoneNeededError)
})

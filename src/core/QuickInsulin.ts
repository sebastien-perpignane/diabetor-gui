import {Acetone} from './Acetone'
import conditions from './quick_insulin_conditions.json'

export class PuntualAdaptationResult {
  private _glycemiaAdaptation: number
  private _acetoneAdaptation: number

  constructor(glycemiaAdapation: number, acetoneAdaptation: number) {
    this._glycemiaAdaptation = glycemiaAdapation
    this._acetoneAdaptation = acetoneAdaptation
  }

  public get glycemiaAdaptation() {
    return this._glycemiaAdaptation
  }

  public get acetoneAdaptation() {
    return this._acetoneAdaptation
  }

  public get totalAdaptation() {
    return this.acetoneAdaptation + this.glycemiaAdaptation
  }
}

export class QuickInsulin {
  computePunctualAdaptation(
    glycemiaLevel: number,
    acetoneLevel?: number,
  ): PuntualAdaptationResult {
    let glycemiaCondition = conditions.find(element => {
      let min = element.min == null ? Number.MIN_VALUE : element.min
      let max = element.max == null ? Number.MAX_VALUE : element.max

      return glycemiaLevel >= min && glycemiaLevel < max
    })

    if (!glycemiaCondition) {
      throw new Error(
        'No adaptation found. Check quick insulin conditions config',
      )
    }

    if (glycemiaCondition.checkAcetone && acetoneLevel == null) {
      throw new AcetoneNeededError('Please provide acetone level')
    }

    let acetoneAdaptation = 0

    if (acetoneLevel != null) {
      let acetone = new Acetone()
      acetoneAdaptation = acetone.computeAdaptation(acetoneLevel)
    }

    return new PuntualAdaptationResult(
      glycemiaCondition.adaptation,
      acetoneAdaptation,
    )
  }
}

export class AcetoneNeededError extends Error {
  constructor(message: string) {
    super(message)
  }
}

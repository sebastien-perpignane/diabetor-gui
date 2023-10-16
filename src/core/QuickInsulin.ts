import {Acetone} from './Acetone'
import punctualAdaptationCriteria from './quick_insulin_punctual_adaptation_criteria.json'
import longtermAdaptationCriteria from './quick_insulin_longterm_adaptation_criteria.json'
import {Trend, TrendService} from './TrendService'

export interface GlycemiaObjective {
  min: number
  max: number
}

export class MealGlycemiaMeasure {
  private _afterMealGlycemia: number
  private _trend: Trend

  constructor(afterMealGlycemia: number, objective: GlycemiaObjective) {
    this._afterMealGlycemia = afterMealGlycemia
    let {min, max} = objective
    this._trend = this.computeTrend({min, max})
  }

  private computeTrend(glycemiaObjective: GlycemiaObjective) {
    if (this._afterMealGlycemia > glycemiaObjective.max) {
      return Trend.UP
    } else if (this._afterMealGlycemia < glycemiaObjective.min) {
      return Trend.DOWN
    } else {
      return Trend.STABLE
    }
  }

  public get trend() {
    return this._trend
  }
}

export class PuntualAdaptationResult {
  private _glycemiaAdaptation: number
  private _acetoneAdaptation: number
  private _totalAdaptation: number
  private _checkAcetone: boolean

  constructor(
    glycemiaAdapation: number,
    acetoneAdaptation: number,
    checkAcetone: boolean,
  ) {
    this._glycemiaAdaptation = glycemiaAdapation
    this._acetoneAdaptation = acetoneAdaptation
    this._checkAcetone = checkAcetone
    this._totalAdaptation = acetoneAdaptation + glycemiaAdapation
  }

  public get glycemiaAdaptation() {
    return this._glycemiaAdaptation
  }

  public get acetoneAdaptation() {
    return this._acetoneAdaptation
  }

  public get totalAdaptation() {
    return this._totalAdaptation
  }

  public get checkAcetone() {
    return this._checkAcetone
  }
}

export class QuickInsulin {
  public computePunctualAdaptation(
    glycemiaLevel: number,
    acetoneLevel?: number,
  ): PuntualAdaptationResult {
    let glycemiaCondition = punctualAdaptationCriteria.find(element => {
      let min = element.min == null ? Number.MIN_VALUE : element.min
      let max = element.max == null ? Number.MAX_VALUE : element.max

      return glycemiaLevel >= min && glycemiaLevel < max
    })

    if (!glycemiaCondition) {
      throw new Error(
        'No adaptation found. Check quick insulin conditions configuration',
      )
    }

    if (glycemiaCondition.checkAcetone && acetoneLevel === undefined) {
      throw new AcetoneNeededError('Please provide acetone level')
    }

    let acetoneAdaptation = 0

    if (acetoneLevel !== undefined) {
      let acetone = new Acetone()
      acetoneAdaptation = acetone.computeAdaptation(acetoneLevel)
    }

    return new PuntualAdaptationResult(
      glycemiaCondition.adaptation,
      acetoneAdaptation,
      glycemiaCondition.checkAcetone === undefined
        ? false
        : glycemiaCondition.checkAcetone,
    )
  }

  public computeLongtermAdaptation = (
    glycemiaIntervals: MealGlycemiaMeasure[],
  ): number => {
    let trendService = new TrendService()
    let trend = trendService.findTrend(glycemiaIntervals)
    let result = longtermAdaptationCriteria.find(c => c.trend === trend)
    if (!result) {
      throw new Error(`No result found for trend ${trend}`)
    }
    return result.adaptation
  }

  findObjectiveCriterion = () => {
    return punctualAdaptationCriteria.find(c => c.objective)
  }
}

export class AcetoneNeededError extends Error {
  constructor(message: string) {
    super(message)
  }
}

import {Trend, TrendService} from './TrendService'
import basalAdaptationCriteria from './basal_insulin_adaptation_config.json'

export class NightGlycemiaInterval {
  private _beforeSleepingGlycemia: number
  private _wakeUpGlycemia: number
  private _trend: Trend

  constructor(beforeSleepingGlycemia: number, wakeUpGlycemia: number) {
    this._beforeSleepingGlycemia = beforeSleepingGlycemia
    this._wakeUpGlycemia = wakeUpGlycemia

    let delta = wakeUpGlycemia - beforeSleepingGlycemia

    if (delta > 0.3) {
      this._trend = Trend.UP
    } else if (delta < -0.3) {
      this._trend = Trend.DOWN
    } else {
      this._trend = Trend.STABLE
    }
  }

  public get trend() {
    return this._trend
  }

  toString() {
    return `{before=${this._beforeSleepingGlycemia},after=${this._wakeUpGlycemia},trend=${this._trend}`
  }
}

class BasalInsulin {
  computeAdaptation(glycemiaIntervals: NightGlycemiaInterval[]): number {
    let trendService = new TrendService()
    let trend = trendService.findTrend(glycemiaIntervals)
    let result = basalAdaptationCriteria.find(c => c.trend === trend)
    if (!result) {
      throw new Error(`No result found for trend ${trend}`)
    }
    return result.adaptation
  }
}

export default BasalInsulin

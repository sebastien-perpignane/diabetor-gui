import {test, expect} from '@jest/globals'
import { Trend, TrendService } from '../TrendService'

describe('trend service', () => {

  test.each([
    [{trend: Trend.DOWN}, {trend:Trend.UP} , {trend: Trend.STABLE} , Trend.STABLE],
    [{trend: Trend.DOWN}, {trend:Trend.DOWN} , {trend: Trend.DOWN} , Trend.DOWN],
    [{trend: Trend.UP}, {trend:Trend.UP} , {trend: Trend.UP} , Trend.UP],
    [{trend: Trend.STABLE}, {trend:Trend.STABLE} , {trend: Trend.STABLE} , Trend.STABLE],
  ])
    (
      ' when trend1 = %j and trend2 = %j and trend3 = %j, computed trend must give %s', 
      (trend1: {trend: Trend}, trend2: {trend: Trend}, trend3: {trend: Trend}, expected: Trend) => {
        let trendService = new TrendService()
        expect(trendService.findTrend([trend1, trend2, trend3])).toEqual(expected)
      }
    )
  })

  it('throws error when not enough measures are provided', () => {
    let trendService = new TrendService()
    let t = () => {trendService.findTrend([{trend: Trend.DOWN}, {trend: Trend.DOWN}])}

    expect(t).toThrowError()

  })

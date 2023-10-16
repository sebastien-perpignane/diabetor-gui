export enum Trend {
  UP = 'UP',
  DOWN = 'DOWN',
  STABLE = 'STABLE',
}

interface TrendInterval {
  trend: Trend
}

export class TrendService {
  findTrend(intervals: TrendInterval[]): Trend {
    if (intervals.length < 3) {
      throw new Error('Please provide at least 3 intervals')
    }

    let trends = new Set(intervals.map(gi => gi.trend))

    if (trends.size === 1) {
      return trends.values().next().value
    }

    return Trend.STABLE
  }
}

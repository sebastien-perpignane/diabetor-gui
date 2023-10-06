import acetoneCriteria from './acetone.json'

export class Acetone {
  acetoneAdaptationByLevel = new Map()

  constructor() {
    acetoneCriteria.map(item =>
      this.acetoneAdaptationByLevel.set(item.level, item.adaptation),
    )
  }

  public computeAdaptation(acetoneLevel: number): number {
    if (!this.acetoneAdaptationByLevel.has(acetoneLevel)) {
      throw new Error('unknown acetone level: {acetoneLevel}')
    }

    return this.acetoneAdaptationByLevel.get(acetoneLevel)
  }
}

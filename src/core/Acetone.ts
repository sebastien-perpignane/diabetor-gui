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
      let validLevels = [...this.acetoneAdaptationByLevel.keys()].join(', ')

      throw new Error(
        `Invalid acetone level: ${acetoneLevel}. Valid levels are: ${validLevels}`,
      )
    }

    return this.acetoneAdaptationByLevel.get(acetoneLevel)
  }
}

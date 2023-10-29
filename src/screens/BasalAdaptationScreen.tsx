import React from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import {DbNumericTextInput} from '../components/DbNumericTextInputComponent'
import {screenStyles} from './styles'
import BasalInsulin, {NightGlycemiaInterval} from '../core/BasalInsulin'
import {componentStyles} from '../components/styles'

interface BasalState {
  glycemiasBefore: number[]
  glycemiasAfter: number[]
  adaptation: number | undefined
}

export class BasalAdaptationScreen extends React.Component<{}, BasalState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      glycemiasBefore: new Array(3),
      glycemiasAfter: new Array(3),
      adaptation: undefined,
    }
  }

  manageComputation = () => {
    const containsInvalidElement = (numbers: number[]): boolean => {
      for (let n of numbers) {
        if (n === undefined || isNaN(n)) {
          return true
        }
      }
      return false
    }

    if (
      containsInvalidElement(this.state.glycemiasBefore) ||
      containsInvalidElement(this.state.glycemiasAfter)
    ) {
      this.setState({
        adaptation: undefined,
      })
      return
    }

    let intervals: NightGlycemiaInterval[] = []
    for (let index = 0; index < this.state.glycemiasBefore.length; index++) {
      const before = this.state.glycemiasBefore[index]
      const after = this.state.glycemiasAfter[index]

      intervals.push(new NightGlycemiaInterval(before, after))
    }

    let basalInsulin = new BasalInsulin()
    this.setState({
      adaptation: basalInsulin.computeAdaptation(intervals),
    })
  }

  render() {
    const manageGlycemiaBefore = (i: number, glycemiaStr: string) => {
      let newBefore = Array.from(this.state.glycemiasBefore)
      newBefore[i] = parseFloat(glycemiaStr)

      this.setState(
        {
          glycemiasBefore: newBefore,
        },
        this.manageComputation,
      )
    }

    const manageGlycemiaAfter = (i: number, glycemiaStr: string) => {
      let newAfter = Array.from(this.state.glycemiasAfter)
      newAfter[i] = parseFloat(glycemiaStr)

      this.setState(
        {
          glycemiasAfter: newAfter,
        },
        this.manageComputation,
      )
    }

    const glycemiaIntervalInputs = []
    for (let i = 0; i < 3; i++) {
      glycemiaIntervalInputs.push(
        <View key={i} style={screenStyles.intervalContainer}>
          <Text style={screenStyles.intervalLabel}>Interval {i + 1}: </Text>
          <DbNumericTextInput
            testID={'glycemiaBeforeInput' + (i + 1)}
            placeholder={'glycemia before ' + (i + 1)}
            onChangeText={newtText => {
              manageGlycemiaBefore(i, newtText)
            }}
          />
          <DbNumericTextInput
            testID={'glycemiaAfterInput' + (i + 1)}
            placeholder={'glycemia after ' + (i + 1)}
            onChangeText={newtText => {
              manageGlycemiaAfter(i, newtText)
            }}
          />
        </View>,
      )
    }

    return (
      <SafeAreaView style={screenStyles.screenBackground}>
        <View>
          {glycemiaIntervalInputs}
          {this.state.adaptation !== undefined && (
            <View>
              <Text
                testID="adaptationResult"
                style={componentStyles.dbTextInput}>
                {this.state.adaptation}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

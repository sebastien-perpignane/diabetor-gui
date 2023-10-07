import React from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import {DbNumericTextInput} from '../components/DbNumericTextInputComponent'
import {screenStyles} from './styles'
//import {ScreenComponentType} from '@react-navigation/core/src/types'

interface BasalState {
  glycemiasBefore: number[]
  glycemiasAfter: number[]
}

export class BasalAdaptationScreen extends React.Component<{}, BasalState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      glycemiasBefore: [],
      glycemiasAfter: [],
    }
  }

  render() {
    const manageGlycemiaBefore = (i: number, glycemiaStr: string) => {
      let newBefore = Array.from(this.state.glycemiasBefore)
      newBefore[i] = parseFloat(glycemiaStr)

      this.setState({
        glycemiasBefore: newBefore,
      })
    }

    const manageGlycemiaAfter = (i: number, glycemiaStr: string) => {
      let newAfter = Array.from(this.state.glycemiasAfter)
      newAfter[i] = parseFloat(glycemiaStr)

      this.setState({
        glycemiasAfter: newAfter,
      })
    }

    const glycemiaIntervalInputs = []
    for (let i = 0; i < 3; i++) {
      glycemiaIntervalInputs.push(
        <View key={i} style={screenStyles.intervalContainer}>
          <Text style={screenStyles.intervalLabel}>Interval {i + 1}: </Text>
          <DbNumericTextInput
            placeholder={'glycemia before ' + (i + 1)}
            onChangeText={newtText => {
              manageGlycemiaBefore(i, newtText)
            }}
          />
          <DbNumericTextInput
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
          <View>
            <Text style={screenStyles.intervalSummary}>
              {this.state.glycemiasBefore.join(', ')}
            </Text>
            <Text style={screenStyles.intervalSummary}>
              {this.state.glycemiasAfter.join(', ')}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

// interface NightGlycemiaInterval {
//   glycemiaBefore: number
//   glycemiaAfter: number
// }

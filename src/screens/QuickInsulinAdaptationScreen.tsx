import React from 'react'
import {Appearance, ScrollView, StatusBar, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {screenStyles} from './styles'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {MealGlycemiaMeasure, QuickInsulin} from '../core/QuickInsulin'
import {Text} from 'react-native-paper'
import {DbNumericTextInput} from '../components/DbNumericTextInputComponent'

interface QuickInsulinAdaptationState {
  glycemiasAfter: number[]
  adaptation: number | undefined
}

export class QuickInsulinAdaptationScreen extends React.Component<
  {},
  QuickInsulinAdaptationState
> {
  constructor(props: {}) {
    super(props)
    this.state = {
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

    if (containsInvalidElement(this.state.glycemiasAfter)) {
      this.setState({
        adaptation: undefined,
      })
      return
    }

    let quickInsulin = new QuickInsulin()

    let objective = quickInsulin.findObjectiveCriterion()
    if (
      objective === undefined ||
      objective.min === undefined ||
      objective.max === undefined
    ) {
      throw new Error('Check your configuration. Objective not found')
    }
    let lObjective: {min: number; max: number} = objective
    let measures = this.state.glycemiasAfter.map(
      g => new MealGlycemiaMeasure(g, lObjective),
    )
    let adaptation = quickInsulin.computeLongtermAdaptation(measures)
    this.setState({
      adaptation: adaptation,
    })
  }

  render(): React.ReactNode {
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
          <Text style={screenStyles.intervalLabel}>
            Glycemia measure {i + 1}:{' '}
          </Text>
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

    const isDarkMode = Appearance.getColorScheme() === 'dark'

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (
      <SafeAreaView style={screenStyles.screenBackground}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View>{glycemiaIntervalInputs}</View>
          <View>
            {this.state.adaptation !== undefined && (
              <Text testID='adaptationResult' style={screenStyles.intervalLabel}>
                Adaptation: {this.state.adaptation}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

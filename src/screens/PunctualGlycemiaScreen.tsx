import React from 'react'
import {
  ScrollView,
  StatusBar,
  Text,
  Vibration,
  View,
  Appearance,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {
  AcetoneNeededError,
  PuntualAdaptationResult,
  QuickInsulin,
} from '../core/QuickInsulin'
import {DbNumericTextInput} from '../components/DbNumericTextInputComponent'
import {DbButton} from '../components/DbButtonComponent'
import {screenStyles} from './styles'

interface PunctualGlycemiaState {
  glycemiaLevel: number | undefined
  acetoneLevel: number | undefined
  punctualAdaptationResult: PuntualAdaptationResult | null
  visibleAcetone: boolean
  errorMessage: string
}

export class PunctualGlycemiaScreen extends React.Component<
  {},
  PunctualGlycemiaState
> {
  constructor(props: {}) {
    super(props)

    this.state = {
      glycemiaLevel: undefined,
      acetoneLevel: undefined,
      punctualAdaptationResult: null,
      visibleAcetone: false,
      errorMessage: '',
    }
  }

  formatResult = (
    punctualAdaptationResult: PuntualAdaptationResult,
  ): string => {
    return `
      glycemia adaptation: ${punctualAdaptationResult.glycemiaAdaptation}
      acetone adaptation: ${punctualAdaptationResult.acetoneAdaptation}
    `
  }

  setGlycemiaLevel = (glycemiaLevel: number | undefined): void => {
    this.setState({
      glycemiaLevel: glycemiaLevel,
    })
  }

  setAcetoneLevel = (acetoneLevel: number | undefined): void => {
    this.setState({
      acetoneLevel: acetoneLevel,
    })
  }

  manageNumberInput = (
    strValue: string,
    setValueFunction: (value: number | undefined) => void,
  ): void => {
    if (!strValue) {
      setValueFunction(undefined)
      return
    }
    let numberValue: number = Number(strValue)
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      this.setErrorMessage('Invalid number')
    } else {
      setValueFunction(numberValue)
      this.manageValidation()
      this.setErrorMessage('')
    }
  }

  setPunctualAdaptationResult = (
    punctualAdaptationResult: PuntualAdaptationResult | null,
  ): void => {
    this.setState({
      punctualAdaptationResult: punctualAdaptationResult,
    })
  }

  setVisibleAcetone = (visible: boolean) => {
    this.setState({visibleAcetone: visible})
  }

  setErrorMessage = (errorMessage: string) => {
    this.setState({
      errorMessage: errorMessage,
    })
  }

  manageValidation = (): void => {
    if (this.state.glycemiaLevel === undefined) {
      this.setPunctualAdaptationResult(null)
      return
    }

    let quickInsulin = new QuickInsulin()
    try {
      let lPunctualAdaptationResult = quickInsulin.computePunctualAdaptation(
        this.state.glycemiaLevel,
        this.state.acetoneLevel,
      )
      this.setPunctualAdaptationResult(lPunctualAdaptationResult)
    } catch (e) {
      if (e instanceof AcetoneNeededError) {
        try {
          Vibration.vibrate()
        } catch (ve) {}

        this.setVisibleAcetone(true)
      } else {
        this.setAcetoneLevel(undefined)
        this.setVisibleAcetone(false)
        this.setPunctualAdaptationResult(null)
      }
    }
  }

  render(): JSX.Element {
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
          <View>
            <Text>Glycemia level:</Text>
            <DbNumericTextInput
              id="glycemia"
              keyboardType="numeric"
              onChangeText={newText =>
                this.manageNumberInput(newText, this.setGlycemiaLevel)
              }
              testID="glycemiaInput"
              defaultValue={
                this.state.glycemiaLevel == null
                  ? ''
                  : this.state.glycemiaLevel.toString()
              }
            />
          </View>

          {this.state.visibleAcetone && (
            <View>
              <Text>Acetone level:</Text>
              <DbNumericTextInput
                id="acetone"
                placeholder="Enter acetone level"
                onChangeText={newText =>
                  this.manageNumberInput(newText, this.setAcetoneLevel)
                }
                testID="acetoneInput"
                defaultValue={
                  this.state.acetoneLevel == null
                    ? ''
                    : this.state.acetoneLevel.toString()
                }
              />
            </View>
          )}

          <View>
            <DbButton
              title="Validate"
              testID="validateButton"
              onPress={this.manageValidation}
            />
          </View>

          {this.state.punctualAdaptationResult && (
            <View>
              <Text testID="adaptationText">
                {this.state.punctualAdaptationResult?.totalAdaptation?.toString()}
              </Text>
            </View>
          )}

          {this.state.punctualAdaptationResult != null && (
            <View>
              <Text testID="resultDetails">
                {this.formatResult(this.state.punctualAdaptationResult)}
              </Text>
            </View>
          )}

          {this.state.errorMessage && (
            <View>
              <Text testID="errorMessage">{this.state.errorMessage}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

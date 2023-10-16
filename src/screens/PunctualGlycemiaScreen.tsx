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
import {screenStyles} from './styles'
import {Acetone} from '../core/Acetone'
import {SegmentedButtons} from 'react-native-paper'

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

  private manageInvalidGlycemia = () => {
    this.setVisibleAcetone(false)
    this.setAcetoneLevel(undefined)
    this.setErrorMessage('Invalid glycemia level')
    this.setPunctualAdaptationResult(null)
  }

  private setGlycemiaLevel = (glycemiaLevel: number | undefined): void => {
    this.setState({
      glycemiaLevel: glycemiaLevel,
    })
  }

  private setAcetoneLevel = (acetoneLevel: number | undefined): void => {
    this.setState({
      acetoneLevel: acetoneLevel,
    })
  }

  private computeAdaptation = (
    glycemiaLevel: number,
    acetoneLevel: number | undefined,
  ) => {
    let quickInsulin = new QuickInsulin()
    try {
      let lPunctualAdaptationResult = quickInsulin.computePunctualAdaptation(
        glycemiaLevel,
        acetoneLevel,
      )
      this.setPunctualAdaptationResult(lPunctualAdaptationResult)
      this.setVisibleAcetone(lPunctualAdaptationResult.checkAcetone)
      this.setErrorMessage('')
    } catch (e: any) {
      if (e instanceof AcetoneNeededError) {
        try {
          Vibration.vibrate()
        } catch (ve) {}
        this.setVisibleAcetone(true)
        this.setErrorMessage('Please provide acetone level')
      } else {
        this.setErrorMessage(e.toString())
      }
      this.setPunctualAdaptationResult(null)
    }
  }

  private manageGlycemiaLevelInput = (newText: string) => {
    let glycemiaLevel = this.manageNumberInput(newText)

    if (glycemiaLevel === undefined) {
      this.manageInvalidGlycemia()
      return
    }

    this.setGlycemiaLevel(glycemiaLevel)

    this.computeAdaptation(glycemiaLevel, this.state.acetoneLevel)
  }

  private manageAcetoneLevelInput = (newText: string) => {
    let acetoneLevel = this.manageNumberInput(newText)
    this.setAcetoneLevel(acetoneLevel)
    if (this.state.glycemiaLevel) {
      this.computeAdaptation(this.state.glycemiaLevel, acetoneLevel)
    }
  }

  private manageNumberInput = (strValue: string): number | undefined => {
    if (strValue === '') {
      return undefined
    }
    let numberValue: number = Number(strValue)
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      return undefined
    } else {
      this.setErrorMessage('')
      return numberValue
    }
  }

  private setPunctualAdaptationResult = (
    punctualAdaptationResult: PuntualAdaptationResult | null,
  ): void => {
    this.setState({
      punctualAdaptationResult: punctualAdaptationResult,
    })
  }

  private setVisibleAcetone = (visible: boolean) => {
    this.setState({visibleAcetone: visible})
  }

  private setErrorMessage = (errorMessage: string) => {
    this.setState({
      errorMessage: errorMessage,
    })
  }

  render(): JSX.Element {
    const isDarkMode = Appearance.getColorScheme() === 'dark'

    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    const acetoneLevels = new Acetone().getAcetoneLevels().map(i => {
      return {
        label: i === 0 ? '0' : '+'.repeat(i),
        value: i.toString(),
        style: {color: 'white', backgroundColor: 'gray'},
        checkedColor: 'blue',
        testID: `acetoneLevel${i}`,
      }
    })

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
              onChangeText={newText => this.manageGlycemiaLevelInput(newText)}
              testID="glycemiaInput"
            />
          </View>

          {this.state.visibleAcetone && (
            <View>
              <Text>Acetone level:</Text>
              <SegmentedButtons
                buttons={acetoneLevels}
                value={
                  this.state.acetoneLevel
                    ? this.state.acetoneLevel.toString()
                    : '0'
                }
                onValueChange={nexText => this.manageAcetoneLevelInput(nexText)}
              />
            </View>
          )}

          {this.state.punctualAdaptationResult && (
            <View>
              <Text testID="adaptationText">
                {this.state.punctualAdaptationResult.totalAdaptation.toString()}
              </Text>
            </View>
          )}

          {this.state.punctualAdaptationResult && (
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

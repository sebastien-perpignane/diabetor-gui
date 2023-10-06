import React from 'react'
import {
  ScrollView,
  StatusBar,
  Text,
  Vibration,
  View,
  useColorScheme,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Section} from '../components/SectionComponent'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import {useState} from 'react'
import {
  AcetoneNeededError,
  PuntualAdaptationResult,
  QuickInsulin,
} from '../core/QuickInsulin'
import {DbNumericTextInput} from '../components/DbNumericTextInputComponent'
import {DbButton} from '../components/DbButtonComponent'

function formatResult(
  punctualAdaptationResult: PuntualAdaptationResult,
): string {
  return `
    glycemia adaptation: ${punctualAdaptationResult.glycemiaAdaptation}
    acetone adaptation: ${punctualAdaptationResult.acetoneAdaptation}
  `
}

export function PunctualGlycemiaScreen() {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [glycemia, setGlycemia] = useState<number | undefined>(undefined)
  const [acetoneLevel, setAcetoneLevel] = useState<number | undefined>(
    undefined,
  )
  const [punctualAdaptationResult, setPunctualAdaptationResult] =
    useState<PuntualAdaptationResult | null>(null)
  const [visibleAcetone, setVisibleAcetone] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const manageNumberInput = (
    strValue: string,
    setValueFunction: (num: number | undefined) => void,
  ) => {
    if (!strValue) {
      setValueFunction(undefined)
      return
    }
    let numberValue: number = Number(strValue) //parseFloat(glycemiaStr)
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      setErrorMessage('Invalid number')
    } else {
      setValueFunction(numberValue)
      manageValidation()
      setErrorMessage('')
    }
  }

  const manageValidation = () => {
    if (glycemia === undefined) {
      setPunctualAdaptationResult(null)
      return
    }

    let quickInsulin = new QuickInsulin()
    try {
      let lPunctualAdaptationResult = quickInsulin.computePunctualAdaptation(
        glycemia,
        acetoneLevel,
      )
      setPunctualAdaptationResult(lPunctualAdaptationResult)
    } catch (e) {
      if (e instanceof AcetoneNeededError) {
        try {
          Vibration.vibrate()
        } catch (ve) {}

        setVisibleAcetone(true)
      } else {
        setAcetoneLevel(0)
        setVisibleAcetone(false)
        setPunctualAdaptationResult(null)
      }
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="">
            <View
              style={{
                borderColor: Colors.black,
                borderStyle: 'solid',
                borderWidth: 2,
              }}>
              <Text>Glycemia level:</Text>
              <DbNumericTextInput
                id="glycemia"
                keyboardType="numeric"
                onChangeText={newText =>
                  manageNumberInput(newText, setGlycemia)
                }
                testID="glycemiaInput"
                defaultValue={glycemia == null ? '' : glycemia.toString()}
              />

              {visibleAcetone && (
                <View>
                  <Text>Acetone level:</Text>
                  <DbNumericTextInput
                    id="acetone"
                    placeholder="Enter acetone level"
                    onChangeText={newText =>
                      manageNumberInput(newText, setAcetoneLevel)
                    }
                    testID="acetoneInput"
                    defaultValue={
                      acetoneLevel == null ? '' : acetoneLevel.toString()
                    }
                  />
                </View>
              )}
            </View>
          </Section>
          <Section title="">
            <DbButton
              title="Validate"
              testID="validateButton"
              onPress={manageValidation}
            />
          </Section>
          <Section title="">
            <View
              style={{
                borderColor: Colors.black,
                borderStyle: 'solid',
                borderWidth: 2,
              }}>
              <Text>Insulin adaptation:</Text>
              <Text style={{padding: 10, fontSize: 42}} testID="adaptationText">
                {punctualAdaptationResult
                  ? (punctualAdaptationResult?.totalAdaptation < 0 ? '' : '+') +
                    punctualAdaptationResult?.totalAdaptation
                  : ''}
              </Text>
            </View>
          </Section>
          {errorMessage && (
            <Section title="errors">
              <View>
                <Text testID="errorMessage">{errorMessage}</Text>
              </View>
            </Section>
          )}

          {punctualAdaptationResult != null && (
            <Section title="Details">
              <Text testID="resultDetails">
                {formatResult(punctualAdaptationResult)}
              </Text>
            </Section>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

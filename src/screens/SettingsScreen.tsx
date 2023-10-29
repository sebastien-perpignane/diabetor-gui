import React from "react"
import { QuickInsulin } from "../core/QuickInsulin"
import { Appearance, SafeAreaView, ScrollView, StatusBar, View } from "react-native"
import { Text } from "react-native-paper"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { screenStyles } from "./styles"
import { DbNumericTextInput } from "../components/DbNumericTextInputComponent"
import { DbLabel } from "../components/DbLabel"

interface InsulinDoses {
  breakfastInsulinDose: number
  lunchInsulinDose: number
  dinerInsulinDose: number
}

interface SettingsState {

  insulinDoses: InsulinDoses
  punctualQuickInsulinAdaptationCriteria: Array<any>
  longtermQuickInsulinAdaptationCriteria: Array<any>
  basalInsulinAdaptationCriteria: Array<any>

}

export class SettingsScreen extends React.Component<
  {},
  SettingsState
> {
  constructor(props: {}) {
    super(props)

    this.state = {
      insulinDoses: {
        breakfastInsulinDose: 4,
        lunchInsulinDose: 10,
        dinerInsulinDose: 10
      },
      punctualQuickInsulinAdaptationCriteria: [],
      longtermQuickInsulinAdaptationCriteria: [],
      basalInsulinAdaptationCriteria: [],
    }
  }

  render(): React.ReactNode {

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

            <View>
              <DbLabel variant="titleMedium">Insulin doses</DbLabel>
              <View>
                <DbLabel variant="labelSmall">Breakfast</DbLabel><DbNumericTextInput testID="breakfastDose" />
              </View>
              <View>
                <DbLabel variant="labelSmall">Lunch</DbLabel><DbNumericTextInput testID="lunchDose" />
              </View>
              <View>
                <DbLabel variant="labelSmall">Diner</DbLabel><DbNumericTextInput testID="dinerDose" />
              </View>
            </View>

            <View>
              <DbLabel variant="titleMedium">Punctual quick insulin adaptation criteria</DbLabel>
            </View>
            <View>
              <Text style={screenStyles.intervalLabel}>Longterm quick insulin adaptation criteria</Text>
              <DbNumericTextInput testID="quickUp" />
              <DbNumericTextInput testID="quickDown" />
            </View>
            <View>
              <Text style={screenStyles.intervalLabel}>Basal insulin adaptation criteria</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

}
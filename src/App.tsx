/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import {PunctualGlycemiaScreen} from './screens/PunctualGlycemiaScreen'
import {HomeScreen} from './screens/HomeScreen'
import {BasalAdaptationScreen} from './screens/BasalAdaptationScreen'
import {QuickInsulinAdaptationScreen} from './screens/QuickInsulinAdaptationScreen'
import { SettingsScreen } from './screens/SettingsScreen'

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Diabetor Home">
        <Stack.Screen name="Diabetor Home" component={HomeScreen} />
        <Stack.Screen
          name="Punctual quick adaptation"
          component={PunctualGlycemiaScreen}
        />
        <Stack.Screen
          name="Long term quick adaptation"
          component={QuickInsulinAdaptationScreen}
        />
        <Stack.Screen name="Basal" component={BasalAdaptationScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

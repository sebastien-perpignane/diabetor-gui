import React from 'react'
import {SafeAreaView, ScrollView, View} from 'react-native'
import {DbButton} from '../components/DbButtonComponent'
import {screenStyles} from './styles'

export function HomeScreen({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={screenStyles.screenBackground}>
      <ScrollView>
        <View style={screenStyles.buttonListContainer}>
          <DbButton
            title="Punctual quick adaptation"
            testID="punctual"
            onPress={() => {
              navigation.navigate('Punctual quick adaptation')
            }}
          />
          <DbButton
            title="Long term quick adaptation"
            testID="longterm"
            onPress={() => {
              navigation.navigate('Long term quick adaptation')
            }}
          />
          <DbButton
            title="Basal adaptation"
            testID="basal"
            onPress={() => {
              navigation.navigate('Basal')
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

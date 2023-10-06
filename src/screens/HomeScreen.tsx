import React from 'react'
import {SafeAreaView, ScrollView, View} from 'react-native'
import {DbButton} from '../components/DbButtonComponent'

export function HomeScreen({navigation}: any) {
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <ScrollView>
        <View style={{margin: 8, width: '80%', alignItems: 'center'}}>
          <DbButton
            title="Punctual quick adaptation"
            testID="punctual"
            onPress={() => {
              navigation.navigate('Punctual quick adaptation')
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

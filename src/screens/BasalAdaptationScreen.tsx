import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {DbNumericTextInput} from '../components/DbNumericTextInputComponent'

// interface NightGlycemiaInterval {
//   glycemiaBefore: number
//   glycemiaAfter: number
// }

export function BasalAdaptationScreen() {
  const [glycemiasBefore, setGlycemiaBefore] = useState<number[]>([])

  const [glycemiasAfter, setGlycemiaAfter] = useState<number[]>([])

  const manageGlycemiaBefore = (i: number, glycemiaStr: string) => {
    setGlycemiaBefore((existing: number[]) => {
      existing[i] = parseFloat(glycemiaStr)
      return existing
    })
  }

  const manageGlycemiaAfter = (i: number, glycemiaStr: string) => {
    setGlycemiaAfter((existing: number[]) => {
      existing[i] = parseFloat(glycemiaStr)
      return existing
    })
  }

  const glycemiaIntervalInputs = []
  for (let i = 0; i < 3; i++) {
    glycemiaIntervalInputs.push(
      <View key={i} style={{flexDirection: 'row'}}>
        <Text style={{color: 'black', verticalAlign: 'middle'}}>
          Interval {i + 1}:{' '}
        </Text>
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
    <View>
      <Text style={{color: 'black'}}>Basal adaptation</Text>

      {glycemiaIntervalInputs}

      <View>
        <Text style={{color: 'black'}}>{glycemiasBefore.join(', ')}</Text>
        <Text style={{color: 'black'}}>{glycemiasAfter.join(', ')}</Text>
      </View>
    </View>
  )
}

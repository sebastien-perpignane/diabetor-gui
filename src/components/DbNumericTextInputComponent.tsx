import React from 'react'
import {TextInputProps} from 'react-native'
import {DbTextInput} from './DbTextInputComponent'

export function DbNumericTextInput(props: TextInputProps): JSX.Element {
  return <DbTextInput {...props} keyboardType="numeric" />
}

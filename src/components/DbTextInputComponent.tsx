import React from 'react'
import {StyleSheet, TextInput, TextInputProps} from 'react-native'

export function DbTextInput(props: TextInputProps): JSX.Element {
  let localProps
  if (props.style) {
    localProps = props
  } else {
    localProps = {
      ...props,
      style: styles.dbTextInput,
    }
  }

  return <TextInput {...localProps} />
}

const styles = StyleSheet.create({
  dbTextInput: {
    backgroundColor: 'gray',
    borderRadius: 6,
  },
})

import React from 'react'

import {Pressable, PressableProps, StyleSheet} from 'react-native'
import {Text, TextProps} from 'react-native-paper'

interface DbLabelProps extends TextProps<string> {
}

export function DbLabel(props: DbLabelProps): JSX.Element {
  return (
    <Text style={styles.dbLabelText} {...props}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  dbLabelText: {
    color: 'white',
    margin: 10,
    padding: 7,
    borderRadius: 5,
  },
})
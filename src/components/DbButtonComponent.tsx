import React from 'react'

import {Pressable, PressableProps, StyleSheet, Text} from 'react-native'

interface DbButtonProps extends PressableProps {
  title: string
}

export function DbButton(props: DbButtonProps): JSX.Element {
  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'darkturquoise' : 'blue',
        },
        styles.dbButton,
      ]}
      testID={props.testID}>
      <Text style={styles.dbButtonText}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  dbButton: {
    margin: 10,
    padding: 7,
    borderRadius: 5,
  },
  dbButtonText: {
    color: 'white',
  },
})

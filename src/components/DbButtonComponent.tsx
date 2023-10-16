import React from 'react'

import {Pressable, PressableProps, StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'

interface DbButtonProps extends PressableProps {
  title: string
}

export function DbButton(props: DbButtonProps): JSX.Element {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'darkturquoise' : 'blue',
        },
        styles.dbButton,
      ]}
      {...props}>
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

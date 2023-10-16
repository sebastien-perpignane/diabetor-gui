/**
 * @format
 */
import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals'

// Note: test renderer must be required after react-native.
import {fireEvent, render, screen} from '@testing-library/react-native'
import {DbTextInput} from '../DbTextInputComponent'

it('renders correctly', async () => {
  const Sample = () => <DbTextInput testID="coucou" />

  render(<Sample />)

  let dbTextInput = screen.getByTestId('coucou')
  expect(dbTextInput).toBeDefined()
})

it('changes text as expected', async () => {
  let inputText = ''

  const Sample = () => (
    <DbTextInput
      testID="coucou"
      onChangeText={nextText => (inputText = nextText)}
    />
  )

  render(<Sample />)

  let dbTextInput = screen.getByTestId('coucou')
  fireEvent.changeText(dbTextInput, 'hello world')
  expect(inputText).toEqual('hello world')
})

it('takes custom styles', async () => {
  const Sample = () => (
    <DbTextInput testID="coucou" style={{backgroundColor: 'green'}} />
  )

  render(<Sample />)

  let dbTextInput = screen.getByTestId('coucou')
  expect(dbTextInput).toBeDefined()
})

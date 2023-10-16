/**
 * @format
 */
import 'react-native'
import React from 'react'
import {DbButton} from '../DbButtonComponent'

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals'

// Note: test renderer must be required after react-native.
import {fireEvent, render, screen} from '@testing-library/react-native'

it('renders correctly', async () => {
  let i = 0

  const Sample = () => (
    <DbButton title="coucou" testID="coucou" onPress={() => i++} />
  )

  render(<Sample />)

  let punctualButton = screen.getByTestId('coucou')
  expect(punctualButton).toBeDefined()

  fireEvent(punctualButton, 'onPress')
  expect(i).toEqual(1)
})

it('renders correctly when pressed', async () => {
  let i = 0

  const Sample = () => (
    <DbButton
      title="coucou"
      testID="coucou"
      testOnly_pressed={true}
      onPress={() => i++}
    />
  )

  render(<Sample />)

  let punctualButton = screen.getByTestId('coucou')
  expect(punctualButton).toBeDefined()

  fireEvent(punctualButton, 'onPress')
  expect(i).toEqual(1)
})

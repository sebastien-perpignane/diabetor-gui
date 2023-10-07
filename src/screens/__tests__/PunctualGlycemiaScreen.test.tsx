import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals'

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';
import {fireEvent, render, screen} from '@testing-library/react-native'
import {PunctualGlycemiaScreen} from '../PunctualGlycemiaScreen'

it('renders correctly', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  let root = render(<SampleScreen />)

  expect(root.getByTestId('glycemiaInput')).toBeDefined()
  expect(() => root.getByTestId('acetoneInput')).toThrowError()
  expect(() => root.getByTestId('resultDetails')).toThrowError()
})

it('displays results when acetone not needed and entered glycemia is valid', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  let root = render(<SampleScreen />)

  let glycemiaInput = root.getByTestId('glycemiaInput')
  let validateButton = root.getByTestId('validateButton')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '1.2')
  fireEvent(validateButton, 'onPress')

  let adaptationText = screen.getByTestId('adaptationText')
  expect(adaptationText.props.children).toBeTruthy()

  let resultDetails = screen.getByTestId('resultDetails')
  expect(resultDetails.props.children).toContain('glycemia adaptation')
})

it('displays acetone input when needed', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')
  let validateButton = screen.getByTestId('validateButton')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '2.6')
  fireEvent(validateButton, 'onPress')

  let acetoneInput = screen.getByTestId('acetoneInput')
  expect(acetoneInput).toBeDefined()
})

it('displays results when glycemia + acetone inputs are needed', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')
  let validateButton = screen.getByTestId('validateButton')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '2.6')
  fireEvent(validateButton, 'onPress')

  let acetoneInput = screen.getByTestId('acetoneInput')
  expect(acetoneInput).toBeDefined()

  fireEvent.changeText(acetoneInput, '1')

  fireEvent(validateButton, 'onPress')

  let adaptationText = screen.getByTestId('adaptationText')
  expect(adaptationText.props.children).toBeTruthy()

  let resultDetails = screen.getByTestId('resultDetails')
  expect(resultDetails.props.children).toContain('glycemia adaptation')
})

it('displays error message when entered glycemia is not valid', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')
  let validateButton = screen.getByTestId('validateButton')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, 'abc')
  fireEvent(validateButton, 'onPress')

  let errorMessage = screen.getByTestId('errorMessage')

  expect(errorMessage.props.children).toEqual('Invalid number')
})

it('does not update anything when entered glycemia is empty', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')
  let validateButton = screen.getByTestId('validateButton')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '')
  fireEvent(validateButton, 'onPress')

  expect(glycemiaInput.props.children).toBeUndefined()
})

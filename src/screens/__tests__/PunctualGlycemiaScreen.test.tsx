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

  render(<SampleScreen />)

  expect(screen.getByTestId('glycemiaInput')).toBeDefined()
  expect(() => screen.getByTestId('acetoneLevel1')).toThrowError()
  expect(() => screen.getByTestId('resultDetails')).toThrowError()
})

it('displays results when acetone not needed and entered glycemia is valid', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '1.2')

  let adaptationText = screen.getByTestId('adaptationText')
  expect(adaptationText.props.children).toBeTruthy()

  let resultDetails = screen.getByTestId('resultDetails')
  expect(resultDetails.props.children).toContain('glycemia adaptation')
})

it('displays acetone input when needed', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '2.6')

  let acetoneInput = screen.getByTestId('acetoneLevel1')
  expect(acetoneInput).toBeDefined()
})

it('displays results when glycemia + acetone inputs are needed', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '2.6')

  let acetoneInput = screen.getByTestId('acetoneLevel1')
  expect(acetoneInput).toBeDefined()

  fireEvent(acetoneInput, 'onPress')

  let adaptationText = screen.getByTestId('adaptationText')
  expect(adaptationText.props.children).toBeTruthy()

  let resultDetails = screen.getByTestId('resultDetails')
  expect(resultDetails.props.children).toContain('glycemia adaptation')
})

it('displays error message when entered glycemia is not valid', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, 'abc')

  let errorMessage = screen.getByTestId('errorMessage')

  expect(errorMessage.props.children).toEqual('Invalid glycemia level')
})

it('does not update anything when entered glycemia is empty', () => {
  let SampleScreen = () => <PunctualGlycemiaScreen />

  render(<SampleScreen />)

  let glycemiaInput = screen.getByTestId('glycemiaInput')

  expect(glycemiaInput).toBeDefined()

  fireEvent.changeText(glycemiaInput, '')

  expect(glycemiaInput.props.children).toBeUndefined()
})

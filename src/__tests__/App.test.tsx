/**
 * @format
 */

import 'react-native'
import React from 'react'
import App from '../App'

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals'

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';
import {fireEvent, render, screen} from '@testing-library/react-native'

it('renders correctly', () => {
  const SampleApp = () => <App />

  render(<SampleApp />)
  let punctualElement = screen.getByTestId('punctual')
  let basalElement = screen.getByTestId('basal')

  expect(punctualElement).toBeDefined()
  expect(basalElement).toBeDefined()
})

it('navigates well to punctual adaptation screen', () => {
  const SampleApp = () => <App />

  render(<SampleApp />)
  let punctualElement = screen.getByTestId('punctual')
  fireEvent(punctualElement, 'onPress')

  expect(screen.getByTestId('glycemiaInput')).toBeDefined()
})

it('navigates well to basal screen', () => {
  const SampleApp = () => <App />

  render(<SampleApp />)
  let basalElement = screen.getByTestId('basal')
  fireEvent(basalElement, 'onPress')
})

it('navigates well to longterm quick adaptation screen', () => {
  const SampleApp = () => <App />

  render(<SampleApp />)
  let longtermElement = screen.getByTestId('longterm')
  fireEvent(longtermElement, 'onPress')
})

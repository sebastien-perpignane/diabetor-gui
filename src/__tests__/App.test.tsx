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
import {fireEvent, render} from '@testing-library/react-native'

it('renders correctly', () => {
  const SampleApp = () => <App />

  let root = render(<SampleApp />)
  let punctualElement = root.getByTestId('punctual')
  let basalElement = root.getByTestId('basal')

  expect(punctualElement).toBeDefined()
  expect(basalElement).toBeDefined()
})

it('navigates well to punctual adaptation screen', () => {
  const SampleApp = () => <App />

  let root = render(<SampleApp />)
  let punctualElement = root.getByTestId('punctual')
  fireEvent(punctualElement, 'onPress')

  expect(root.getByTestId('glycemiaInput')).toBeDefined()
})

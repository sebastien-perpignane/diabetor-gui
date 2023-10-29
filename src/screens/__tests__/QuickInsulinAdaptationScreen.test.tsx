import 'react-native'
import React from 'react'

// Note: import explicitly to use the types shiped with jest.
import {it, expect} from '@jest/globals'

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';
import {fireEvent, render, screen} from '@testing-library/react-native'
import {BasalAdaptationScreen} from '../BasalAdaptationScreen'
import { QuickInsulinAdaptationScreen } from '../QuickInsulinAdaptationScreen'

it('renders correctly', () => {
  let SampleScreen = () => <QuickInsulinAdaptationScreen />

  render(<SampleScreen />)

  for (let i = 1; i < 4; i++) {
    expect(screen.getByTestId('glycemiaAfterInput' + i)).toBeDefined()
  }
  expect(() => screen.getByTestId('adaptationResult')).toThrowError()
})

it('display result when all glycemia levels are entered', () => {
  let SampleScreen = () => <QuickInsulinAdaptationScreen />

  render(<SampleScreen />)

  for (let i = 1; i < 4; i++) {
    let currentBeforeInput = screen.getByTestId('glycemiaAfterInput' + i)
    fireEvent.changeText(currentBeforeInput, '1.2')
  }

  expect(screen.getByTestId('adaptationResult').props.children).toBeDefined()
  expect(screen.getByTestId('adaptationResult').props.children).toEqual(["Adaptation: ", 0])
})

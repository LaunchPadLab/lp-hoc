import React from 'react'
import { mount } from 'enzyme'
import { deprecate } from '../src'

test('deprecate() logs out default message', () => {
  const logger = jest.fn()

  const MyComponent = () => <p>Hi!</p>
  const Deprecated = deprecate('', logger)(MyComponent)
  mount(<Deprecated/>)

  const expectedMessage = 'DEPRECATED: MyComponent is deprecated and will be removed in the next version of this library.'
  expect(logger).toHaveBeenCalledWith(expectedMessage)
})

test('deprecate() logs out custom message', () => {
  const logger = jest.fn()

  const MyComponent = () => <p>Hi!</p>
  const Deprecated = deprecate('This is my custom message', logger)(MyComponent)
  mount(<Deprecated/>)

  const expectedMessage = 'DEPRECATED: This is my custom message'
  expect(logger).toHaveBeenCalledWith(expectedMessage)
})
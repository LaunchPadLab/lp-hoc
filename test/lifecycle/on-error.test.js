import React from 'react'
import { mount } from 'enzyme'
import { onError } from '../../src'

const error = new Error('uh oh')

test('`onError` has correct displayName', () => {
  const Wrapped = () => { throw error }
  const Wrapper = onError('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('onError(Wrapped)')
})

test('`onError` works when param is a function and there is an error', () => {
  const Wrapped = () => { throw error }
  const componentDidCatch = jest.fn()
  const Wrapper = onError(componentDidCatch)(Wrapped)
  mount(<Wrapper greeting='hola' />)

  expect(componentDidCatch).toHaveBeenCalledWith(
    { greeting: 'hola' }, 
    error, 
    expect.objectContaining({ componentStack: expect.any(String) }),
  )
})

test('`onError` works when param is a string and there is an error', () => {
  const Wrapped = () => { throw error }
  const componentDidCatch = 'errorFunction'
  const Wrapper = onError(componentDidCatch)(Wrapped)
  const errorFunction = jest.fn()
  mount(<Wrapper errorFunction={errorFunction} />)

  expect(errorFunction).toHaveBeenCalled()
})

test('`onError` function param is not called when there is no error', () => {
  const Wrapped = () => <h1> Hi </h1>
  const componentDidCatch = jest.fn()
  const Wrapper = onError(componentDidCatch)(Wrapped)
  mount(<Wrapper greeting='hola' />)

  expect(componentDidCatch).not.toHaveBeenCalled()
})

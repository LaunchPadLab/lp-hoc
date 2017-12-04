import React from 'react'
import { mount } from 'enzyme'
import { onError } from '../../src'

test('`onError` has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = onError('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('onError(Wrapped)')
})

test('`onError` works when param is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidCatch = jest.fn()
  const Wrapper = onError(componentDidCatch)(Wrapped)
  mount(<Wrapper greeting='hola' />)

  expect(componentDidCatch).toHaveBeenCalledWith({ greeting: 'hola' })
})

test('`onError` works when param is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidCatch = 'errorFunction'
  const Wrapper = onError(componentDidCatch)(Wrapped)
  const errorFunction = jest.fn()
  mount(<Wrapper errorFunction={errorFunction} />)

  expect(errorFunction).toHaveBeenCalled()
})


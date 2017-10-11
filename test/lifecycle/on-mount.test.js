import React from 'react'
import { mount } from 'enzyme'
import { onMount } from '../../src'

test('`onMount` has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = onMount('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('onMount(Wrapped)')
})

test('`onMount` works when param is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidMount = jest.fn()
  const Wrapper = onMount(componentDidMount)(Wrapped)
  mount(<Wrapper greeting='hola' />)

  expect(componentDidMount).toHaveBeenCalledWith({ greeting: 'hola' })
})

test('`onMount` works when param is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidMount = 'mountFunction'
  const Wrapper = onMount(componentDidMount)(Wrapped)
  const mountFunction = jest.fn()
  mount(<Wrapper mountFunction={mountFunction} />)

  expect(mountFunction).toHaveBeenCalled()
})


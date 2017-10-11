import React from 'react'
import { mount } from 'enzyme'
import { onUpdate } from '../../src/'

test('`onUpdate` has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = onUpdate('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('onUpdate(Wrapped)')
})

test('`onUpdate` works when param is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidUpdate = jest.fn()
  const Wrapper = onUpdate(componentDidUpdate)(Wrapped)

  const initialProps = { foo: 0, bar: true }
  const component = mount(<Wrapper { ...initialProps }/>)

  expect(component.find('h1').exists()).toBe(true)

  const newProps = { foo: 1, bar: false }
  component.setProps(newProps)

  expect(componentDidUpdate).toHaveBeenCalledWith(newProps, initialProps)
})

test('`onUpdate` works when param is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentDidUpdate = jest.fn()
  const Wrapper = onUpdate('componentDidUpdate')(Wrapped)

  const initialProps = { foo: 0, bar: true, componentDidUpdate }
  const component = mount(<Wrapper { ...initialProps }/>)

  expect(component.find('h1').exists()).toBe(true)

  const newProps = { foo: 1, bar: false, componentDidUpdate }
  component.setProps(newProps)

  expect(componentDidUpdate).toHaveBeenCalledWith(newProps, initialProps)
})


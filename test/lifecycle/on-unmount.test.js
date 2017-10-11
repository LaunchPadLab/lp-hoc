import React from 'react'
import { mount } from 'enzyme'
import { onUnmount } from '../../src'

test('`onUnmount` has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = onUnmount('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('onUnmount(Wrapped)')
})

test('`onUnmount` works when param is a function', () => {
  const Wrapped = () => <h1>hi</h1>
  const componentWillUnmount = jest.fn()
  const UnmountWrapper = onUnmount(componentWillUnmount)(Wrapped)
  const wrapper = mount(<UnmountWrapper greeting='hola' />)
  expect(componentWillUnmount).not.toHaveBeenCalled()
  wrapper.unmount()
  expect(componentWillUnmount).toHaveBeenCalledWith({ greeting: 'hola' })
})

test('`onUnmount` works when param is a string', () => {
  const Wrapped = () => <h1>hi</h1>
  const UnmountWrapper = onUnmount('unmountFunctionName')(Wrapped)
  const unmountFunction = jest.fn()
  const wrapper = mount(<UnmountWrapper unmountFunctionName={unmountFunction} />)
  expect(unmountFunction).not.toHaveBeenCalled()
  wrapper.unmount()
  expect(unmountFunction).toHaveBeenCalled()
})

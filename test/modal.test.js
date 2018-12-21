import React from 'react'
import { modal } from '../src/'

test('modal exposes the `show` function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal({ name: 'TestModal' })(Wrapped)
  const spy = jest.spyOn(Wrapper, 'show')
  const props = { foo: true }
  const showResponse = Wrapper.show(props)
  expect(spy).toHaveBeenCalled()
  expect(showResponse.type).toEqual('@redux-modal/SHOW')
  expect(showResponse.payload.props).toEqual(props)
})

test('wrapped `show` function ignores event arguments', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal({ name: 'TestModal' })(Wrapped)
  const spy = jest.spyOn(Wrapper, 'show')
  const showResponse = Wrapper.show(new Event('click'))
  expect(spy).toHaveBeenCalled()
  expect(showResponse.type).toEqual('@redux-modal/SHOW')
  expect(showResponse.payload.props).toEqual({})
})

test('modal exposes the `hide` function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal({ name: 'TestModal' })(Wrapped)
  const spy = jest.spyOn(Wrapper, 'hide')
  const hideResponse = Wrapper.hide()
  expect(spy).toHaveBeenCalled()
  expect(hideResponse.type).toEqual('@redux-modal/HIDE')
})

test('modal exposes the `destroy` function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal({ name: 'TestModal' })(Wrapped)
  const spy = jest.spyOn(Wrapper, 'destroy')
  const destroyResponse = Wrapper.destroy()
  expect(spy).toHaveBeenCalled()
  expect(destroyResponse.type).toEqual('@redux-modal/DESTROY')
})

test('modal throws an error when `name` prop is missing', () => {
  const Wrapped = () => <h1>Hi</h1>
  expect(() => modal()(Wrapped)).toThrow()
})

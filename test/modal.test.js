import React from 'react'
import { modal } from '../src/'

test('modal has correct displayName', () => {
  const Wrapped = () => <h1>Alert!</h1>
  const Wrapper = modal({ name: 'AlertModal' })(Wrapped)
  expect(Wrapper.displayName).toEqual('AlertModal')
})

test('modal exposes the `show` function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal()(Wrapped)
  const spy = jest.spyOn(Wrapper, 'show')
  const showResponse = Wrapper.show()
  expect(spy).toHaveBeenCalled()
  expect(showResponse.type).toEqual('@redux-modal/SHOW')
})

test('modal exposes the `hide` function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal()(Wrapped)
  const spy = jest.spyOn(Wrapper, 'hide')
  const hideResponse = Wrapper.hide()
  expect(spy).toHaveBeenCalled()
  expect(hideResponse.type).toEqual('@redux-modal/HIDE')
})

test('modal exposes the `destroy` function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal()(Wrapped)
  const spy = jest.spyOn(Wrapper, 'destroy')
  const destroyResponse = Wrapper.destroy()
  expect(spy).toHaveBeenCalled()
  expect(destroyResponse.type).toEqual('@redux-modal/DESTROY')
})

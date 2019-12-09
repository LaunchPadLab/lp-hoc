import React from 'react'
import { mount } from 'enzyme'
import { modal, modalReducer } from '../src/'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

function createModalStore() {
  const reducer = combineReducers({ modal: modalReducer })
  return createStore(reducer)
}

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

test('modalReducer is exported as top-level export', () => {
  expect(modalReducer).toBe(require('redux-modal').reducer)
})

test('modal uses default modal component if none is specified', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal({ name: 'TestModal' })(Wrapped)
  const store = createModalStore()
  store.dispatch(Wrapper.show())
  const modalComponent = mount(
    <Provider store={store}>
      <Wrapper />
    </Provider>
  )
  expect(modalComponent.find('.modal-inner').exists()).toBe(true)
  expect(modalComponent.find(Wrapped).exists()).toBe(true)
})

test('modal uses custom modal component if one is specified', () => {
  const Wrapped = () => <h1>Hi</h1>
  const CustomModal = ({ children }) => <marquee>{children}</marquee> // eslint-disable-line
  const Wrapper = modal({ name: 'TestModal', component: CustomModal })(Wrapped)
  const store = createModalStore()
  store.dispatch(Wrapper.show())
  const modalComponent = mount(
    <Provider store={store}>
      <Wrapper />
    </Provider>
  )
  expect(modalComponent.find('.modal').exists()).toBe(false)
  expect(modalComponent.find(CustomModal).exists()).toBe(true)
  expect(modalComponent.find(Wrapped).exists()).toBe(true)
})

test('modal uses no wrapper if component argument is null', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modal({ name: 'TestModal', component: null })(Wrapped)
  const store = createModalStore()
  store.dispatch(Wrapper.show())
  const modalComponent = mount(
    <Provider store={store}>
      <Wrapper />
    </Provider>
  )
  expect(modalComponent.find('.modal').exists()).toBe(false)
  expect(modalComponent.find(Wrapped).exists()).toBe(true)
})

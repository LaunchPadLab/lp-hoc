import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'
import { mount } from 'enzyme'
import {
  LP_API_STATUS_SUCCESS,
  LP_API_STATUS_FAILURE,
  LP_API_STATUS_LOADING,
  reducer as apiReducer 
} from '@launchpadlab/lp-redux-api'
import { waitForResponse } from '../src'

function lpApiAction (key, status) {
  return { type: 'LP_API_ACTION', payload: { key, status } }
}

// Use Api reducer in test stores
const reducer = combineReducers({ api: apiReducer }) 

// Wrap components with provider
function wrapWithProvider (store) {
  return Component =>
    function ProviderWrapper (props) {
      return (
        <Provider store={ store }>
          <Component { ...props } />
        </Provider>
      )
    }
}

const REQ_KEY_ONE = 'REQ_KEY_ONE'
const REQ_KEY_TWO = 'REQ_KEY_TWO'

test('waitForResponse renders when response is received', () => {
  const store = createStore(reducer)

  const Wrapped = () => <h1>hi</h1>
  const Wrapper = compose(
    wrapWithProvider(store),
    waitForResponse(REQ_KEY_ONE),
  )(Wrapped)

  const component = mount(<Wrapper/>)
  expect(component.find('h1').exists()).toBe(false)
  store.dispatch(lpApiAction(REQ_KEY_ONE, LP_API_STATUS_SUCCESS))
  component.update()
  expect(component.find('h1').exists()).toBe(true)
  store.dispatch(lpApiAction(REQ_KEY_ONE, LP_API_STATUS_LOADING))
  component.update()
  expect(component.find('h1').exists()).toBe(false)
  store.dispatch(lpApiAction(REQ_KEY_ONE, LP_API_STATUS_FAILURE))
  component.update()
  expect(component.find('h1').exists()).toBe(true)
})

test('waitForResponse renders when multiple responses are received', () => {
  const store = createStore(reducer)

  const Wrapped = () => <h1>hi</h1>
  const Wrapper = compose(
    wrapWithProvider(store),
    waitForResponse([REQ_KEY_ONE, REQ_KEY_TWO]),
  )(Wrapped)

  const component = mount(<Wrapper/>)
  expect(component.find('h1').exists()).toBe(false)
  store.dispatch(lpApiAction(REQ_KEY_ONE, LP_API_STATUS_SUCCESS))
  component.update()
  expect(component.find('h1').exists()).toBe(false)
  store.dispatch(lpApiAction(REQ_KEY_TWO, LP_API_STATUS_SUCCESS))
  component.update()
  expect(component.find('h1').exists()).toBe(true)
  store.dispatch(lpApiAction(REQ_KEY_ONE, LP_API_STATUS_FAILURE))
  component.update()
  expect(component.find('h1').exists()).toBe(true)
})

test('waitForResponse renders custom loading component', () => {
  const store = createStore(reducer)
  
  const Wrapped = () => <h1>hi</h1>
  const Loading = () => <label>loading</label>
  const Wrapper = compose(
    wrapWithProvider(store),
    waitForResponse(REQ_KEY_ONE, Loading),
  )(Wrapped)

  const component = mount(<Wrapper/>)
  expect(component.find('h1').exists()).toBe(false)
  expect(component.find('label').exists()).toBe(true)
  store.dispatch(lpApiAction(REQ_KEY_ONE, LP_API_STATUS_SUCCESS))
  component.update()
  expect(component.find('h1').exists()).toBe(true)
  expect(component.find('label').exists()).toBe(false)
})

test('waitForResponse doesnt pass down internal _doLoad prop', () => {
  const store = createStore(reducer)

  const Wrapped = () => <h1>hi</h1>
  const Wrapper = compose(
    wrapWithProvider(store),
    waitForResponse(REQ_KEY_ONE),
  )(Wrapped)


  const component = mount(<Wrapper foo="bar"/>)
  store.dispatch(lpApiAction(REQ_KEY_ONE, LP_API_STATUS_SUCCESS))
  component.update()
  const props = component.find(Wrapped).props()
  expect(props.foo).toEqual('bar')
  expect(props._doLoad).toEqual(undefined)
})

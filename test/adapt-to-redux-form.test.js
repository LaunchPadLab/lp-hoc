import React from 'react'
import { mount } from 'enzyme'
import { adaptToReduxForm } from '../src'

test('adaptToReduxForm has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = adaptToReduxForm()(Wrapped)
  expect(Wrapper.displayName).toEqual('adaptToReduxForm(Wrapped)')
})

test('adaptToReduxForm parses input props correctly', () => {
  const value = 'my-value'
  const onChange = 'my-on-change'
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = adaptToReduxForm()(Wrapped)
  const component = mount(<Wrapper input={{ value, onChange }} />)
  expect(component.find(Wrapped).props()).toEqual({ value, onChange })
})

test('adaptToReduxForm passes non-input props through', () => {
  const otherProp = 'some-other-prop'
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = adaptToReduxForm()(Wrapped)
  const component = mount(<Wrapper input={{}} otherProp={ otherProp } />)
  expect(component.find(Wrapped).props().otherProp).toEqual(otherProp)
})

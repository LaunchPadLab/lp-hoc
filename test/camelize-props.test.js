import React from 'react'
import { shallow } from 'enzyme'
import { camelizeProps } from '../src/'


test('camelizeProps camelizes all keys if no argument is given', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = camelizeProps()(Wrapped)
  const component = shallow(<Wrapper test_prop="foo" other_prop="bar" />)
  const propNames = Object.keys(component.props())
  expect(propNames).toEqual(['testProp', 'otherProp'])
})

test('camelizeProps camelizes one key if a string argument is given', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = camelizeProps('test_prop')(Wrapped)
  const component = shallow(<Wrapper test_prop="foo" other_prop="bar" />)
  const propNames = Object.keys(component.props())
  expect(propNames).toEqual(['testProp', 'other_prop'])
})

test('camelizeProps camelizes multiple keys if an array argument is given', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = camelizeProps(['test_prop', 'other_prop'])(Wrapped)
  const component = shallow(<Wrapper test_prop="foo" other_prop="bar" />)
  const propNames = Object.keys(component.props())
  expect(propNames).toEqual(['testProp', 'otherProp'])
})

test('camelizeProps camelizes nested keys', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = camelizeProps()(Wrapped)
  const component = shallow(<Wrapper test_prop={{ other_prop: 'bar' }} />)
  expect(component.props()).toEqual({ testProp: { otherProp: 'bar' } })
})

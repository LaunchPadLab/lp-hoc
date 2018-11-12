import React from 'react'
import { mount } from 'enzyme'
import { withClassName } from '../src'

test('withClassName adds default class to functional components', () => {
  const Wrapped = () => <h1>hi</h1>
  const Wrapper = withClassName('foo')(Wrapped)
  const component = mount(<Wrapper />)
  expect(component.find(Wrapped).props().className).toEqual('foo')
})

test('withClassName adds default class to string tags', () => {
  const Wrapper = withClassName('foo')('div')
  const component = mount(<Wrapper />)
  expect(component.find('div').props().className).toEqual('foo')
})

test('withClassName extends className instead of overriding', () => {
  const Wrapper = withClassName('foo')('div')
  const component = mount(<Wrapper className="bar" />)
  expect(component.find('div').props().className).toEqual('foo bar')
})

test('withClassName ignores empty argument', () => {
  const Wrapper = withClassName()('div')
  const component = mount(<Wrapper className="bar" />)
  expect(component.find('div').props().className).toEqual('bar')
})
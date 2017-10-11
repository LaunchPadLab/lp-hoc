import React from 'react'
import { mount } from 'enzyme'
import { addDefaultClass } from '../src/'

test('addDefaultClass adds default class to functional components', () => {
  const Wrapped = () => <h1>hi</h1>
  const Wrapper = addDefaultClass('foo')(Wrapped)
  const component = mount(<Wrapper />)
  expect(component.find(Wrapped).props().className).toEqual('foo')
})

test('addDefaultClass adds default class to string tags', () => {
  const Wrapper = addDefaultClass('foo')('div')
  const component = mount(<Wrapper />)
  expect(component.find('div').props().className).toEqual('foo')
})

test('addDefaultClass extends className instead of overriding', () => {
  const Wrapper = addDefaultClass('foo')('div')
  const component = mount(<Wrapper className="bar" />)
  expect(component.find('div').props().className).toEqual('foo bar')
})

test('addDefaultClass ignores empty argument', () => {
  const Wrapper = addDefaultClass()('div')
  const component = mount(<Wrapper className="bar" />)
  expect(component.find('div').props().className).toEqual('bar')
})
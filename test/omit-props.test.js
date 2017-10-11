import React from 'react'
import { shallow } from 'enzyme'
import { omitProps } from '../src/'

test('omitProps omits all props if no argument is given', () => {
  const props = {
    test: 'foo',
    test2: 'bar',
  }
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = omitProps()(Wrapped)
  const component = shallow(<Wrapper { ...props }/>)
  expect(component.props()).toEqual({})
})

test('omitProps can omit a single prop', () => {
  const props = {
    test: 'foo',
    test2: 'bar',
  }
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = omitProps('test')(Wrapped)
  const component = shallow(<Wrapper { ...props }/>)
  expect(component.props()).toEqual({ test2: 'bar' })
})

test('omitProps can omit multiple props', () => {
  const props = {
    test: 'foo',
    test2: 'bar',
  }
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = omitProps(['test', 'test2'])(Wrapped)
  const component = shallow(<Wrapper { ...props }/>)
  expect(component.props()).toEqual({})
})

import React from 'react'
import { shallow } from 'enzyme'
import { modifyProps } from '../src/'

test('modifyProps has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modifyProps(() => {})(Wrapped)
  expect(Wrapper.displayName).toEqual('modifyProps(Wrapped)')
})

test('modifyProps adds new props to component', () => {
  function modify () {
    return {
      foo: 'bar'
    }
  }
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modifyProps(modify)(Wrapped)
  const component = shallow(<Wrapper/>)

  const { foo } = component.props()
  expect(foo).toEqual('bar')
})

test('modifyProps overrides original props', () => {
  function modify () {
    return {
      foo: 'bar'
    }
  }
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = modifyProps(modify)(Wrapped)
  const component = shallow(<Wrapper foo="baz" other="other" />)

  const { foo, other } = component.props()
  expect(foo).toEqual('bar')
  expect(other).toEqual('other')
})

test('modifyProps requires a function argument', () => {
  const Wrapped = () => <h1>Hi</h1>
  expect(() => modifyProps()(Wrapped)).toThrow()
  expect(() => modifyProps(null)(Wrapped)).toThrow()
  expect(() => modifyProps(5)(Wrapped)).toThrow()
})

import React from 'react'
import { shallow } from 'enzyme'
import { connectQuery } from '../src/'

test('connectQuery has the correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = connectQuery('test')(Wrapped)
  expect(Wrapper.displayName).toBe('connectQuery(Wrapped)')
})

test('connectQuery adds specified prop from query param to component', () => {
  window.history.pushState({}, 'Test Title', '/test?token=12XYe4')
  
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = connectQuery('token')(Wrapped)
  const component = shallow(<Wrapper />)
  
  const { token } = component.props()
  expect(token).toBe('12XYe4')
})

test('connectQuery camelizes prop appropriately by default', () => {
  window.history.pushState({}, 'Test Title', '/test?auth_token=1234')
  
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = connectQuery('authToken')(Wrapped)
  const component = shallow(<Wrapper />)
  
  const { authToken, auth_token } = component.props()
  expect(authToken).toBe(1234)
  expect(auth_token).toBeUndefined()
})

test('connectQuery will not camelize prop when option is set to false', () => {
  window.history.pushState({}, 'Test Title', '/test?auth_token=1234')
  
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = connectQuery('auth_token', { camelize: false })(Wrapped)
  const component = shallow(<Wrapper />)
  
  const { auth_token, authToken } = component.props()
  expect(auth_token).toBe(1234)
  expect(authToken).toBeUndefined()
})

test('connectQuery adds specified props from query param to component', () => {
  window.history.pushState({}, 'Test Title', '/test?token=12XY24&strict=yes')
  
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = connectQuery(['token', 'strict'])(Wrapped)
  const component = shallow(<Wrapper />)
  
  const { token, strict } = component.props()
  expect(token).toBe('12XY24')
  expect(strict).toBe('yes')
})

test('connectQuery coerces values to their appropriate primitives', () => {
  window.history.pushState({}, 'Test Title', '/test?token=1234&strict=true')
  
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = connectQuery(['token', 'strict'])(Wrapped)
  const component = shallow(<Wrapper />)
  
  const { token, strict } = component.props()
  expect(token).toBe(1234)
  expect(strict).toBe(true)
})

test('connectQuery accepts a transform function', () => {
  window.history.pushState({}, 'Test Title', '/test?token=1234')
  
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = connectQuery(({ token }) => ({ authorizationToken: token }))(Wrapped)
  const component = shallow(<Wrapper />)
  
  const { authorizationToken, token } = component.props()
  expect(authorizationToken).toBe(1234)
  expect(token).toBeUndefined()
})

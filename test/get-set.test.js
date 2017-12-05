import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import { getSet, getSetPropTypes } from '../src'

test('getSet has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = getSet('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('getSet(Wrapped)')
})

test('getSet provides a value and a setter function', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = getSet('test')(Wrapped)
  const component = shallow(<Wrapper/>)

  // Check props
  const { test, setTest } = component.props()
  expect(test).toBe(null)
  expect(typeof setTest).toBe('function')

  // Call setter
  setTest('foo')
  component.update()
  expect(component.props().test).toBe('foo')
  setTest('bar')
  component.update()
  expect(component.props().test).toBe('bar')
})

test('getSet provides multiple values and setter functions', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = getSet(['test', 'otherTest'])(Wrapped)
  const component = shallow(<Wrapper/>)

  // Check props
  const { test, setTest, otherTest, setOtherTest } = component.props()
  expect(test).toBe(null)
  expect(typeof setTest).toBe('function')
  expect(otherTest).toBe(null)
  expect(typeof setOtherTest).toBe('function')

  // Call setters
  setTest('foo')
  component.update()
  expect(component.props().test).toBe('foo')
  setOtherTest('bar')
  component.update()
  expect(component.props().otherTest).toBe('bar')
})

test('getSet sets initial values correctly', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = getSet(['test', 'otherTest', 'finalTest'], {
    initialValues: {
      test: 5,
      finalTest: 'howdy'
    }
  })(Wrapped)
  const component = shallow(<Wrapper/>)

  // Check props
  const { test, otherTest, finalTest } = component.props()
  expect(test).toBe(5)
  expect(otherTest).toBe(null)
  expect(finalTest).toBe('howdy')
})

test('getSet can set initial values from props', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = getSet('foo')(Wrapped)
  const component = shallow(<Wrapper initialValues={ { foo: 29 } } />)

  // Check props
  const { foo } = component.props()
  expect(foo).toBe(29)

})

test('getSet can receive falsey initial values', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = getSet('foo')(Wrapped)
  const component = shallow(<Wrapper initialValues={ { foo: false } } />)

  // Check props
  const { foo } = component.props()
  expect(foo).toBe(false)

})

test('getSet overrides given props', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = getSet('foo')(Wrapped)
  const component = shallow(<Wrapper foo={ 666 }/>)
  // Check props
  const { foo } = component.props()
  expect(foo).toBe(null)
})

test('getSetPropTypes creates proptypes with the correct name and value', () => {
  const expectedPropTypes = {
    test: PropTypes.any,
    setTest: PropTypes.func,
    otherTest: PropTypes.any,
    setOtherTest: PropTypes.func,
  }
  expect(getSetPropTypes(['test', 'otherTest'])).toEqual(expectedPropTypes)
})

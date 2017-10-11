import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'
import { toggle, togglePropTypes } from '../src/'

test('toggle has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = toggle('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('toggle(Wrapped)')
})

test('toggle provides a toggle value and setter function', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = toggle('test')(Wrapped)
  const component = shallow(<Wrapper/>)

  // Check props
  const { test, setTest } = component.props()
  expect(test).toBe(false)
  expect(typeof setTest).toBe('function')

  // Call setter
  setTest(true)
  expect(component.props().test).toBe(true)
  setTest(false)
  expect(component.props().test).toBe(false)

  // Don't allow non-bool values
  expect(() => setTest('string')).toThrow()
})

test('toggle provides a toggle value and toggle function', () => {

  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = toggle('test')(Wrapped)
  const component = shallow(<Wrapper/>)

  // Check props
  const { test, toggleTest } = component.props()
  expect(test).toBe(false)
  expect(typeof toggleTest).toBe('function')

  // Call toggle
  toggleTest()
  expect(component.props().test).toBe(true)
  toggleTest()
  expect(component.props().test).toBe(false)
})

test('toggle overrides given props', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = toggle('foo')(Wrapped)
  const component = shallow(<Wrapper foo={ 666 }/>)
  // Check props
  const { foo } = component.props()
  expect(foo).toBe(false)
})

test('toggleProptypes creates proptypes with the correct name and value', () => {
  const expectedPropTypes = {
    test: PropTypes.bool,
    setTest: PropTypes.func,
    toggleTest: PropTypes.func,
    test2: PropTypes.bool,
    setTest2: PropTypes.func,
    toggleTest2: PropTypes.func,
  }
  expect(togglePropTypes(['test', 'test2'])).toEqual(expectedPropTypes)
})

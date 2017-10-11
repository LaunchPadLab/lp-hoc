import React from 'react'
import { shallow } from 'enzyme'
import { sortable } from '../src/'

test('sortable has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable()(Wrapped)
  expect(Wrapper.displayName).toEqual('sortable(Wrapped)')
})

test('sortable provides a working sort function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable({
    sortPath: 'age'
  })(Wrapped)
  const component = shallow(<Wrapper/>)
  // Check sort function
  const { sort } = component.props()
  const unsorted = [{ age: 2 }, { age: 1 }, { age: 3 }]
  const sorted = [{ age: 1 }, { age: 2 }, { age: 3 }]
  expect(sort(unsorted)).toEqual(sorted)
})

test('sortable setter functions work', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable({ ascending: false })(Wrapped)
  const component = shallow(<Wrapper/>)
  // Check ascending
  const { setAscending, setSortFunc } = component.props()
  expect(component.props().ascending).toEqual(false)
  setAscending(true)
  expect(component.props().ascending).toEqual(true)
  // Check sortFunc
  const reverseSortFunc = (a, b) => (a > b) ? -1 : 1
  const unsorted = [1, 3, 2]
  const sorted = [3, 2, 1]
  setSortFunc(reverseSortFunc)
  expect(component.props().sort(unsorted)).toEqual(sorted)
})

test('sortable setSortPath toggles sort order', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable({ sortPath: 'foo' })(Wrapped)
  const component = shallow(<Wrapper/>)
  // Check setSortPath
  const { setSortPath } = component.props()
  expect(component.props().ascending).toEqual(true)
  // Expect toggle if path is unchanged
  setSortPath('foo')
  expect(component.props().ascending).toEqual(false)
  // Expect no toggle if flag is passed
  setSortPath('foo', false)
  expect(component.props().ascending).toEqual(false)
  // Expect ascending set to true if path is different
  setSortPath('bar')
  expect(component.props().ascending).toEqual(true)
})

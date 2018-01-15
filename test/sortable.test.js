import React from 'react'
import { mount } from 'enzyme'
import { sortable } from '../src/'

test('sortable has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable()(Wrapped)
  expect(Wrapper.displayName).toEqual('sortable(Wrapped)')
})

test('sortable provides a working sort function', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable({
    initialSortPath: 'age'
  })(Wrapped)
  const component = mount(<Wrapper/>)
  // Check sort function
  const { sort } = component.find(Wrapped).props()
  const unsorted = [{ age: 2 }, { age: 1 }, { age: 3 }]
  const sorted = [{ age: 1 }, { age: 2 }, { age: 3 }]
  expect(sort(unsorted)).toEqual(sorted)
})

test('sortable setter functions work', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable({ initialAscending: false })(Wrapped)
  const component = mount(<Wrapper/>)
  // Check ascending
  const { setAscending, setSortFunc } = component.find(Wrapped).props()
  expect(component.find(Wrapped).props().ascending).toEqual(false)
  setAscending(true)
  component.update()
  expect(component.find(Wrapped).props().ascending).toEqual(true)
  // // Check sortFunc
  const reverseSortFunc = (a, b) => (a > b) ? -1 : 1
  const unsorted = [1, 3, 2]
  const sorted = [3, 2, 1]
  setSortFunc(reverseSortFunc)
  expect(component.find(Wrapped).props().sort(unsorted)).toEqual(sorted)
})

test('sortable setSortPath toggles sort order', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = sortable({ initialSortPath: 'foo' })(Wrapped)
  const component = mount(<Wrapper/>)
  // Check setSortPath
  const { setSortPath } = component.find(Wrapped).props()
  expect(component.find(Wrapped).props().ascending).toEqual(true)
  // Expect toggle if path is unchanged
  setSortPath('foo')
  component.update()
  expect(component.find(Wrapped).props().ascending).toEqual(false)
  // Expect no toggle if flag is passed
  setSortPath('foo', false)
  component.update()
  expect(component.find(Wrapped).props().ascending).toEqual(false)
  // Expect ascending set to true if path is different
  setSortPath('bar')
  component.update()
  expect(component.find(Wrapped).props().ascending).toEqual(true)
})

test('sortable onChange is called when sort state is updated', () => {
  const Wrapped = () => <h1>Hi</h1>
  const onChange = jest.fn()
  const Wrapper = sortable({
    initialSortPath: 'age',
    onChange,
  })(Wrapped)
  const component = mount(<Wrapper/>)
  const { setSortPath } = component.find(Wrapped).props()
  setSortPath('age')
  expect(onChange).toHaveBeenCalledWith({
    ascending: false,
    sortPath: 'age',
    sortFunc: undefined,
  })
})
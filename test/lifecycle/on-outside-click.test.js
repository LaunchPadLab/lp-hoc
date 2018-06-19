import React from 'react'
import { mount } from 'enzyme'
import { onOutsideClick } from '../../src'

// This lets us simulate a click event on the document object.
// Now we can call `documentEventSimulator.click(event)`
// https://github.com/airbnb/enzyme/issues/426#issuecomment-228601631

const documentEventSimulator = {}
document.addEventListener = jest.fn((event, cb) => {
  documentEventSimulator[event] = cb
})

// Tests

test('`onOutsideClick` has correct displayName', () => {
  const Wrapped = () => <h1>Hi</h1>
  const Wrapper = onOutsideClick('test')(Wrapped)
  expect(Wrapper.displayName).toEqual('onOutsideClick(Wrapped)')
})

test('`onOutsideClick` handler is not called if click occurs inside component', (done) => {
  const Wrapped = (props) => <h1 { ...props }>hi</h1>
  const handler = jest.fn()
  const OnOutsideClickWrapper = onOutsideClick(handler)(Wrapped)
  function simulateDocumentClick (e) {
    documentEventSimulator.click(e)
    expect(handler).not.toHaveBeenCalled()
    done()
  }
  const wrapper = mount(<div><OnOutsideClickWrapper onClick={ simulateDocumentClick } /></div>)
  wrapper.find(Wrapped).simulate('click')
})

test('`onOutsideClick` handler is called if click occurs outside component', (done) => {
  const Wrapped = (props) => <h1 { ...props }>hi</h1>
  const handler = jest.fn()
  const OnOutsideClickWrapper = onOutsideClick(handler)(Wrapped)
  function simulateDocumentClick (e) {
    documentEventSimulator.click(e)
    expect(handler).toHaveBeenCalled()
    done()
  }
  const wrapper = mount(<div id="outer-element" onClick={ simulateDocumentClick } ><OnOutsideClickWrapper /></div>)
  wrapper.find('#outer-element').simulate('click')
})

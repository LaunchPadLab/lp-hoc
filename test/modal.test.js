import React from 'react'
import { shallow } from 'enzyme'
import { modal } from '../src/'

test('modal has correct displayName', () => {
  const Wrapped = () => <h1>Alert!</h1>
  const Wrapper = modal({ name: 'AlertModal' })(Wrapped)
  console.log(Wrapper)
  expect(Wrapper.displayName).toEqual('ConnectModal(AlertModal)')
})

// test('modal adds new props to component', () => {
//   const Wrapped = () => <h1>Hi</h1>
//   const Wrapper = modal()(Wrapped)
//   const subscribe = jest.fn()
//   const dispatch = jest.fn()
//   const getState = jest.fn()
//   const component = shallow(<Wrapper store={{ subscribe, dispatch, getState }} />)

//   const { show } = component.props()
//   expect(show).toEqual('bar')
// })

// test('modal overrides original props', () => {
//   function modify () {
//     return {
//       foo: 'bar'
//     }
//   }
//   const Wrapped = () => <h1>Hi</h1>
//   const Wrapper = modal(modify)(Wrapped)
//   const component = shallow(<Wrapper foo="baz" other="other" />)

//   const { foo, other } = component.props()
//   expect(foo).toEqual('bar')
//   expect(other).toEqual('other')
// })

// test('modal requires a function argument', () => {
//   const Wrapped = () => <h1>Hi</h1>
//   expect(() => modal()(Wrapped)).toThrow()
//   expect(() => modal(null)(Wrapped)).toThrow()
//   expect(() => modal(5)(Wrapped)).toThrow()
// })

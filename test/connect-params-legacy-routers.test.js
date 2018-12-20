import React from 'react'
import { mount } from 'enzyme'
import { connectParams } from '../src/'
import { Router, Route, createMemoryHistory } from 'react-router'

// By default the library's test suite will mock react-router as v^4.3.1. This will now use v^3.2.1 instead
jest.unmock('react-router')

describe('connectParams HOC for React Router < v4', () => {
  test('has the correct displayName', () => {
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = connectParams('test')(Wrapped)
    expect(Wrapper.displayName).toBe('withRouter(connectParams(Wrapped))')
  })
  
  test('adds specified prop from path param to component', () => {
    //eslint-disable-next-line
    const Wrapped = ({ id }) => <h1>{ id }</h1>
    const Wrapper = connectParams('id')(Wrapped)
    
    const browserHistory = createMemoryHistory('/students/2')
    
    const app = mount(
      <Router history={ browserHistory }>
        <Route path="/students/:id" component={ Wrapper } />
        <Route path="*" component={ () => <h1>hi</h1> } />
      </Router>
    )
    
    const component = app.find(Wrapped)
    expect(component.props().id).toBe(2)
    expect(component.find('h1').text()).toBe('2')
  })

  test('does not add a prop if there is no url path parameter matched', () => {
    //eslint-disable-next-line
    const Wrapped = ({ id }) => <h1>{ id }</h1>
    const Wrapper = connectParams('student')(Wrapped)
    
    const browserHistory = createMemoryHistory('/students/2')
    
    const app = mount(
      <Router history={ browserHistory }>
        <Route path="/students/:id" component={ Wrapper } />
        <Route path="*" component={ () => <h1>hi</h1> } />
      </Router>
    )
    
    const component = app.find(Wrapped)
    expect(component.props().student).toBeUndefined()
    expect(component.find('h1').text()).toBe('')
  })
  
  test('accepts a transform function', () => {
    //eslint-disable-next-line
    const Wrapped = ({ studentId }) => <h1>{ studentId }</h1>
    const Wrapper = connectParams(({ id }) => ({ studentId: id }))(Wrapped)
    
    const browserHistory = createMemoryHistory('/students/2')
    
    const app = mount(
      <Router history={ browserHistory }>
        <Route path="/students/:id" component={ Wrapper } />
        <Route path="*" component={ () => <h1>hi</h1> } />
      </Router>
    )
    
    const component = app.find(Wrapped)
    const { studentId, id } = component.props()
    expect(studentId).toBe(2)
    expect(id).toBeUndefined()
    expect(component.find('h1').text()).toBe('2')
  })
  
  test('accepts multiple param paths', () => {
    //eslint-disable-next-line
    const Wrapped = ({ first, last }) => <h1>{ `${first} ${last}` }</h1>
    const Wrapper = connectParams(['first', 'last'])(Wrapped)
    
    const browserHistory = createMemoryHistory('/students/leon/bridges')
    
    const app = mount(
      <Router history={ browserHistory }>
        <Route path="/students/:first/:last" component={ Wrapper } />
        <Route path="*" component={ () => <h1>hi</h1> } />
      </Router>
    )
    
    const component = app.find(Wrapped)
    const { first, last } = component.props()
    expect(first).toBe('leon')
    expect(last).toBe('bridges')
    expect(component.find('h1').text()).toBe('leon bridges')
  })
  
  test('works when not directly connected to a Route', () => {
    // jest.unmock('react-router')
    //eslint-disable-next-line
    const Wrapped = ({ id }) => <h1>{ id }</h1>
    const Wrapper = connectParams('id')(Wrapped)
    const Parent = () => <div><Wrapper /></div>
    
    const browserHistory = createMemoryHistory('/students/2')
    
    const app = mount(
      <Router history={ browserHistory }>
        <Route path="/students/:id" component={ Parent } />
        <Route path="*" component={ () => <h1>hi</h1> } />
      </Router>
    )
    
    const component = app.find(Wrapped)
    expect(component.props().id).toBe(2)
    expect(component.find('h1').text()).toBe('2')
  })
})

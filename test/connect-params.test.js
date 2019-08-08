import React from 'react'
import { mount } from 'enzyme'
import { connectParams } from '../src/'
import { MemoryRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'

describe('connectParams HOC for React Router v^4', () => {
  test('has the correct displayName', () => {
    const Wrapped = () => <h1>Hi</h1>
    const Wrapper = connectParams('test')(Wrapped)
    expect(Wrapper.displayName).toBe('withRouter(connectParams(Wrapped))')
  })
  
  test('adds specified prop from path param to component', () => {
    //eslint-disable-next-line
    const Wrapped = ({ id }) => <h1>{ id }</h1>
    const Wrapper = connectParams('id')(Wrapped)
    
    const app = mount(
      <MemoryRouter initialEntries={["/students/2"]}>
        <Switch>
          <Route path="/students/:id" component={ Wrapper } />
          <Route path="*" component={ () => <h1>hi</h1> } />
        </Switch>
      </MemoryRouter>
    )
    
    const component = app.find(Wrapped)
    expect(component.props().id).toBe(2)
    expect(component.find('h1').text()).toBe('2')
  })

  test('does not add a prop if there is no url path parameter matched', () => {
    //eslint-disable-next-line
    const Wrapped = ({ id }) => <h1>{ id }</h1>
    const Wrapper = connectParams('student')(Wrapped)
    
    const app = mount(
      <MemoryRouter initialEntries={["/students/2"]}>
        <Switch>
          <Route path="/students/:id" component={ Wrapper } />
          <Route path="*" component={ () => <h1>hi</h1> } />
        </Switch>
      </MemoryRouter>
    )
    
    const component = app.find(Wrapped)
    expect(component.props().student).toBeUndefined()
    expect(component.find('h1').text()).toBe('')
  })
  
  test('accepts a transform function', () => {
    //eslint-disable-next-line
    const Wrapped = ({ studentId }) => <h1>{ studentId }</h1>
    const Wrapper = connectParams(({ id }) => ({ studentId: id }))(Wrapped)
    
    const app = mount(
      <MemoryRouter initialEntries={["/students/2"]}>
        <Switch>
          <Route path="/students/:id" component={ Wrapper } />
          <Route path="*" component={ () => <h1>hi</h1> } />
        </Switch>
      </MemoryRouter>
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
    
    const app = mount(
      <MemoryRouter initialEntries={["/students/leon/bridges"]}>
        <Switch>
          <Route path="/students/:first/:last" component={ Wrapper } />
          <Route path="*" component={ () => <h1>hi</h1> } />
        </Switch>
      </MemoryRouter>
    )
    
    const component = app.find(Wrapped)
    const { first, last } = component.props()
    expect(first).toBe('leon')
    expect(last).toBe('bridges')
    expect(component.find('h1').text()).toBe('leon bridges')
  })
  
  test('works when not directly connected to a Route', () => {
    //eslint-disable-next-line
    const Wrapped = ({ id }) => <h1>{ id }</h1>
    const Wrapper = connectParams('id')(Wrapped)
    const Parent = () => <div><Wrapper /></div>
    
    const app = mount(
      <MemoryRouter initialEntries={["/students/2"]}>
        <Switch>
          <Route path="/students/:id" component={ Parent } />
          <Route path="*" component={ () => <h1>hi</h1> } />
        </Switch>
      </MemoryRouter>
    )
    
    const component = app.find(Wrapped)
    expect(component.props().id).toBe(2)
    expect(component.find('h1').text()).toBe('2')
  })
})

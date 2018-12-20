import React from 'react'
import {
  coerce,
  createMapperFunc,
  get,
  mapValues,
  noop,
  wrapDisplayName,
} from './utils'
import { withRouter } from 'react-router'

/**
 * A function that returns a React HOC that converts a url's matched path parameters into props.
 * This does not require a component to be directly connected to React Router and can be further
 * nested in the component hierarchy.
 * 
 * Note: When composing together with other HOCs, make sure that this component is not blocked by another 
 * component that implements shouldComponentUpdate. For example, when using with a Redux connected 
 * component, the following sequence will *not* work.
 * 
 * compose(
 *  connect(...),
 *  connectParams,
 * )
 * 
 * For more information: https://reacttraining.com/react-router/web/api/withRouter
 * 
 * @name connectParams
 * @type Function
 * @param {Function|String|Array} mappingConfig - A function, string, or array of strings. String
 * arguments are interpreted as the names of props to pull from matched params. A function argument
 * will accept params and map them to props based on the object returned by this function 
 * (see second example below).
 * @returns {Function} - A HOC that can be used to wrap a component.
 * 
 * @example
 * 
 * // Example 1 - String argument
 * function StudentShow ({ student }) {
 *  if (!student) return <p>Loading...</p>
 * 
 *  return (
 *    <div>
 *      <h1>{ student.name }</h1>
 *    </div>
 *  )
 * }
 * 
 * function mapStateToProps (state) {
 *  return {
 *    student: selectors.student(state),
 *  }
 * }
 * 
 * const mapDispatchToProps = {
 *  fetchStudent: apiActions.fetchStudent,
 * }
 * 
 * function onComponentDidMount ({ id, fetchStudent }) {
 *  return fetchStudent(id)
 * }
 * 
 * export default compose(
 *  connectParams('id'),
 *  connect(mapStateToProps, mapDispatchToProps),
 *  onMount(onComponentDidMount),
 * )(StudentShow)
 * 
 * // Example 2 - Function argument
  * function StudentShow ({ student }) {
  *  if (!student) return <p>Loading...</p>
  * 
  *  return (
  *    <div>
  *      <h1>{ student.name }</h1>
  *    </div>
  *  )
  * }
  * 
  * function mapStateToProps (state) {
  *  return {
  *    student: selectors.student(state),
  *  }
  * }
  * 
  * const mapDispatchToProps = {
  *  fetchStudent: apiActions.fetchStudent,
  * }
  * 
  * function onComponentDidMount ({ id, fetchStudent }) {
  *  return fetchStudent(id)
  * }
  * 
  * export default compose(
  *  connectParams(({ studentId }) => ({ id: studentId })),
  *  connect(mapStateToProps, mapDispatchToProps),
  *  onMount(onComponentDidMount),
  * )(StudentShow)
 */

function grabParams (props) {
  const params = get('match.params', props) || get('params', props) // supports React Router v4 and v3, respectively
  return params ? mapValues(params, coerce) : {}
}

function connectParams (mappingConfig = noop) {
  function modify (props) {
    const params = grabParams(props)
    const mapperFunc = createMapperFunc(mappingConfig)
    
    return mapperFunc(params, props)
  }
  
  return WrappedComponent => {
    function Wrapper (props) {
      const newProps = { ...props, ...modify(props) }
      return <WrappedComponent { ...newProps } />
    }
    
    Wrapper.displayName = wrapDisplayName(WrappedComponent, 'connectParams')
    return withRouter(Wrapper)
  }
}

export default connectParams

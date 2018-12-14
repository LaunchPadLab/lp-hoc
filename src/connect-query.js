import React from 'react'
import {
  camelizeKeys,
  coerce,
  isFunction,
  mapValues,
  noop,
  parse,
  pick,
  wrapDisplayName,
} from './utils'

/**
 * A function that returns a React HOC that converts a url's query parameters into props. This is
 * particularly useful for applications using React Router v4, which no longer supports query
 * parameter parsing OOTB.
 * 
 * @name connectQuery
 * @type Function
 * @param {Function|String|Array} mappingConfig - A function, string, or array of strings. String
 * arguments are interpreted as the names of props to pull from query params (note: if the camelized
 * option is true, then the strings should be camelized accordingly).
 * @param {Object} [options] - Options for the HOC
 * @param {Boolean} [options.camelize=true] - Option to camelize query parameter keys. This is true by default
 * @returns {Function} - A HOC that can be used to wrap a component.
 * 
 * @example
 * 
 * function ResetPassword ({ token, resetPassword }) {
 *  return (
 *    <div>
 *      <ResetPasswordForm
 *        initialValues={ { token } }
 *        onSubmit={ resetPassword }
 *      />
 *    </div>
 *  )
 * }
 * 
 * const mapDispatchToProps = {
 *  resetPassword: apiActions.resetPassword,
 * }
 * 
 * export default compose(
 *  connectQuery('token'),
 *  connect(null, mapDispatchToProps),
 * )(ResetPassword)
 * 
 */

function createMapperFunc (mappingConfig) {
  if (isFunction(mappingConfig)) return mappingConfig
  
  return function map (values) {
    return pick(values, mappingConfig)
  }
}

function connectQuery (mappingConfig = noop, { camelize = true } = {}) {
  function modify (props) {
    const query = parse(window.location.search)
    const casedQuery = camelize ? camelizeKeys(query) : query
    const primitiveQuery = mapValues(casedQuery, coerce)
    const mapperFunc = createMapperFunc(mappingConfig)
    
    return mapperFunc(primitiveQuery, props)
  }
  
  return WrappedComponent => {
    function Wrapper (props) {
      const newProps = { ...props, ...modify(props) }
      return <WrappedComponent { ...newProps } />
    }
    
    Wrapper.displayName = wrapDisplayName(WrappedComponent, 'connectQuery')
    return Wrapper
  }
}

export default connectQuery

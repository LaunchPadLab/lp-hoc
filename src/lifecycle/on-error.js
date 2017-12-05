import React from 'react'
import { callWithProps } from './helpers'
import { wrapDisplayName } from '../utils'

/**
 * A function that returns a React HOC to handle logic to be run during the `componentDidCatch` lifecycle event.
 * NOTE: This HOC is only supported by React 16 or higher.
 *
 * See also: {@link onMount}, {@link onUnmount}, {@link onUpdate}
 *
 * @name onError
 * @param {Function|String} onComponentDidCatch - A function or a string reference to a function that will be executed with the component's props.
 * @returns {Function} - A HOC that can be used to wrap a component.
 * @example
 *
 *  function MyComponent () {
 *    return (
 *      ...
 *    )
 *  }
 *
 *  function onComponentDidCatch (props, error, info) {
 *    logErrorToMyService(error, info)
 *  }
 *
 *  export default onError(onComponentDidCatch)(MyComponent)
 *
**/

const SUPPORTED_REACT_VERSION = 16
const CURRENT_REACT_VERSION = Number(React.version)

export default function onError (onComponentDidCatch) {
  
  return WrappedComponent =>

    class Wrapper extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = wrapDisplayName(WrappedComponent, 'onError')

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent
      
      constructor (props) {
        super(props)
        
        if (CURRENT_REACT_VERSION && CURRENT_REACT_VERSION < SUPPORTED_REACT_VERSION) 
          /* eslint no-console: 0 */
          console.warn(`
            onError is not supported by the current React version: 
            ${ CURRENT_REACT_VERSION }.
          `)
      }

      /*
       * Invoke the provided function after an error occurs in any child component,
       * passing in any props.
       */
      componentDidCatch (error, errorInfo) {        
        callWithProps(onComponentDidCatch, this.props, error, errorInfo)
      }

      /*
       * Render the wrapped component
       */
      render () {
        return <WrappedComponent { ...this.props }/>
      }
    }
}

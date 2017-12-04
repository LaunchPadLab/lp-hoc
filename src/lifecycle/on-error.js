import React from 'react'
import { callWithProps } from './helpers'
import { wrapDisplayName } from '../utils'

/**
 * A function that returns a React HOC to handle logic to be run during the `componentDidCatch` lifecycle event.
 *
 * See also: {@link onMount}, {@link onUnmount}, {@link onUpdate}
 *
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
      
      constructor(props) {
        super(props)
        
        const reactVersion = React.version
        
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

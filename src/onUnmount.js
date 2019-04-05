import React from 'react'
import { callWithProps, wrapDisplayName } from './utils'

/**
 * A function that returns a React HOC to handle logic to be run during the `componentWillUnmount` lifecycle event.
 *
 * See also: {@link onError}, {@link onMount}, {@link onUpdate}
 *
 * @param {Function|String} onComponentWillUnmount - A function or a string reference to a function that will be executed with the component's props.
 * @returns {Function} - A HOC that can be used to wrap a component.
 * @example
 *
 *  function MyComponent () {
 *    return (
 *      ...
 *    )
 *  }
 *
 *  function componentWillUnmount (props) {
 *    console.log('Our current props: ', props)
 *  }
 *
 *  export default onUnmount(componentWillUnmount)(MyComponent)
 *
*/

export default function onUnmount (onComponentWillUnmount) {

  return WrappedComponent =>

    class Wrapper extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = wrapDisplayName(WrappedComponent, 'onUnmount')

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      /*
       * Invoke the provided function before the component unmounts, passing in
       * any props.
       */
      componentWillUnmount () {
        callWithProps(onComponentWillUnmount, this.props)
      }

      /*
       * Render the wrapped component
       */
      render () {
        return <WrappedComponent { ...this.props }/>
      }
    }
}

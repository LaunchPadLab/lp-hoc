import React from 'react'
import { callWithProps, wrapDisplayName } from '../utils'

/**
 * A function that returns a React HOC to handle logic to be run during the `componentDidUpdate` lifecycle event.
 *
 * See also: {@link onError}, {@link onMount}, {@link onUnmount}
 *
 * @param {Function|String} onComponentDidUpdate - A function or a string reference to a function that will be passed the current props and the previous props.
 * @returns {Function} - A HOC that can be used to wrap a component.
 * @example
 *
 *  function MyComponent () {
 *    return (
 *      ...
 *    )
 *  }
 *
 *  function componentDidUpdate (currentProps, previousProps) {
 *    console.log('Props updated!', currentProps, previousProps)
 *  }
 *
 *  export default onUpdate(componentDidUpdate)(MyComponent)
 *
**/

export default function onUpdate (onComponentDidUpdate) {

  return WrappedComponent =>

    class OnUpdate extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = wrapDisplayName(WrappedComponent, 'onUpdate')

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      /*
       * Invoke the provided function after the component updates, passing in
       * the current and previous props.
       */
      componentDidUpdate (prevProps) {
        callWithProps(onComponentDidUpdate, this.props, prevProps)
      }

      /*
       * Render the wrapped component
       */
      render () {
        return <WrappedComponent { ...this.props }/>
      }
    }
}

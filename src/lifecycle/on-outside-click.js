import React from 'react'
import { callWithProps, wrapDisplayName } from '../utils'

/**
 * A function that returns a React HOC to handle logic to be run when a click occurs outside of a component.
 *
 * @name onOutsideClick
 * @param {Function|String} handler - A function or a string reference to a function that will be executed with the component's props and the click event.
 * @returns {Function} - A HOC that can be used to wrap a component.
 * @example
 *
 *  function MyComponent () {
 *    return (
 *      ...
 *    )
 *  }
 *
 *  function handleOutsideClick (props, e) {
 *    console.log('A click event occured!', e)
 *  }
 *
 *  export default onOutsideClick(handleOutsideClick)(MyComponent)
 *
**/

export default function onOutsideClick (handler) {

  return WrappedComponent =>

    class Wrapper extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = wrapDisplayName(WrappedComponent, 'onOutsideClick')

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      /*
       * Bind instance methods
       */
      constructor (props) {
        super(props)
        this.handleClickOutside = this.handleClickOutside.bind(this)
      }

      /*
       * Bind click handler to document on mount
       */
      componentDidMount () {
        document.addEventListener('click', this.handleClickOutside)
      }

      /*
       * Unbind click handler from document on unmount
       */
      componentWillUnmount () {
        document.removeEventListener('click', this.handleClickOutside)
      }

      /*
       * Respond to click event
       */
      handleClickOutside (e) {
        if (this.node && !this.node.contains(e.target)) return callWithProps(handler, this.props, e)
      }

      /*
       * Render the wrapped component
       */
      render () {
        return (
          <div ref={ node => this.node = node }>
            <WrappedComponent { ...this.props } /> 
          </div>
        )
      }
    }
}

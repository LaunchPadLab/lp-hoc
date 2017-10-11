import React from 'react'
import { omit } from './utils'

/**
 * A function that returns a React HOC that omits some or all of a component's props.
 * Uses the lodash [omit](https://lodash.com/docs/4.17.4#omit) function under the hood.
 *
 * @name omitProps
 * @type Function
 * @param {String|Array} propName - The name(s) of the prop(s) to be omitted. If none are provided, all of the props will be omitted.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * function Child ({ name }) {
 *   return <h1>{ name }</h1>
 * }
 *
 * const NamelessChild = omitProps()(Child)
 *
 * function Parent () {
 *   return <NamelessChild name="Foo" />
 * }
 * 
 * // When parent is rendered, the <h1> will be empty.
 *
**/

export default function omitProps (options) {
  return WrappedComponent =>
    function OmitPropsWrapper (props) {
      const newProps = options ? omit(options, props) : {}
      return <WrappedComponent { ...newProps } />
    }
}

import React from 'react'
import { camelize, camelizeKeys, map } from './utils'

/**
 * A function that returns a React HOC that converts a component's props into camel-case.
 * This HOC is particularly useful in conjunction with [react_on_rails](https://github.com/shakacode/react_on_rails).
 *
 * @name camelizeProps
 * @type Function
 * @param {String|Array} propName - The name(s) of the prop(s) to camelize. If no argument is provided, all props will be camelized.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * function ProfileComponent ({ fullName, profilePic }) {
 *   return (
 *     <div>
 *       <h1>{ fullName }</h1>
 *       <img src={ profilePic }/>
 *     </div>
 *   )
 * }
 * 
 * export default compose(
 *    camelizeProps(),
 * )(ProfileComponent)
 *
 * // Now we can pass props { full_name, profile_pic } to the above component.
 *
**/

// Camelizes specified keys in an object
function camelizeSomeKeys (obj, keysToCamelize=[]) {
  const converted = {}
  map(obj, (value, key) => {
    if (!keysToCamelize.includes(key)) return converted[key] = value
    return converted[camelize(key)] = camelizeKeys(value)
  })
  return converted
}

export default function camelizeProps (options=[]) {
  const optionsArray = Array.isArray(options) ? options : [options]
  const camelizeAll = (optionsArray.length === 0)
  function camelize (props) {
    const keysToCamelize = camelizeAll ? Object.keys(props) : optionsArray
    return camelizeSomeKeys(props, keysToCamelize)
  }
  return WrappedComponent =>
    function CamelizePropsWrapper (props) {
      return <WrappedComponent { ...camelize(props) } />
    }
}

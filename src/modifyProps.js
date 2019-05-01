import React from 'react'
import { wrapDisplayName } from './utils'

/**
 * A function that returns a React HOC that modifies a component's props using a given function.
 *
 * The provided function will be called with the component's props,
 * and should return an object that will be merged with those props.
 *
 * @name modifyProps
 * @type Function
 * @param {Function} modFunction - A function that modifies the component's props.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * // modifyProps is used to create a custom save function by combining
 * // props from mapStateToProps() and mapDispatchToProps()
 *
 * function SaveableProfile ({ name, save }) {
 *   return (
 *     <div>
 *       <h1>{ name }</h1>
 *       <button onClick={ save }>
 *         Save this profile
 *       </button>
 *     </div>
 *   )
 * }
 *
 * function mapStateToProps (state) {
 *    return {
 *       id: selectors.profileId(state)
 *    }
 * }
 * 
 * const mapDispatchToProps = { 
 *    saveProfile: actions.saveProfile
 * }
 *
 * function modify ({ id, saveProfile }) {
 *    return {
 *       save: () => saveProfile(id)
 *    }
 * }
 * 
 * export default compose(
 *    connect(mapStateToProps, mapDispatchToProps),
 *    modifyProps(modify),
 * )(SaveableProfile)
 *
*/

// Check whether modFunction exists and is a function
const isValid = modFunction => !!modFunction && typeof modFunction === 'function'

export default function modifyProps (modFunction) {
  if (!isValid(modFunction)) throw new Error('modifyProps requires a valid modFunction argument.')
  return WrappedComponent => {
    function Wrapper (props) {
      const newProps = { ...props, ...modFunction(props) }
      return <WrappedComponent { ...newProps } />
    }
    Wrapper.displayName = wrapDisplayName(WrappedComponent, 'modifyProps')
    return Wrapper
  }
}

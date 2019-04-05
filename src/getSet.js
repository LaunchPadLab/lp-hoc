import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { camelize, isUndef, wrapDisplayName } from './utils'

/**
 * A function that returns a React HOC that provides values and corresponding setter functions to the wrapped component.
 * For each variable name given, the wrapped component will receive the following props:
 *
 * - `<variableName>`: the value, default = `null`.
 * - `set<variableName>`: a function that will set the value to a given value.
 *
 * `getSet` also exposes a `getSetPropTypes` function to automatically generate PropTypes for these props.
 *
 * **Options**
 * 
 * `getSet` may be passed an options object containing the following keys:
 * - `initialValues`: An object containing initial values for the variables
 *
 * These options can also be passed in as props to the wrapped component.
 *
 * @name getSet
 * @type Function
 * @param {string|Array} varNames - A variable name or array of variable names
 * @param {object} options - Options for the HOC as specified above.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 *
 * @example
 *
 * function TabBar ({ currentTab, setCurrentTab, tabs ... }) {
 *   return (
 *     <div>
 *       { 
 *         tabs.map(tab => 
 *            <Tab 
 *              key={ tab } 
 *              isActive={ tab === currentTab }
 *              onClick={ () => setCurrentTab(tab) }
 *            />
 *         )
 *       }
 *     </div>
 *   )
 * }
 * 
 * TabBar.propTypes = {
 *   ...getSetPropTypes('currentTab'),
 *   tabs: PropTypes.arrayOf(PropTypes.number),
 * }
 *
 * export default compose(
 *    getSet('currentTab', { 
 *      initialValues: { 
 *        currentTab: 1,
 *      },
 *    }),
 * )(TabBar)
 *
*/

function getSet (names=[], options={}) {

  // Transform names to array
  const varNames = Array.isArray(names) ? names : [names]

  return WrappedComponent =>

    class Wrapper extends Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = wrapDisplayName(WrappedComponent, 'getSet')

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      constructor (props) {
        super(props)
        const config = { ...props, ...options }
        this.state = getInitialState(varNames, config.initialValues)
        this.set = this.set.bind(this)
        this.setters = buildSetters(varNames, this.set)
      }
      set (varName, value) {
        this.setState({ [varName]: value })
      }
      render () {
        return (
          <WrappedComponent {...{ 
            ...this.props,
            ...this.setters,
            ...this.state,
          }}/>
        )
      }
    }
}

// Set initial values if defined
function getInitialState (varNames, initialValues={}) {
  const state = {}
  varNames.forEach(varName => {
    const initialValue = initialValues[varName]
    state[varName] = isUndef(initialValue) ? null : initialValue
  })
  return state
}

// Return a hash of setter functions
function buildSetters (varNames, set) {
  const setters = {}
  varNames.forEach(varName => {
    setters[setterFuncName(varName)] = (value) => set(varName, value)
  })
  return setters
}

function setterFuncName (varName) {
  return camelize(['set', varName].join(' '))
}

export function getSetPropTypes (names=[]) {
  const varNames = Array.isArray(names) ? names : [names]
  const propTypes = {}
  varNames.forEach(varName => {
    propTypes[varName] = PropTypes.any
    propTypes[setterFuncName(varName)] = PropTypes.func
  })
  return propTypes
}

export default getSet
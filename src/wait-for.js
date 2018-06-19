import React from 'react'
import { get, stubTrue, every, wrapDisplayName } from './utils'

/**
 * A function that returns a React HOC to handle renderWhen logic for loading state.
 *
 * For the renderWhen param, the type can be one of the following:
 * * String - The name of a prop to wait for. When the prop is truthy, the component will render.
 * * Function - A function that recieves the component props and returns a boolean. When it returns true, the component will render.
 * * Array - An array of prop names to wait for. Each prop name will be evaluated using the `String` rules.
 * * Object - An object where the keys are prop names and the values are expected values. When the prop values are equal to the expected values, the component will render.
 *
 * @name waitFor
 * @param {(String|Function|Object)} renderWhen - A rule indicating when the wrapped component may render.
 * @param {Function} [LoadingComponent = null] - A component to render during the loading state, will be passed the current props. If not provided, `<p>Loading...</p>` will be rendered.
 * @returns {Function} - Returns a higher order component (HOC) to handle conditional logic for loading states.
 * @example
 *
 *  function MyComponent (name) {
 *    return (
 *      <p>{name}</p>
 *    )
 *  }
 *
 *  const renderWhen = 'name'
 *
 *  waitFor(renderWhen, MyComponent)
 *  // When prop 'name' value evaluates to true, MyComponent will be rendered.
 *  // Otherwise, <p>Loading...</p> will be rendered.
**/

function DefaultLoadingComponent () {
  return <p>Loading...</p>
}

export default function waitFor (renderWhen, LoadingComponent=DefaultLoadingComponent) {

  const doRender = getRenderCondition(renderWhen)

  return WrappedComponent =>

    class waitFor extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = wrapDisplayName(WrappedComponent, 'waitFor')

      /*
       * A reference to the wrapped component
       */
      static WrappedComponent = WrappedComponent

      render () {
        return doRender(this.props)
          ? <WrappedComponent { ...this.props }/>
          : <LoadingComponent { ...this.props }/>
      }
    }
}

function getRenderCondition (renderWhen) {

  let type = typeof renderWhen
  if (Array.isArray(renderWhen)) type = 'array'

  switch(type) {
    case 'function':
      return renderWhen
    case 'string':
      return function (props) {
        return isTruthy(renderWhen, props)
      }
    case 'array':
      return function (props) {
        return renderWhen.every(propName => isTruthy(propName, props))
      }
    case 'object':
      return function (props) {
        return every(renderWhen, (value, key) => {
          const propValue = get(key, props)
          return propValue === value
        })
      }
    default:
      return stubTrue
  }
}

// Returns true if prop is truthy
function isTruthy (propName, props) {
  return !!get(propName, props)
}

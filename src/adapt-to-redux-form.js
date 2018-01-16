import React from 'react'
import { wrapDisplayName } from './utils'

/**
 * A function that returns a React HOC that adapts an ordinary control component to be used with redux-form.
 * 
 * This HOC pulls the `value` and `onChange` props from the redux-form `input` object and passes them as first-class props.
 * This means that any component that implements the `value`/`onChange` pattern may be wrapped by this HOC.
 * 
 * @name adaptToReduxForm
 * @type Function
 *
 * @example
 *
 * function MyInput ({ value, onChange }) {
 *    return <input value={ value } onChange={ onChange } />
 * }
 * 
 * const MyAdaptedInput = adaptToReduxForm()(MyInput)
 * 
 * // Now, you can use it as a field in a redux-form controlled form
 * 
 * function MyForm ({ handleSubmit }) {
 *    return (
 *      <form onSubmit={ handleSubmit }>
 *        <Field name="firstName" component={ MyAdaptedInput } />
 *      </form>
 *    )
 * }
 *
 */


/* eslint react/prop-types: 0 */

function adaptToReduxForm () {
  return WrappedComponent => {
    function Wrapper ({ input: { value, onChange }, ...rest }) {
      return <WrappedComponent {...{ value, onChange, ...rest }} />
    }
    Wrapper.displayName = wrapDisplayName(WrappedComponent, 'adaptToReduxForm')
    return Wrapper
  }
}

export default adaptToReduxForm
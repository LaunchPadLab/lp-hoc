import React from 'react'
// import PropTypes from 'prop-types'
import { connectModal, show, hide, destroy } from 'redux-modal'
import classnames from 'classnames'
import { getDisplayName, noop } from './utils'

/**
 * A function that returns a React HOC for creating modals.
 * This HOC is dependent on the [`redux-modal`](https://github.com/yesmeck/redux-modal) library.
 * 
 * The following functions are available on the wrapped component:
 * - `show`: Shows the modal.
 * - `hide`: Hides the modal.
 * - `destroy`: Destroys the modal.
 *
 * @name modal
 * @type Function
 * @param {String} name - The name of the modal.
 * @param {Boolean} warning - A boolean representing whether to add the `modal-warning` class to the surrounding `div` (default=`false`).
 * @param {Boolean} disableOutsideClick - A boolean representing whether clicking outside the modal div should hide the modal (default=`false`).
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * function AlertModal ({ handleHide }) {
 *   return (
 *     <div>
 *       <h1>I am an alert!</h1>
 *       <div onClick={ handleHide } className="modal-close">×</div>
 *     </div>
 *   )
 * }
 * 
 * export default modal({ name: 'AlertModal' })(AlertModal)
 *
**/

function modal ({ 
  name,
  warning=false,
  disableOutsideClick=false,
  ...options 
} = {}) {
  return WrappedComponent => {
    const modalName = name || getDisplayName(WrappedComponent)
    if (!modalName) throw new Error('Must provide name option or wrap a named component')
    /* eslint react/prop-types: 0 */
    function ModalWrapper (props) {
      return (
        <div className={ classnames('modal', { 'modal-warning': warning, 'is-active': props.show })}>
          <div className="modal-fade-screen" onClick={ disableOutsideClick ? noop : props.handleHide }>
            <div className="modal-content">
              <WrappedComponent { ...props } /> 
            </div>
          </div>
        </div>
      )
    }

    const connectedModalWrapper = connectModal({
      name: modalName,
      ...options,
    })(ModalWrapper)
    // Rename the whole thing to the modal name so we can call actions on it`
    connectedModalWrapper.displayName = modalName
    // Attach action creators to component
    connectedModalWrapper.show = (props) => show(modalName, props)
    connectedModalWrapper.hide = () => hide(modalName)
    connectedModalWrapper.destroy = () => destroy(modalName)
    return connectedModalWrapper
  }
}

export default modal

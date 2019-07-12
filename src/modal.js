import React from 'react'
// import PropTypes from 'prop-types'
import { connectModal, show, hide, destroy } from 'redux-modal'
import classnames from 'classnames'
import BodyClassName from 'react-body-classname'
import { noop, isEvent } from './utils'

/**
 * A function that returns a React HOC for creating modals. 
 * Default styling for these modals can be pulled from the `modal.css` file included in this library:
 * 
 * ```scss
 * // in application.scss:
 * 
 * @include "~@launchpadlab/lp-hoc/lib/styles/modal.css";
 * 
 * ```
 * 
 * Note: this HOC uses [`redux-modal`](https://github.com/yesmeck/redux-modal) under the hood. The reducer from `redux-modal` is exported for convenience as `modalReducer`.
 * 
 * The following functions are available as static properties on the wrapped component:
 * - `show`: Shows the modal. Can be passed an object with props to be passed to the modal component. An event argument will be interpreted as an empty object.
 * - `hide`: Hides the modal.
 * - `destroy`: Destroys the modal state and unmounts the modal component.
 * 
 * @name modal
 * @type Function
 * @param {String} name - The name of the modal.
 * @param {Boolean} [warning=false] - A boolean representing whether to add the `modal-warning` class to the surrounding `div`.
 * @param {Boolean} [destroyOnHide=true] - A boolean representing whether to destroy the modal state and unmount the modal after hide.
 * @param {Boolean} [disableOutsideClick=false] - A boolean representing whether clicking outside the modal div should hide the modal.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * // Create Modal Component
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
 * // Use Modal
 * 
 * function Layout ({ showAlertModal }) {
 *   return (
 *     <div>
 *       <AlertModal />
 *       <button onClick={ showAlertModal }>Click Me!</button>
 *     </div>
 *   )
 * }
 * 
 * const mapDispatchToProps = { 
 *    showAlertModal: AlertModal.show,
 * }
 * 
 * export default compose(
 *    connect(null, mapDispatchToProps),
 * )(Layout)
*/

function modal ({ 
  name,
  warning=false,
  disableOutsideClick=false,
  ...options 
} = {}) {
  return WrappedComponent => {
    if (!name) throw new Error('Must provide name option')
    /* eslint react/prop-types: 0 */
    function ModalWrapper (props) {
      return (
        <BodyClassName className={ classnames({ 'modal-open': props.show }) }>
          <div className={ classnames('modal', { 'modal-warning': warning, 'is-active': props.show })}>
            <div className="modal-fade-screen" onClick={ disableOutsideClick ? noop : props.handleHide }>
              <div className="modal-inner" onClick={ e => e.stopPropagation() }>
                <WrappedComponent { ...props } /> 
              </div>
            </div>
          </div>
        </BodyClassName>
      )
    }

    const connectedModalWrapper = connectModal({
      name,
      ...options,
    })(ModalWrapper)
    // Attach action creators to component
    connectedModalWrapper.show = (arg) => {
      // Ignore event arguments
      const props = isEvent(arg) ? {} : arg
      return show(name, props)
    } 
    connectedModalWrapper.hide = () => hide(name)
    connectedModalWrapper.destroy = () => destroy(name)
    return connectedModalWrapper
  }
}

export default modal

import React from 'react'
// import PropTypes from 'prop-types'
import { connectModal, show, hide, destroy } from 'redux-modal'
import classnames from 'classnames'
import { getDisplayName, noop } from './utils'

function modal ({ 
  name,
  warning,
  disableOutsideClick,
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
    // Attach action creators to component
    connectedModalWrapper.show = (props) => show(modalName, props)
    connectedModalWrapper.hide = () => hide(modalName)
    connectedModalWrapper.destroy = () => destroy(modalName)
    return connectedModalWrapper
  }
}

export default modal

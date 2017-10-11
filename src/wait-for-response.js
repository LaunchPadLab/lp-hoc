import { compose } from 'redux'
import { connect } from 'react-redux'
import { selectors } from '@launchpadlab/lp-redux-api'
import waitFor from './wait-for'
import omitProps from './omit-props'

/**
 * A function that returns an HOC to handle rendering that depends on an API response. 
 * A combination of {@link waitFor} and selectors from [lp-redux-api](https://github.com/LaunchPadLab/lp-redux-api).
 *
 * @name waitForResponse
 * @param {String|Array} requestKeys - A key or set of keys corresponding to `lp-redux-api` requests.
 * @param {Function} [LoadingComponent = null] - A component to render during the loading state.
 * @returns {Function} - A higher order component (HOC).
 * @example
 *
 * import { REQ_USERS, requestUsers } from 'actions'
 *
 *  function MyComponent (name) {
 *    return (
 *      <p>{name}</p>
 *    )
 *  }
 *
 *  export default compose(
 *    onMount(requestUsers),
 *    waitForResponse(REQ_USERS),
 *  )(MyComponent)
 *  
 *  // requestUsers() dispatches an LP_API action with key 'REQ_USERS' on component mount.
 *  // When the status of 'REQ_USERS' request becomes 'success' or 'failure', the component will render.
 *  // Otherwise, the default `waitFor` loading component will be rendered.
**/

export default function waitForResponse (requestKeys=[], LoadingComponent) {
  const requestKeyArray = Array.isArray(requestKeys) ? requestKeys : [requestKeys]
  function mapStateToProps (state) {
    // Load if every request has either succeeded or failed
    const _doLoad = requestKeyArray.every(key => selectors.isSuccess(state, key) || selectors.isFailure(state, key))
    return { _doLoad }
  }
  return WrappedComponent => 
    compose(
      connect(mapStateToProps),
      waitFor('_doLoad', LoadingComponent),
      omitProps('_doLoad'),
    )(WrappedComponent)
}

/* eslint no-console: 0 */

import { once, getDisplayName } from './utils'
import { onMount } from './lifecycle'

/**
 * A function that returns a React HOC that displays a deprecation warning when a component is mounted.
 *
 * If no message is provided, the default deprecation message is:
 * - `<Component.displayName> is deprecated and will be removed in the next version of this library.`
 * 
 * @name deprecate
 * @type Function
 * @param {String} [message] - A custom message to display
 * @param {Function} [log=console.warn] - A function for logging the message
 *
 * @example
 *
 *
 * const MyComponent = () => <p>Hi</p>
 * export default deprecate('Do not use this component')(MyComponent)
 *
 * // When component is mounted, console will show warning: 'DEPRECATED: Do not use this component'
 *
 */

// Uses onMount to display message on mount (instead of render)
function deprecate (message, log=console.warn) {
  return Component => {
    const warning = message || `${ getDisplayName(Component) } is deprecated and will be removed in the next version of this library.`
    const logWarning = once(() => log(`DEPRECATED: ${warning}`))
    return onMount(logWarning)(Component)
  }
}

export default deprecate
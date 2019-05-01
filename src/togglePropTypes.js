import { togglePropTypes } from './toggle'

/**
 * A function that returns propTypes for the {@link toggle} HOC.
 * For each toggle name given, the wrapped component will receive the following props:
 *
 * @name togglePropTypes
 * @type Function
 * @param {String|Array} toggleNames - One or more toggle names.
 * @returns {Object} - An object of corresponding propTypes.
 *
 *
 * @example
 *
 * function ComponentWithTooltip () { ... }
 * 
 * ComponentWithTooltip.propTypes = {
 *   ...togglePropTypes('tooltipShown'),
 * }
 * 
 * export default compose(
 *   toggle('tooltopShown')
 * )(ComponentWithTooltip)
 * 
*/

export default togglePropTypes


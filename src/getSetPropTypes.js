import { getSetPropTypes } from './getSet'

/**
 * A function that returns propTypes for the {@link getSet} HOC.
 * 
 * @name getSetPropTypes
 * @type Function
 * @param {String|Array} varNames - A variable name or array of variable names.
 * @returns {Object} - An object of corresponding propTypes.
 *
 *
 * @example
 *
 * function TabBar () { ... }
 * 
 * TabBar.propTypes = {
 *   ...getSetPropTypes('currentTab'),
 * }
 *
 * export default compose(
 *    getSet('currentTab'),
 * )(TabBar)
 *
*/

export default getSetPropTypes
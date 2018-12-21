import { createRoutesFromReactChildren } from './utils'

/**
 * This HOC allows the creation of custom `react-router` route components.
 * It can be used to wrap any component that returns a `<Route />` tag, and will allow that component to be used interchangeably with `<Route />`.
 * Note: only compatible with `react-router` v3.
 * 
 * This rationale for this HOC can be found [here](https://marmelab.com/blog/2016/09/20/custom-react-router-component.html).
 * 
 * @name adaptToReactRouter
 * @type Function
 *
 * @example
 *
 * function CatchallRoute ({ path, ...rest }) {
 *    return (
 *      <Route>
 *        <Route path={ path } { ...rest } />
 *        <Redirect path={ path + '/*' } to={ path } />
 *      </Route>
 *    )
 * }
 * 
 * export default compose(
 *    adaptToReactRouter()
 * )(CatchallRoute)
 *
 */

function adaptToReactRouter () {
  return Wrapped => {
    function Wrapper () {}
    Wrapper.createRouteFromReactElement = ({ props }, parentRoute) => createRoutesFromReactChildren(Wrapped(props), parentRoute).pop()
    return Wrapper
  }
}

export default adaptToReactRouter

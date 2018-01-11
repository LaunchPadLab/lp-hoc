import React from 'react'
import PropTypes from 'prop-types'
import {
  isEqual,
  isUndef,
  omitBy,
  orderBy,
  get,
  wrapDisplayName,
  noop,
 } from './utils'

/**
 * A function that returns a React HOC that provides a sort function the wrapped component.
 * Given a `sortPath`, this function will compare the values of two objects at that path.
 * The wrapped component will receive the following props:
 *
 * - `ascending`: a boolean indicating whether the sort is ascending or not
 * - `descending`: a boolean indicating whether the sort is descending or not
 * - `sortPath`: a string indicating the current sort comparison path in dot notation
 * - `sort`: a function that can be used to sort an array of objects
 * - `setAscending`: a function for setting `ascending`
 * - `setDescending`: a function for setting `descending`
 * - `setSortPath`: a function for setting `sortPath`
 * - `setSortFunc`: a function for setting a custom [comparison function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description) that will be used in `sort`
 * 
 * `sortable` also exposes a `sortablePropTypes` object for these props.
 * 
 * _Note: `setSortPath()` will automatically reset `ascending` to `true` when the current path is changed.
 * Additionally, it will toggle `ascending` if the same path is selected twice in a row, 
 * unless `false` is passed as the second parameter._
 *
 * **Options**
 * 
 * `getSet` may be passed an options object containing the following keys:
 * - `initialAscending`: Whether the sort is initially ascending (default=`true`)
 * - `initialSortPath`: The initial `sortPath`
 * - `initialSortFunc`: The initial `sortFunc`
 * - `onChange`: A callback that will be fired whenever the sorting state is updated
 * - `disableReverse`: disables the automatic reversing of sorted items when the sort is descending
 * 
 * The wrapped component may also receive these options as props.
 *
 * @name sortable
 * @type Function
 * @param {object} options - Options for the HOC as specified above.
 * @returns {Function} - A HOC that can be used to wrap a component.
 *
 * @example
 *
 * function SortedPeopleList ({ people, sort, ascending, setAscending }) {
 *   return (
 *     <div>
 *       <ol>
 *         { 
 *           sort(people).map(person => 
 *             <li>`${ person.name } - ${ person.age }`</li>
 *           )
 *         }
 *       </ol>
 *       <button onClick={ () => setAscending(!ascending) }>
 *         Reverse order
 *       </button>
 *     </div>
 *   )
 * }
 * 
 * SortedPeopleList.propTypes = {
 *   ...sortablePropTypes,
 *   people: PropTypes.arrayOf(PropTypes.shape({
 *    name: PropTypes.string.isRequired,
 *    age: PropTypes.string.isRequired,
 *   })),
 * }
 *
 * export default compose(
 *    sortable({ 
 *      sortPath: 'age',
 *    }),
 * )(SortedPeopleList)
 *
**/

const omitUndefined = obj => omitBy(obj, isUndef)

export default function sortable (options={}) {

  return WrappedComponent => 

    class Sortable extends React.Component {

      /*
       * A friendly name for React devtools and errors
       */
      static displayName = wrapDisplayName(WrappedComponent, 'sortable')

      constructor (props) {
        super(props)
        // Set config object from options and props
        this.config = { ...options, ...props }
        // Set initial state from config
        const {
          initialAscending=true,
          initialSortPath,
          initialSortFunc,
        } = this.config
        this.state = { 
          ascending: initialAscending, 
          sortPath: initialSortPath, 
          sortFunc: initialSortFunc,
        }
        // Bind class methods
        this.sort = this.sort.bind(this)
        this.setAscending = this.setAscending.bind(this)
        this.setDescending = val => this.setAscending(!val)
        this.setSortFunc = this.setSortFunc.bind(this)
        this.setSortPath = this.setSortPath.bind(this)
      }

      // Pass relevant props through to child
      componentWillReceiveProps ({ ascending, sortPath, sortFunc }) {
        this.setState(omitUndefined({ ascending, sortPath, sortFunc }))
      }

      // Call onChange when sort state changes
      componentDidUpdate (oldProps, oldState) {
        if (isEqual(oldState, this.state)) return 
        const { onChange } = this.config
        if (onChange) return onChange(this.state)
      }

      setAscending (ascending) {
        this.setState({ ascending })
      }

      setSortFunc (sortFunc) {
        this.setState({ sortFunc })
      }

      setSortPath (newPath, doToggle=true) {
        // By default, toggles ascending if the path is already selected
        let { sortPath, ascending } = this.state
        if (newPath === sortPath) {
          if (doToggle) ascending = !ascending
        } else {
          // Default to ascending when switching paths
          ascending = true
        }
        this.setState({ sortPath: newPath, ascending })
      }

      sort (array) {
        const { ascending, sortFunc, sortPath } = this.state
        const { disableReverse } = this.config
        // Use custom sort if provided, otherwise default to orderBy()
        if (sortFunc) {
          const sorted = [...array].sort(sortFunc)
          if (!ascending && !disableReverse) sorted.reverse()
          return sorted
        } else {
          const order = ascending ? 'asc' : 'desc'
          const sorted = orderBy(array, item => get(sortPath, item), order)
          return sorted
        }
      }

      render () {
        const { ascending, sortPath } = this.state
        return (
          <WrappedComponent 
            { ...{ 
              ascending, 
              descending: !ascending,
              sortPath,
              sort: this.sort, 
              setAscending: this.setAscending,
              setDescending: this.setDescending,
              setSortFunc: this.setSortFunc,
              setSortPath: this.setSortPath, 
              ...this.props,
            }} 
          />
        )
      }
    }
}

// Proptypes for components wrapped by sortable

export const sortablePropTypes = {
  ascending: PropTypes.bool.isRequired,
  descending: PropTypes.bool.isRequired,
  sortPath: PropTypes.string.isRequired,
  sort: PropTypes.func.isRequired,
  setAscending: PropTypes.func.isRequired,
  setDescending: PropTypes.func.isRequired,
  setSortPath: PropTypes.func.isRequired,
  setSortFunc: PropTypes.func.isRequired,
}

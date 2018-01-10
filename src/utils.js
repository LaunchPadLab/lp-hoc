// Utils for our utils!

// Lodash
export {
  every,
  first,
  isUndefined as isUndef,
  map,
  noop,
  orderBy,
  once,
  stubTrue,
} from 'lodash'

// Lodash FP 
export {
  get,
  getOr,
  omit,
  set,
} from 'lodash/fp'

// Recompose
export getDisplayName from 'recompose/getDisplayName'
export wrapDisplayName from 'recompose/wrapDisplayName'

// Humps
export { camelize, camelizeKeys } from 'humps'

export function removeExtension (filename) {
  const extensionIndex = name.lastIndexOf('.')
  return filename.slice(0, extensionIndex)
}
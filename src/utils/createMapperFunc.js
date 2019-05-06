// Utility that returns a transform function for mapping values
// mappingConfig can be a Function, String, or an array of Strings

import { isFunction, pick } from 'lodash'

export default function createMapperFunc (mappingConfig) {
  if (isFunction(mappingConfig)) return mappingConfig
  
  return function map (values) {
    return pick(values, mappingConfig)
  }
}

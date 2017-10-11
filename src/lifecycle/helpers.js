// Used by onMount and onUnmount.
// Runs a lifecycle action, which can be defined as either:
// - (String) The name of a function prop to call
// - (Function) A function to call
// When called, function will be passed the props (and additional arguments if passed).

export function callWithProps (funcOrString, props, ...args) {

  switch(typeof funcOrString) {

    case 'string': {
      const func = props[funcOrString]
      if (typeof func !== 'function')
        throw new Error(`
          You specified a string argument of '${funcOrString}'
          that should've corresponded to a function prop,
          but there was no function prop with that key.
        `)
      return func(props, ...args)
    }

    case 'function': {
      return funcOrString(props, ...args)
    }

    default: {
      throw new Error(`
          The argument provided must be a string or
          function, you provided ${funcOrString}
        `)
    }
  }
}

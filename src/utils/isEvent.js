// Returns true if the argument is an event
// Copied from https://github.com/erikras/redux-form/blob/master/src/events/isEvent.js

function isEvent (value) {
  return !!(value && value.stopPropagation && value.preventDefault)
}

export default isEvent
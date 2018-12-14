// Converts strings to primitive values if possible
// Eg '5' -> 5, 'true' -> true, 'string' -> 'string'

function coerce (str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

export default coerce

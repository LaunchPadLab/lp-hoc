
// Throws an error when a required param is not found

function requireParam (paramName, context='Error') {
  throw new Error(`${ context }: required param ${ paramName } not provided`)
}

export default requireParam
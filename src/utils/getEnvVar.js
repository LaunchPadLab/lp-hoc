import { get } from 'lodash/fp'

// Attempts to retrieve an environment variable from process.env 

function getEnvVar (varName) {
  return get(`process.env.${ varName }`, window)
}

export default getEnvVar
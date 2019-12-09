export const successUrl = '/success'
export const failureUrl = '/failure'

const statuses = {
  [successUrl]: 200,
  [failureUrl]: 400,
}

export default jest.fn(function(url, options) {
  const response = {
    // Response echoes back passed options
    headers: {
      get: () => {},
    },
    json: () => Promise.resolve({ ...options, url }),
    ok: !url.includes(failureUrl),
    status: statuses[url],
  }
  // Simulate server response
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 10)
  })
})

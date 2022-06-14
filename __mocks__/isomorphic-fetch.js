export const successUrl = '/success'
export const failureUrl = '/failure'

const statuses = {
  [successUrl]: 200,
  [failureUrl]: 400,
}

export default jest.fn(function(url, options) {
  const payload = { ...options, url }
  const response = {
    // Response echoes back passed options
    headers: {
      get: () => {},
    },
    text: () => Promise.resolve(JSON.stringify(payload)),
    json: () => Promise.resolve(payload),
    ok: !url.includes(failureUrl),
    status: statuses[url],
  }
  // Simulate server response
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), 10)
  })
})

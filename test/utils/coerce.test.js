import { coerce } from '../../src/utils'

describe('Coerce util', () => {
  test('coerces a string number to a number', () => {
    const coerced = coerce('13')
    expect(coerced).toBe(13)
    expect(coerced).not.toBe('13')
  })
  
  test('coerces "true" to a boolean', () => {
    const coerced = coerce('true')
    expect(coerced).toBe(true)
    expect(coerced).not.toBe('true')
  })
  
  test('coerces "false" to a boolean', () => {
    const coerced = coerce('false')
    expect(coerced).toBe(false)
    expect(coerced).not.toBe('false')
  })
  
  test('returns a string when a string is provided', () => {
    const coerced = coerce('test')
    expect(coerced).toBe('test')
  })
  
  test('returns a string if the string cannot be parsed', () => {
    const coerced = coerce('{ test: hello }')
    expect(coerced).toBe('{ test: hello }')
  })
})

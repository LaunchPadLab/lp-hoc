import { isEvent } from '../../src/utils'

describe('isEvent util', () => {
  test('returns true when called with an event', () => {
    expect(isEvent(new Event('click'))).toEqual(true)
  })
  test('returns false when called with a non-event', () => {
    expect(isEvent({})).toEqual(false)
  })
})

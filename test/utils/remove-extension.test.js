import { removeExtension } from '../../src/utils'

test('`removeExtension` removes file extension', () => {
  const filename = 'test.jpg'
  expect(removeExtension(filename)).toEqual('test')
})

test('`removeExtension` returns original string if no extension', () => {
  const filename = 'test'
  expect(removeExtension(filename)).toEqual('test')
})
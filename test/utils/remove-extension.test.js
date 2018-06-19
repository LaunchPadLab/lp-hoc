import { removeExtension } from '../../src/utils'

test('`removeExtension` removes file extension', () => {
  const filename = 'test.jpg'
  expect(removeExtension(filename)).toEqual('test')
})

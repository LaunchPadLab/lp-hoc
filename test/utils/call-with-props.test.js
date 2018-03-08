import { callWithProps } from '../../src/utils'

test('`callWithProps` passes props to provided function', () => {
  const func = jest.fn()
  const props = { foo: true }
  callWithProps(func, props)
  expect(func).toHaveBeenCalledWith(props)
})

test('`callWithProps` passes props to specified function prop', () => {
  const funcProp = jest.fn()
  const props = { foo: true, funcProp }
  callWithProps('funcProp', props)
  expect(funcProp).toHaveBeenCalledWith(props)
})

test('`callWithProps` passes additional arguments to provided function', () => {
  const func = jest.fn()
  const props = { foo: true }
  const additional = 'another arg'
  callWithProps(func, props, additional)
  expect(func).toHaveBeenCalledWith(props, additional)
})

test('`callWithProps` throws when string param prop is not found, or prop is not a function', () => {
  const props = { foo: true }
  expect(() => callWithProps('notAProp', props)).toThrow()
  expect(() => callWithProps('foo', props)).toThrow()
})

test('`componentDidMount` throws when param is not a string or a function', () => {
  const props = {}
  expect(() => callWithProps(25, props)).toThrow()
  expect(() => callWithProps(null, props)).toThrow()
  expect(() => callWithProps(true, props)).toThrow()
})
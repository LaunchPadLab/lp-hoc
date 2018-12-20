import { createMapperFunc } from '../../src/utils'

describe('Create Mapper Func util', () => {
  test('returns a function', () => {
    const mappingConfig = 'hi'
    const mapperFunc = createMapperFunc(mappingConfig)
    expect(mapperFunc).toBeInstanceOf(Function)
  })
  
  test('returns the same function when the config is a function', () => {
    const mappingConfig = () => 'hi'
    const mapperFunc = createMapperFunc(mappingConfig)
    expect(mapperFunc).toBe(mappingConfig)
  })
  
  test('returns a function that maps the value based on a given string to a new object', () => {
    const values = { a: 1, b: 2, c: 3 }
    const mappingConfig = 'a'
    const mapperFunc = createMapperFunc(mappingConfig)
    const mappedValues = mapperFunc(values)
    
    expect(mappedValues).not.toBe(values)
    expect(mappedValues).toStrictEqual({ a: 1 })
  })
  
  test('returns a function that maps the values based on an array of strings to a new object', () => {
    const values = { a: 1, b: 2, c: 3 }
    const mappingConfig = ['a', 'c']
    const mapperFunc = createMapperFunc(mappingConfig)
    const mappedValues = mapperFunc(values)
    
    expect(mappedValues).not.toBe(values)
    expect(mappedValues).toStrictEqual({ a: 1, c: 3 })
  })
  
  test('only maps values that are present', () => {
    const values = { a: 1, b: 2, c: 3 }
    const mappingConfig = 'd'
    const mapperFunc = createMapperFunc(mappingConfig)
    const mappedValues = mapperFunc(values)
    
    expect(mappedValues).not.toBe(values)
    expect(mappedValues).toStrictEqual({})
  })
})

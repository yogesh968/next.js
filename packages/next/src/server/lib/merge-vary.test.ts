import { mergeVary } from './merge-vary'

describe('mergeVary', () => {
  it('keeps a value that is already set', () => {
    expect(mergeVary('X-Foo', undefined)).toBe('X-Foo')
  })

  it('appends to an existing value', () => {
    expect(mergeVary('X-Foo', 'RSC, Next-Router-State-Tree')).toBe(
      'X-Foo, RSC, Next-Router-State-Tree'
    )
  })

  it('drops duplicates case-insensitively and keeps the first spelling', () => {
    expect(mergeVary('rsc, X-Foo', 'RSC, X-Bar')).toBe('rsc, X-Foo, X-Bar')
  })

  it('normalizes the spacing between field names', () => {
    expect(mergeVary('X-Foo,X-Bar ,  X-Baz', '')).toBe('X-Foo, X-Bar, X-Baz')
  })

  it('flattens an array of values', () => {
    expect(mergeVary(['X-Foo', 'X-Bar'], 'RSC')).toBe('X-Foo, X-Bar, RSC')
  })

  it('collapses to `*` when any value is `*`', () => {
    expect(mergeVary('X-Foo', '*')).toBe('*')
    expect(mergeVary('*', 'RSC')).toBe('*')
  })

  it('ignores empty and missing values', () => {
    expect(mergeVary(undefined, null, '', ' , ', 'RSC')).toBe('RSC')
    expect(mergeVary(undefined)).toBe('')
  })
})

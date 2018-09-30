/* tslint:disable */
import { expect } from 'chai'
import { Dictionary } from '../src/dictionary'

describe('./dictionary.ts', function() {
  it('存在 Class Dictionary', function() {
    expect(Dictionary).not.null
    expect(Dictionary).not.undefined
    expect(typeof Dictionary).to.equal('function')
  })

  it('Dictionary 可使用无参构造函数', function() {
    let dictionary = new Dictionary()
    expect(dictionary.Count()).is.equal(0)
  })

  it('Dictionary 可使用 Map 构造函数', function() {
    let original = new Map()
    original.set(1, 2)
    original.set(2, 3)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(3)).is.equal(4)
  })

  it('Dictionary 可使用 IEnumerable 构造函数', function() {
    let map = new Map()
    map.set(1, 2)
    map.set(2, 3)
    let original = new Dictionary(map)
    let dictionary = new Dictionary(original)
    expect(dictionary.Count()).is.equal(2)
    expect(dictionary.Get(1)).is.equal(2)
    expect(dictionary.Get(3)).is.equal(4)
  })
})

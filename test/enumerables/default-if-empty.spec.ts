/* tslint:disable */
import { expect } from 'chai'
import { defaultIfEmpty } from '../../src/enumerables/default-if-empty'
import { List } from '../../src/list'
import { EnumerableContainer } from '../../src/enumerables/enumerable-container'

describe('./enumerables/defaultIfEmpty.ts', function() {
  it('存在 defaultIfEmpty 方法', function() {
    expect(defaultIfEmpty).not.null
    expect(defaultIfEmpty).not.undefined
    expect(typeof defaultIfEmpty).to.equal('function')
  })

  it('defaultIfEmpty([]) => 新的空列表', function() {
    expect(defaultIfEmpty([])).instanceOf(EnumerableContainer)
  })

  it('defaultIfEmpty(new List()) => 新的空列表', function() {
    expect(defaultIfEmpty(new List())).instanceOf(EnumerableContainer)
  })

  it('defaultIfEmpty([1, 2, 4]) => 新的可枚举的原列表', function() {
    let list = [1, 2, 4]
    let after = defaultIfEmpty(list)
    expect(after).instanceOf(EnumerableContainer)
    expect(after.Count()).is.equal(list.length)
    for (let i = 0; i < list.length; i++) {
      expect(after.ElementAt(i)).is.equal(list[i])
    }
  })

  it('defaultIfEmpty(new List([1, 2, 4])) => 原列表', function() {
    let list = new List([1, 2, 4])
    let after = defaultIfEmpty(list)
    expect(after).is.equal(list)
  })
})

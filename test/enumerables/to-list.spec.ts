/* tslint:disable */
import { expect } from 'chai'
import { toList } from '../../src/enumerables/to-list'
import { List } from '../../src/list'

describe('./enumerables/to-list.ts', function() {
  it('存在 toList 方法', function() {
    expect(toList).not.null
    expect(toList).not.undefined
    expect(typeof toList).to.equal('function')
  })

  it('toList(null) => throw', function() {
    expect(() => {
      toList(null)
    }).to.throw(`参数 source 不可为空`)
  })

  it('toList(undefined) => throw', function() {
    expect(() => {
      toList(undefined)
    }).to.throw(`参数 source 不可为空`)
  })

  it('toList([]) => []', function() {
    let array = toList([])
    expect(array).is.not.null
    expect(array).is.not.undefined
    expect(array.Count()).is.equal(0)
  })

  it('toList([1]) => [1]', function() {
    let array = toList([1])
    expect(array.Count()).is.equal(1)
    expect(array.Get(0)).is.equal(1)
  })

  it('toList([1, 2]) => [1, 2]', function() {
    let array = toList([1, 2])
    expect(array.Count()).is.equal(2)
    expect(array.Get(0)).is.equal(1)
    expect(array.Get(1)).is.equal(2)
  })

  it('toList([1, 2, 3]) => [1, 2, 3]', function() {
    let array = toList([1, 2, 3])
    expect(array.Count()).is.equal(3)
    expect(array.Get(0)).is.equal(1)
    expect(array.Get(1)).is.equal(2)
    expect(array.Get(2)).is.equal(3)
  })

  it('toList(new List([1, 2, 3])) => [1, 2, 3]', function() {
    let array = toList(new List([1, 2, 3]))
    expect(array.Count()).is.equal(3)
    expect(array.Get(0)).is.equal(1)
    expect(array.Get(1)).is.equal(2)
    expect(array.Get(2)).is.equal(3)
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { concat } from '../../src/enumerables/concat'

describe('./enumerables/concat.ts', function () {
  it('存在 concat 方法', function () {
    expect(concat).not.null
    expect(concat).not.undefined
    expect(typeof concat).to.equal('function')
  })

  it('concat(null, []) => throw', function () {
    expect(() => {
      concat(null, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('concat(undefined, []) => throw', function () {
    expect(() => {
      concat(undefined, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('concat([], []) => throw', function () {
    expect(() => {
      concat([], null)
    }).to.throw(`参数 second 不可为空`)
  })

  it('concat([], undefined) => throw', function () {
    expect(() => {
      concat([], undefined)
    }).to.throw(`参数 second 不可为空`)
  })

  it('concat([], []) => Empty', function () {
    expect(concat([], []).Any()).is.false
  })

  it('concat([1], [2]) => [1, 2]', function () {
    let concated = concat([1], [2])
    expect(concated.Any()).is.true
    expect(concated.Count()).is.equal(2)

    let list = concated.ToList()
    expect(list.Count()).is.equal(2)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
  })

  it('concat([2], [1]) => [2, 1]', function () {
    let concated = concat([2], [1])
    expect(concated.Any()).is.true
    expect(concated.Count()).is.equal(2)

    let list = concated.ToList()
    expect(list.Count()).is.equal(2)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(1)
  })

  it('concat([1, 2, 3, 4], [4, 5, 6, 6]) => [1, 2, 3, 4, 4, 5, 6, 7]', function () {
    let concated = concat([1, 2, 3, 4], [4, 5, 6, 7])
    expect(concated.Any()).is.true
    expect(concated.Count()).is.equal(8)

    let list = concated.ToList()
    expect(list.Count()).is.equal(8)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(4)
    expect(list.Get(5)).is.equal(5)
    expect(list.Get(6)).is.equal(6)
    expect(list.Get(7)).is.equal(7)
  })

  it('concat([1, 2, 3, 4], new List([4, 5, 6, 7])) => [1, 2, 3, 4, 4, 5, 6, 7]', function () {
    let concated = concat([1, 2, 3, 4], new List([4, 5, 6, 7]))
    expect(concated.Any()).is.true
    expect(concated.Count()).is.equal(8)

    let list = concated.ToList()
    expect(list.Count()).is.equal(8)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(4)
    expect(list.Get(5)).is.equal(5)
    expect(list.Get(6)).is.equal(6)
    expect(list.Get(7)).is.equal(7)
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { where } from '../../src/enumerables/where'
import { List } from '../../src'
import { EqualityComparer } from '../../src/equality-comparer'

describe('./enumerables/where.ts', function() {
  it('存在 where 方法', function() {
    expect(where).not.null
    expect(where).not.undefined
    expect(typeof where).to.equal('function')
  })

  it('where(null, x => !!x) => throw', function() {
    expect(() => {
      where(null, x => !!x)
    }).to.throw(`参数 source 不可为空`)
  })

  it('where(undefined, x => !!x) => throw', function() {
    expect(() => {
      where(undefined, x => !!x)
    }).to.throw(`参数 source 不可为空`)
  })

  it('where([], null) => throw', function() {
    expect(() => {
      where([], null)
    }).to.throw(`参数 predicate 不可为空`)
  })

  it('where([], undefined) => throw', function() {
    expect(() => {
      where([], undefined)
    }).to.throw(`参数 predicate 不可为空`)
  })

  it('where([], x => !!x) => Empty', function() {
    expect(where([], x => !!x).Any()).is.false
  })

  it('where([1, 2, 3], x => x > 2) => [3]', function() {
    let whered = where([1, 2, 3], x => x > 2)
    expect(whered.Count()).is.equal(1)
    expect(whered.ElementAt(0)).is.equal(3)
  })

  it('where([1, 2, 3, 4, 5], x => x > 2) => [3]', function() {
    let whered = where([1, 2, 3, 4, 5], x => x > 2)
    expect(whered.Count()).is.equal(3)
    expect(whered.ElementAt(0)).is.equal(3)
    expect(whered.ElementAt(1)).is.equal(4)
    expect(whered.ElementAt(2)).is.equal(5)
  })

  it('where([1, 2, 3, 4, 5], x => x > 10) => []', function() {
    let whered = where([1, 2, 3, 4, 5], x => x > 10)
    expect(whered).is.not.null
    expect(whered).is.not.undefined
    expect(whered.Any()).is.false
    expect(whered.Count()).is.equal(0)
  })
})

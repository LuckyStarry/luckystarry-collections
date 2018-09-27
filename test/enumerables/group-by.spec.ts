/* tslint:disable */
import { expect } from 'chai'
import { groupBy } from '../../src/enumerables/group-by'
import { List } from '../../src'
import { IEqualityComparer } from '../../src/equality-comparer'

describe('./enumerables/group-by.ts', function() {
  it('存在 groupBy 方法', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(groupBy).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(groupBy).not.undefined
    expect(typeof groupBy).to.equal('function')
  })

  it('groupBy(null, k => k, e => e) => throw', function() {
    expect(() => {
      groupBy(null, k => k, e => e)
    }).to.throw(`参数 source 不可为空`)
  })

  it('groupBy(undefined, k => k, e => e) => throw', function() {
    expect(() => {
      groupBy(undefined, k => k, e => e)
    }).to.throw(`参数 source 不可为空`)
  })

  it('groupBy([], null, e => e) => throw', function() {
    expect(() => {
      groupBy([], null, e => e)
    }).to.throw(`参数 keySelector 不可为空`)
  })

  it('groupBy([], undefined, e => e) => throw', function() {
    expect(() => {
      groupBy([], undefined, e => e)
    }).to.throw(`参数 keySelector 不可为空`)
  })

  it('groupBy([], k => k, null) => throw', function() {
    expect(() => {
      groupBy([], k => k, null)
    }).to.throw(`参数 elementSelector 不可为空`)
  })

  it('groupBy([], k => k, undefined) => throw', function() {
    expect(() => {
      groupBy([], k => k, undefined)
    }).to.throw(`参数 elementSelector 不可为空`)
  })

  it('groupBy([], k => k, e => e) => throw', function() {
    let results = groupBy([], k => k, e => e)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(0)
  })

  it('groupBy([1], k => k, e => e) => [{Key:1, [1]}]', function() {
    let results = groupBy([1], k => k, e => e)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(1)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Count()).is.equal(1)
  })

  it('groupBy([1, 2], k => k, e => e) => [{Key:1, [1]}, {Key:2, [2]}]', function() {
    let results = groupBy([1, 2], k => k, e => e)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(2)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Count()).is.equal(1)
    expect(results.ElementAt(1).Key).is.equal(2)
    expect(results.ElementAt(1).Count()).is.equal(1)
  })

  it('groupBy([1, 2, 3, 1], k => k, e => e) => [{Key:1, [1, 1]}, {Key:2, [2]}, {Key:3, [3]}]', function() {
    let results = groupBy([1, 2, 3, 1], k => k, e => e)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(3)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Count()).is.equal(2)
    expect(results.ElementAt(0).ElementAt(0)).is.equal(1)
    expect(results.ElementAt(0).ElementAt(1)).is.equal(1)
    expect(results.ElementAt(1).Key).is.equal(2)
    expect(results.ElementAt(1).Count()).is.equal(1)
    expect(results.ElementAt(1).ElementAt(0)).is.equal(2)
    expect(results.ElementAt(2).Key).is.equal(3)
    expect(results.ElementAt(2).Count()).is.equal(1)
    expect(results.ElementAt(2).ElementAt(0)).is.equal(3)
  })

  it('groupBy([1, 2, 3, 1], k => k, e => e * 2) => [{Key:1, [2, 2]}, {Key:2, [4]}, {Key:3, [6]}]', function() {
    let results = groupBy([1, 2, 3, 1], k => k, e => e * 2)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(3)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Count()).is.equal(2)
    expect(results.ElementAt(0).ElementAt(0)).is.equal(2)
    expect(results.ElementAt(0).ElementAt(1)).is.equal(2)
    expect(results.ElementAt(1).Key).is.equal(2)
    expect(results.ElementAt(1).Count()).is.equal(1)
    expect(results.ElementAt(1).ElementAt(0)).is.equal(4)
    expect(results.ElementAt(2).Key).is.equal(3)
    expect(results.ElementAt(2).Count()).is.equal(1)
    expect(results.ElementAt(2).ElementAt(0)).is.equal(6)
  })
})

class NumberEqualityImpl implements IEqualityComparer<number> {
  public Equal(x: number, y: number): boolean {
    return x === y
  }
}

class NumberEqualityImplPlus implements IEqualityComparer<number> {
  public Equal(x: number, y: number): boolean {
    return x === y + 1
  }
}

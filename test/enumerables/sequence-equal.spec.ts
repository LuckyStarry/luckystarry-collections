/* tslint:disable */
import { expect } from 'chai'
import { sequenceEqual } from '../../src/enumerables/sequence-equal'
import { EqualityComparer } from '../../src/equality-comparer'

describe('./enumerables/sequence-equal.ts', function() {
  it('存在 sequenceEqual 方法', function() {
    expect(sequenceEqual).not.null
    expect(sequenceEqual).not.undefined
    expect(typeof sequenceEqual).to.equal('function')
  })

  it('sequenceEqual(null, []) => throw', function() {
    expect(() => {
      sequenceEqual(null, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('sequenceEqual(undefined, []) => throw', function() {
    expect(() => {
      sequenceEqual(undefined, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('sequenceEqual([], []) => throw', function() {
    expect(() => {
      sequenceEqual([], null)
    }).to.throw(`参数 second 不可为空`)
  })

  it('sequenceEqual([], undefined) => throw', function() {
    expect(() => {
      sequenceEqual([], undefined)
    }).to.throw(`参数 second 不可为空`)
  })

  it('sequenceEqual([], []) => true', function() {
    expect(sequenceEqual([], [])).is.true
  })

  it('sequenceEqual([1], [2]) => false', function() {
    expect(sequenceEqual([1], [2])).is.false
  })

  it('sequenceEqual([2], [1]) => false', function() {
    expect(sequenceEqual([2], [1])).is.false
  })

  it('sequenceEqual([1, 2, 3, 4], [1, 2, 3, 4]) => true', function() {
    expect(sequenceEqual([1, 2, 3, 4], [1, 2, 3, 4])).is.true
  })

  it('sequenceEqual([1, 2, 3, 4], [1, 2, 3, 4, 5]) => false', function() {
    expect(sequenceEqual([1, 2, 3, 4], [1, 2, 3, 4, 5])).is.false
  })

  it('sequenceEqual([5, 1, 2, 3, 4], [1, 2, 3, 4, 5]) => false', function() {
    expect(sequenceEqual([5, 1, 2, 3, 4], [1, 2, 3, 4, 5])).is.false
  })

  it('sequenceEqual([1, 2, 3, 4], [1, 2, 3]) => false', function() {
    expect(sequenceEqual([1, 2, 3, 4], [1, 2, 3])).is.false
  })

  it('sequenceEqual([3, 2, 4, 10], [7, 4, 12, 6], (x, y) => x % 2 === y % 2) => true', function() {
    expect(sequenceEqual([3, 2, 4, 10], [7, 4, 12, 6], new SpecEqual())).is.true
  })
})

class SpecEqual implements EqualityComparer<number> {
  public Equal(x: number, y: number): boolean {
    return x % 2 === y % 2
  }
}

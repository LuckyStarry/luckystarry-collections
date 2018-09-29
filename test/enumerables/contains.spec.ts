/* tslint:disable */
import { expect } from 'chai'
import { contains } from '../../src/enumerables/contains'
import { EqualityComparer } from '../../src/equality-comparer'
import { List } from '../../src'

describe('./enumerables/contains.ts', function() {
  it('存在 contains 方法', function() {
    expect(contains).not.null
    expect(contains).not.undefined
    expect(typeof contains).to.equal('function')
  })

  it('contains(null, 1) => throw', function() {
    expect(() => {
      contains(null, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('contains(undefined, 1) => throw', function() {
    expect(() => {
      contains(undefined, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('contains([], 1) => false', function() {
    expect(contains([], 1)).is.false
  })

  it('contains([], null) => false', function() {
    expect(contains([], null)).is.false
  })

  it('contains([1], 1) => true', function() {
    expect(contains([1], 1)).is.true
  })

  it('contains([1], 2) => false', function() {
    expect(contains([1], 2)).is.false
  })

  it('contains([1, 2, 3], 2) => true', function() {
    expect(contains([1, 2, 3], 2)).is.true
  })

  it('contains(new List(), 1) => false', function() {
    expect(contains(new List(), 1)).is.false
  })

  it('contains(new List(), null) => false', function() {
    expect(contains(new List(), null)).is.false
  })

  it('contains(new List([1, 2, 3]), 2) => true', function() {
    expect(contains(new List([1, 2, 3]), 2)).is.true
  })

  it('contains(new List([1, 2, 3]), 0) => false', function() {
    expect(contains(new List([1, 2, 3]), 0)).is.false
  })

  it('contains(new List([1, 2, 3]), 2, (x, y) => x === y) => true', function() {
    expect(contains(new List([1, 2, 3]), 2, new NumberEqualityImpl())).is.true
  })

  it('contains(new List([1, 2, 3]), 0, (x, y) => x === y + 1) => true', function() {
    expect(contains(new List([1, 2, 3]), 0, new NumberEqualityImplPlus())).is
      .true
  })
})

class NumberEqualityImpl extends EqualityComparer<number> {
  public Equals(x: number, y: number): boolean {
    return x === y
  }
}

class NumberEqualityImplPlus extends EqualityComparer<number> {
  public Equals(x: number, y: number): boolean {
    return x === y + 1
  }
}

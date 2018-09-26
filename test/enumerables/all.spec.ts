import { expect } from 'chai'
import { all } from '../../src/enumerables/all'
import { List } from '../../src'

describe('./enumerables/all.ts', function() {
  it('存在 all 方法', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(all).not.undefined
    expect(typeof all).to.equal('function')
  })

  it('all(null, x => true) => throw', function() {
    expect(() => {
      all(null, x => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('all(undefined, x => true) => throw', function() {
    expect(() => {
      all(undefined, x => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('all([], x => true) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all([], x => true)).is.false
  })

  it('all([], x => false) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all([], x => false)).is.false
  })

  it('all([1], x => x > 0) => true', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all([1], x => x > 0)).is.true
  })

  it('all([1], x => x > 1) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all([1], x => x > 1)).is.false
  })

  it('all([1, 2, 3], x => x > 2) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all([1, 2, 3], x => x > 2)).is.false
  })

  it('all(new List(), x => true) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all(new List(), x => true)).is.false
  })

  it('all(new List(), x => false) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all(new List(), x => false)).is.false
  })

  it('all(new List([1, 2, 3]), x => x > 0) => true', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all(new List([1, 2, 3]), x => x > 0)).is.true
  })

  it('all(new List([1, 2, 3]), x => x > 2) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(all(new List([1, 2, 3]), x => x > 2)).is.false
  })
})

import { expect } from 'chai'
import { any } from '../../src/enumerables/any'
import { List } from '../../src'

describe('./enumerables/any.ts', function() {
  it('存在 any 方法', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(any).not.undefined
    expect(typeof any).to.equal('function')
  })

  it('any(null, x => true) => throw', function() {
    expect(() => {
      any(null, x => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('any(undefined, x => true) => throw', function() {
    expect(() => {
      any(undefined, x => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('any([], x => true) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any([], x => true)).is.false
  })

  it('any([], x => false) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any([], x => false)).is.false
  })

  it('any([1], x => x > 0) => true', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any([1], x => x > 0)).is.true
  })

  it('any([1], x => x > 1) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any([1], x => x > 1)).is.false
  })

  it('any([1, 2, 3], x => x > 2) => true', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any([1, 2, 3], x => x > 2)).is.true
  })

  it('any(new List(), x => true) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any(new List(), x => true)).is.false
  })

  it('any(new List(), x => false) => false', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any(new List(), x => false)).is.false
  })

  it('any(new List([1, 2, 3]), x => x > 0) => true', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any(new List([1, 2, 3]), x => x > 0)).is.true
  })

  it('any(new List([1, 2, 3]), x => x > 2) => true', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(any(new List([1, 2, 3]), x => x > 2)).is.true
  })
})

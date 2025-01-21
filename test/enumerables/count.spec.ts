/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { any } from '../../src/enumerables/any'

describe('./enumerables/any.ts', function () {
  it('存在 any 方法', function () {
    expect(any).not.null
    expect(any).not.undefined
    expect(typeof any).to.equal('function')
  })

  it('any(null, x => true) => throw', function () {
    expect(() => {
      any(null as any, (x) => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('any(undefined, x => true) => throw', function () {
    expect(() => {
      any(undefined as any, (x) => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('any([], x => true) => false', function () {
    expect(any([], (x) => true)).is.false
  })

  it('any([], x => false) => false', function () {
    expect(any([], (x) => false)).is.false
  })

  it('any([1], x => x > 0) => true', function () {
    expect(any([1], (x) => x > 0)).is.true
  })

  it('any([1], x => x > 1) => false', function () {
    expect(any([1], (x) => x > 1)).is.false
  })

  it('any([1, 2, 3], x => x > 2) => true', function () {
    expect(any([1, 2, 3], (x) => x > 2)).is.true
  })

  it('any(new List(), x => true) => false', function () {
    expect(any(new List(), (x) => true)).is.false
  })

  it('any(new List(), x => false) => false', function () {
    expect(any(new List(), (x) => false)).is.false
  })

  it('any(new List([1, 2, 3]), x => x > 0) => true', function () {
    expect(any(new List([1, 2, 3]), (x) => x > 0)).is.true
  })

  it('any(new List([1, 2, 3]), x => x > 2) => true', function () {
    expect(any(new List([1, 2, 3]), (x) => x > 2)).is.true
  })
})

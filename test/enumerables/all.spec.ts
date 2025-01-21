/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { all } from '../../src/enumerables/all'

describe('./enumerables/all.ts', function () {
  it('存在 all 方法', function () {
    expect(all).not.null
    expect(all).not.undefined
    expect(typeof all).to.equal('function')
  })

  it('all(null, x => true) => throw', function () {
    expect(() => {
      all(null as any, (x) => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('all(undefined, x => true) => throw', function () {
    expect(() => {
      all(undefined as any, (x) => true)
    }).to.throw(`参数 source 不可为空`)
  })

  it('all([], x => true) => false', function () {
    expect(all([], (x) => true)).is.false
  })

  it('all([], x => false) => false', function () {
    expect(all([], (x) => false)).is.false
  })

  it('all([1], x => x > 0) => true', function () {
    expect(all([1], (x) => x > 0)).is.true
  })

  it('all([1], x => x > 1) => false', function () {
    expect(all([1], (x) => x > 1)).is.false
  })

  it('all([1, 2, 3], x => x > 2) => false', function () {
    expect(all([1, 2, 3], (x) => x > 2)).is.false
  })

  it('all(new List(), x => true) => false', function () {
    expect(all(new List(), (x) => true)).is.false
  })

  it('all(new List(), x => false) => false', function () {
    expect(all(new List(), (x) => false)).is.false
  })

  it('all(new List([1, 2, 3]), x => x > 0) => true', function () {
    expect(all(new List([1, 2, 3]), (x) => x > 0)).is.true
  })

  it('all(new List([1, 2, 3]), x => x > 2) => false', function () {
    expect(all(new List([1, 2, 3]), (x) => x > 2)).is.false
  })
})

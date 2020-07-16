/* tslint:disable */
import { expect } from 'chai'
import { skip } from '../../src/enumerables/skip'

describe('./enumerables/skip.ts', function () {
  it('存在 skip 方法', function () {
    expect(skip).not.null
    expect(skip).not.undefined
    expect(typeof skip).to.equal('function')
  })

  it('skip(null, 1) => throw', function () {
    expect(() => {
      skip(null, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('skip(undefined, 2) => throw', function () {
    expect(() => {
      skip(undefined, 2)
    }).to.throw(`参数 source 不可为空`)
  })

  it('skip([], 0) => []', function () {
    let skipped = skip([], 0)
    expect(skipped).is.not.null
    expect(skipped).is.not.undefined
    expect(skipped.Any()).is.false
  })

  it('skip([], 1) => []', function () {
    let skipped = skip([], 1)
    expect(skipped).is.not.null
    expect(skipped).is.not.undefined
    expect(skipped.Any()).is.false
  })

  it('skip([10, 20], 1) => [20]', function () {
    let skipped = skip([10, 20], 1)
    expect(skipped.Count()).is.equal(1)
    expect(skipped.ElementAt(0)).is.equal(20)
  })

  it('skip([10, 20, 30], 1) => [20, 30]', function () {
    let skipped = skip([10, 20, 30], 1)
    expect(skipped.Count()).is.equal(2)
    expect(skipped.ElementAt(0)).is.equal(20)
    expect(skipped.ElementAt(1)).is.equal(30)
  })

  it('skip([10, 20, 30, 1], 1) => [20, 30, 1]', function () {
    let skipped = skip([10, 20, 30, 1], 1)
    expect(skipped.Count()).is.equal(3)
    expect(skipped.ElementAt(0)).is.equal(20)
    expect(skipped.ElementAt(1)).is.equal(30)
    expect(skipped.ElementAt(2)).is.equal(1)
  })

  it('skip([10, 20, 30, 1], 2) => [30, 1]', function () {
    let skipped = skip([10, 20, 30, 1], 2)
    expect(skipped.Count()).is.equal(2)
    expect(skipped.ElementAt(0)).is.equal(30)
    expect(skipped.ElementAt(1)).is.equal(1)
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { take } from '../../src/enumerables/take'

describe('./enumerables/take.ts', function() {
  it('存在 take 方法', function() {
    expect(take).not.null
    expect(take).not.undefined
    expect(typeof take).to.equal('function')
  })

  it('take(null, 1) => throw', function() {
    expect(() => {
      take(null, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('take(undefined, 2) => throw', function() {
    expect(() => {
      take(undefined, 2)
    }).to.throw(`参数 source 不可为空`)
  })

  it('take([], 0) => []', function() {
    let takeped = take([], 0)
    expect(takeped).is.not.null
    expect(takeped).is.not.undefined
    expect(takeped.Any()).is.false
  })

  it('take([], 1) => []', function() {
    let takeped = take([], 1)
    expect(takeped).is.not.null
    expect(takeped).is.not.undefined
    expect(takeped.Any()).is.false
  })

  it('take([10, 20], 1) => [10]', function() {
    let takeped = take([10, 20], 1)
    expect(takeped.Count()).is.equal(1)
    expect(takeped.ElementAt(0)).is.equal(10)
  })

  it('take([10, 20, 30], 1) => [10]', function() {
    let takeped = take([10, 20, 30], 1)
    expect(takeped.Count()).is.equal(1)
    expect(takeped.ElementAt(0)).is.equal(10)
  })

  it('take([10, 20, 30, 1], 1) => [10]', function() {
    let takeped = take([10, 20, 30, 1], 1)
    expect(takeped.Count()).is.equal(1)
    expect(takeped.ElementAt(0)).is.equal(10)
  })

  it('take([10, 20, 30, 1], 2) => [10, 20]', function() {
    let takeped = take([10, 20, 30, 1], 2)
    expect(takeped.Count()).is.equal(2)
    expect(takeped.ElementAt(0)).is.equal(10)
    expect(takeped.ElementAt(1)).is.equal(20)
  })
})

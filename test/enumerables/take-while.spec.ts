/* tslint:disable */
import { expect } from 'chai'
import { takeWhile } from '../../src/enumerables/take-while'

describe('./enumerables/take-while.ts', function () {
  it('存在 takeWhile 方法', function () {
    expect(takeWhile).not.null
    expect(takeWhile).not.undefined
    expect(typeof takeWhile).to.equal('function')
  })

  it('takeWhile(null, x => x > 0) => throw', function () {
    expect(() => {
      takeWhile(null as any, (x: any) => x > 0)
    }).to.throw(`参数 source 不可为空`)
  })

  it('takeWhile(undefined, x => x > 1) => throw', function () {
    expect(() => {
      takeWhile(undefined as any, (x: any) => x > 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('takeWhile([], x => x > 0) => []', function () {
    let takeWhileped = takeWhile([], (x) => x > 0)
    expect(takeWhileped).is.not.null
    expect(takeWhileped).is.not.undefined
    expect(takeWhileped.Any()).is.false
  })

  it('takeWhile([], x => !!x) => []', function () {
    let takeWhileped = takeWhile([], (x) => !!x)
    expect(takeWhileped).is.not.null
    expect(takeWhileped).is.not.undefined
    expect(takeWhileped.Any()).is.false
  })

  it('takeWhile([10, 20], x => x < 20) => [10]', function () {
    let takeWhileped = takeWhile([10, 20], (x) => x < 20)
    expect(takeWhileped.Count()).is.equal(1)
    expect(takeWhileped.ElementAt(0)).is.equal(10)
  })

  it('takeWhile([10, 20, 30], x => x > 10) => []', function () {
    let takeWhileped = takeWhile([10, 20, 30], (x) => x > 10)
    expect(takeWhileped).is.not.null
    expect(takeWhileped).is.not.undefined
    expect(takeWhileped.Any()).is.false
  })

  it('takeWhile([10, 20, 30], (x, i) => i < 1) => [10]', function () {
    let takeWhileped = takeWhile([10, 20, 30], (x, i) => i! < 1)
    expect(takeWhileped.Count()).is.equal(1)
    expect(takeWhileped.ElementAt(0)).is.equal(10)
  })

  it('takeWhile([10, 20, 30, 1], x => x < 20) => [10]', function () {
    let takeWhileped = takeWhile([10, 20, 30, 1], (x) => x < 20)
    expect(takeWhileped.Count()).is.equal(1)
    expect(takeWhileped.ElementAt(0)).is.equal(10)
  })

  it('takeWhile([10, 20, 30, 1], x => x <= 20) => [10, 20]', function () {
    let takeWhileped = takeWhile([10, 20, 30, 1], (x) => x <= 20)
    expect(takeWhileped.Count()).is.equal(2)
    expect(takeWhileped.ElementAt(0)).is.equal(10)
    expect(takeWhileped.ElementAt(1)).is.equal(20)
  })

  it('takeWhile([1, 0, -1, null, undefined, 3], x => !!x) => [1, 0, -1, null, undefined, 3]', function () {
    let takeWhileped = takeWhile([1, 0, -1, null, undefined, 3], (x) => !!x)
    expect(takeWhileped.Count()).is.equal(1)
    expect(takeWhileped.ElementAt(0)).is.equal(1)
  })
})

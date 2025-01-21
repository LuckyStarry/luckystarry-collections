/* tslint:disable */
import { expect } from 'chai'
import { skipWhile } from '../../src/enumerables/skip-while'

describe('./enumerables/skip-while.ts', function () {
  it('存在 skipWhile 方法', function () {
    expect(skipWhile).not.null
    expect(skipWhile).not.undefined
    expect(typeof skipWhile).to.equal('function')
  })

  it('skipWhile(null, x => x > 0) => throw', function () {
    expect(() => {
      skipWhile(null as any, (x: any) => x > 0)
    }).to.throw(`参数 source 不可为空`)
  })

  it('skipWhile(undefined, x => x > 1) => throw', function () {
    expect(() => {
      skipWhile(undefined as any, (x: any) => x > 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('skipWhile([], x => x > 0) => []', function () {
    let skipWhileped = skipWhile([], (x) => x > 0)
    expect(skipWhileped).is.not.null
    expect(skipWhileped).is.not.undefined
    expect(skipWhileped.Any()).is.false
  })

  it('skipWhile([], x => !!x) => []', function () {
    let skipWhileped = skipWhile([], (x) => !!x)
    expect(skipWhileped).is.not.null
    expect(skipWhileped).is.not.undefined
    expect(skipWhileped.Any()).is.false
  })

  it('skipWhile([10, 20], x => x <= 10) => [20]', function () {
    let skipWhileped = skipWhile([10, 20], (x) => x <= 10)
    expect(skipWhileped.Count()).is.equal(1)
    expect(skipWhileped.ElementAt(0)).is.equal(20)
  })

  it('skipWhile([10, 20, 30], (x, i) => i < 1) => [20, 30]', function () {
    let skipWhileped = skipWhile([10, 20, 30], (x, i) => i! < 1)
    expect(skipWhileped.Count()).is.equal(2)
    expect(skipWhileped.ElementAt(0)).is.equal(20)
    expect(skipWhileped.ElementAt(1)).is.equal(30)
  })

  it('skipWhile([10, 20, 30, 1], x => x >= 20) => [10, 20, 30, 1]', function () {
    let skipWhileped = skipWhile([10, 20, 30, 1], (x) => x >= 20)
    expect(skipWhileped.Count()).is.equal(4)
    expect(skipWhileped.ElementAt(0)).is.equal(10)
    expect(skipWhileped.ElementAt(1)).is.equal(20)
    expect(skipWhileped.ElementAt(2)).is.equal(30)
    expect(skipWhileped.ElementAt(3)).is.equal(1)
  })

  it('skipWhile([10, 20, 30, 1], x => x < 20) => [20, 30, 1]', function () {
    let skipWhileped = skipWhile([10, 20, 30, 1], (x) => x < 20)
    expect(skipWhileped.Count()).is.equal(3)
    expect(skipWhileped.ElementAt(0)).is.equal(20)
    expect(skipWhileped.ElementAt(1)).is.equal(30)
    expect(skipWhileped.ElementAt(2)).is.equal(1)
  })

  it('skipWhile([1, 0, -1, null, undefined, 3], x => !!x) => [0, -1, null, undefined, 3]', function () {
    let skipWhileped = skipWhile([1, 0, -1, null, undefined, 3], (x) => !!x)
    expect(skipWhileped.Count()).is.equal(5)
    expect(skipWhileped.ElementAt(0)).is.equal(0)
    expect(skipWhileped.ElementAt(1)).is.equal(-1)
    expect(skipWhileped.ElementAt(2)).is.null
    expect(skipWhileped.ElementAt(3)).is.undefined
    expect(skipWhileped.ElementAt(4)).is.equal(3)
  })
})

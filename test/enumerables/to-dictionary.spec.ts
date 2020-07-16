/* tslint:disable */
import { expect } from 'chai'
import { toDictionary } from '../../src/enumerables/to-dictionary'

describe('./enumerables/to-dictionary.ts', function () {
  it('存在 toDictionary 方法', function () {
    expect(toDictionary).not.null
    expect(toDictionary).not.undefined
    expect(typeof toDictionary).to.equal('function')
  })

  it('toDictionary(null, x => x, y => y) => throw', function () {
    expect(() => {
      toDictionary(
        null,
        (x) => x,
        (y) => y
      )
    }).to.throw(`参数 source 不可为空`)
  })

  it('toDictionary(undefined, x => x, y => y) => throw', function () {
    expect(() => {
      toDictionary(
        undefined,
        (x) => x,
        (y) => y
      )
    }).to.throw(`参数 source 不可为空`)
  })

  it('toDictionary([], null, y => y) => throw', function () {
    expect(() => {
      toDictionary([], null, (y) => y)
    }).to.throw(`参数 keySelector 不可为空`)
  })

  it('toDictionary([], undefined, y => y) => throw', function () {
    expect(() => {
      toDictionary([], undefined, (y) => y)
    }).to.throw(`参数 keySelector 不可为空`)
  })

  it('toDictionary([], x => x) => []', function () {
    let array = toDictionary([], (x) => x)
    expect(array).is.not.null
    expect(array).is.not.undefined
    expect(array.Count()).is.equal(0)
  })

  it('toDictionary([1], x => x) => [{1, 1}]', function () {
    let dic = toDictionary([1], (x) => x)
    expect(dic.Count()).is.equal(1)
    expect(dic.Get(1)).is.equal(1)
  })

  it('toDictionary([1], x => x, y => y * 3) => [{1, 3}]', function () {
    let dic = toDictionary(
      [1],
      (x) => x,
      (y) => y * 3
    )
    expect(dic.Count()).is.equal(1)
    expect(dic.Get(1)).is.equal(3)
  })

  it('toDictionary([1, 2], x => x) => [{1, 1}, {2, 2}]', function () {
    let dic = toDictionary([1, 2], (x) => x)
    expect(dic.Count()).is.equal(2)
    expect(dic.Get(1)).is.equal(1)
    expect(dic.Get(2)).is.equal(2)
  })

  it('toDictionary([1, 2, 2], x => x) => throw', function () {
    expect(() => {
      toDictionary([1, 2, 2], (x) => x)
    }).to.throw('已经存在相同的Key')
  })

  it('toDictionary([1, 2, 3], x => x % 2) => throw', function () {
    expect(() => {
      toDictionary([1, 2, 3], (x) => x % 2)
    }).to.throw('已经存在相同的Key')
  })
})

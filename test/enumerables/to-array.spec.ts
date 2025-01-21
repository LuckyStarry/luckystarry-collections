/* tslint:disable */
import { expect } from 'chai'
import { toArray } from '../../src/enumerables/to-array'
import { List } from '../../src/list'

describe('./enumerables/to-array.ts', function () {
  it('存在 toArray 方法', function () {
    expect(toArray).not.null
    expect(toArray).not.undefined
    expect(typeof toArray).to.equal('function')
  })

  it('toArray(null) => throw', function () {
    expect(() => {
      toArray(null as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('toArray(undefined) => throw', function () {
    expect(() => {
      toArray(undefined as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('toArray([]) => []', function () {
    let array = toArray([])
    expect(array).is.not.null
    expect(array).is.not.undefined
    expect(array.length).is.equal(0)
  })

  it('toArray([1]) => [1]', function () {
    let array = toArray([1])
    expect(array.length).is.equal(1)
    expect(array[0]).is.equal(1)
  })

  it('toArray([1, 2]) => [1, 2]', function () {
    let array = toArray([1, 2])
    expect(array.length).is.equal(2)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
  })

  it('toArray([1, 2, 3]) => [1, 2, 3]', function () {
    let array = toArray([1, 2, 3])
    expect(array.length).is.equal(3)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
    expect(array[2]).is.equal(3)
  })

  it('toArray(new List([1, 2, 3])) => [1, 2, 3]', function () {
    let array = toArray(new List([1, 2, 3]))
    expect(array.length).is.equal(3)
    expect(array[0]).is.equal(1)
    expect(array[1]).is.equal(2)
    expect(array[2]).is.equal(3)
  })
})

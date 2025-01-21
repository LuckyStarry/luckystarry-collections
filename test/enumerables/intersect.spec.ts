/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { intersect } from '../../src/enumerables/intersect'

describe('./enumerables/intersect.ts', function () {
  it('存在 intersect 方法', function () {
    expect(intersect).not.null
    expect(intersect).not.undefined
    expect(typeof intersect).to.equal('function')
  })

  it('intersect(null, []) => throw', function () {
    expect(() => {
      intersect(null as any, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('intersect(undefined, []) => throw', function () {
    expect(() => {
      intersect(undefined as any, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('intersect([], []) => throw', function () {
    expect(() => {
      intersect([], null as any)
    }).to.throw(`参数 second 不可为空`)
  })

  it('intersect([], undefined) => throw', function () {
    expect(() => {
      intersect([], undefined as any)
    }).to.throw(`参数 second 不可为空`)
  })

  it('intersect([], []) => Empty', function () {
    expect(intersect([], []).Any()).is.false
  })

  it('intersect([1], [2]) => []', function () {
    let intersected = intersect([1], [2])
    expect(intersected).is.not.null
    expect(intersected).is.not.undefined
    expect(intersected.Any()).is.false
  })

  it('intersect([2], [1]) => []', function () {
    let intersected = intersect([2], [1])
    expect(intersected).is.not.null
    expect(intersected).is.not.undefined
    expect(intersected.Any()).is.false
  })

  it('intersect([1, 2, 3, 4], [4, 5, 6, 6]) => [4]', function () {
    let intersected = intersect([1, 2, 3, 4], [4, 5, 6, 7])
    expect(intersected.Any()).is.true
    expect(intersected.Count()).is.equal(1)
    expect(intersected.ElementAt(0)).is.equal(4)
  })

  it('intersect([1, 2, 3, 4], new List([4, 5, 6, 7])) => [4]', function () {
    let intersected = intersect([1, 2, 3, 4], new List([4, 5, 6, 7]))
    expect(intersected.Any()).is.true
    expect(intersected.Count()).is.equal(1)
    expect(intersected.ElementAt(0)).is.equal(4)
  })
})

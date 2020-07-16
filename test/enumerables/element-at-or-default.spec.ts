/* tslint:disable */
import { expect } from 'chai'
import { elementAtOrDefault } from '../../src/enumerables/element-at-or-default'

describe('./enumerables/element-at-or-default.ts', function () {
  it('存在 elementAtOrDefault 方法', function () {
    expect(elementAtOrDefault).not.null
    expect(elementAtOrDefault).not.undefined
    expect(typeof elementAtOrDefault).to.equal('function')
  })

  it('elementAtOrDefault(null, null, 0) => throw', function () {
    expect(() => {
      elementAtOrDefault(null, null, 0)
    }).to.throw(`参数 source 不可为空`)
  })

  it('elementAtOrDefault(undefined, null, 0) => throw', function () {
    expect(() => {
      elementAtOrDefault(undefined, null, 0)
    }).to.throw(`参数 source 不可为空`)
  })

  it('elementAtOrDefault([], 1, 0) => 1', function () {
    let value = elementAtOrDefault([], 1, 0)
    expect(value).is.equal(1)
  })

  it('elementAtOrDefault([], 2, 0) => 2', function () {
    let value = elementAtOrDefault([], 2, 0)
    expect(value).is.equal(2)
  })

  it('elementAtOrDefault([1], 2, 0) => 1', function () {
    let value = elementAtOrDefault([1], 2, 0)
    expect(value).is.equal(1)
  })

  it('elementAtOrDefault([1], 10, -1) => 10', function () {
    let value = elementAtOrDefault([1], 10, -1)
    expect(value).is.equal(10)
  })

  it('elementAtOrDefault([1, 2, 3], 10, -1) => 10', function () {
    let value = elementAtOrDefault([1, 2, 3], 10, -1)
    expect(value).is.equal(10)
  })

  it('elementAtOrDefault([1, 2, 3], 10, 4) => 10', function () {
    let value = elementAtOrDefault([1, 2, 3], 10, 4)
    expect(value).is.equal(10)
  })

  it('elementAtOrDefault([1, 2, 3], null, 4) => null', function () {
    let value = elementAtOrDefault([1, 2, 3], null, 4)
    expect(value).is.null
    expect(value).is.not.undefined
  })
})

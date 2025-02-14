/* tslint:disable */
import { expect } from 'chai'
import { elementAt } from '../../src/enumerables/element-at'

describe('./enumerables/element-at-or-default.ts', function () {
  it('存在 elementAt 方法', function () {
    expect(elementAt).not.null
    expect(elementAt).not.undefined
    expect(typeof elementAt).to.equal('function')
  })

  it('elementAt(null, 0) => throw', function () {
    expect(() => {
      elementAt(null as any, 0)
    }).to.throw(`参数 source 不可为空`)
  })

  it('elementAt(undefined, 0) => throw', function () {
    expect(() => {
      elementAt(undefined as any, 0)
    }).to.throw(`参数 source 不可为空`)
  })

  it('elementAt([], 0) => throw', function () {
    expect(() => {
      elementAt([], 0)
    }).to.throw(`参数 index 的范围越界 0`)
  })

  it('elementAt([1], 0) => 1', function () {
    let value = elementAt([1], 0)
    expect(value).is.equal(1)
  })

  it('elementAt([1, 10, 100], 1) => 10', function () {
    let value = elementAt([1, 10, 100], 1)
    expect(value).is.equal(10)
  })

  it('elementAt([1, 10, 100], -1) => throw', function () {
    expect(() => {
      elementAt([1, 10, 100], -1)
    }).to.throw(`参数 index 的范围越界 -1`)
  })
})

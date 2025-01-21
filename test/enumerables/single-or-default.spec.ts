/* tslint:disable */
import { expect } from 'chai'
import { singleOrDefault } from '../../src/enumerables/single-or-default'
import { List } from '../../src/list'

describe('./enumerables/single-or-default.ts', function () {
  it('存在 singleOrDefault 方法', function () {
    expect(singleOrDefault).not.null
    expect(singleOrDefault).not.undefined
    expect(typeof singleOrDefault).to.equal('function')
  })

  it('singleOrDefault(null, 1) => throw', function () {
    expect(() => {
      singleOrDefault(null as any, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('singleOrDefault(undefined, 1) => throw', function () {
    expect(() => {
      singleOrDefault(undefined as any, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('singleOrDefault([], 1) => 1', function () {
    let value = singleOrDefault([], 1)
    expect(value).is.equal(1)
  })

  it('singleOrDefault([], 2) => 2', function () {
    let value = singleOrDefault([], 2)
    expect(value).is.equal(2)
  })

  it('singleOrDefault([1], 2) => 1', function () {
    let value = singleOrDefault([1], 2)
    expect(value).is.equal(1)
  })

  it('singleOrDefault([1], 10) => 1', function () {
    let value = singleOrDefault([1], 10)
    expect(value).is.equal(1)
  })

  it('singleOrDefault([1, 2, 3], 10) => throw', function () {
    expect(() => {
      singleOrDefault([1, 2, 3], 10)
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('singleOrDefault([1, 2, 3], null) => throw', function () {
    expect(() => {
      singleOrDefault([1, 2, 3], null)
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('singleOrDefault([1, 2, 3, 1], null) => throw', function () {
    expect(() => {
      singleOrDefault([1, 2, 3, 1], null)
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('singleOrDefault([1, 2, 3, 3], null) => throw', function () {
    expect(() => {
      singleOrDefault([1, 2, 3, 3], null)
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('singleOrDefault(new List([1]), 10) => 1', function () {
    let value = singleOrDefault(new List([1]), 10)
    expect(value).is.equal(1)
  })

  it('singleOrDefault([1, 2, 3], null, x => x > 2) => 3', function () {
    let value = singleOrDefault([1, 2, 3], null, (x) => x! > 2)
    expect(value).is.equal(3)
  })

  it('singleOrDefault([1, 2, 3], null, x => x > 3) => 3', function () {
    let value = singleOrDefault([1, 2, 3], null, (x) => x! > 3)
    expect(value).is.null
  })

  it('singleOrDefault([1, 2, 3], null, x => x > 1) => throw', function () {
    expect(() => {
      singleOrDefault([1, 2, 3], null, (x) => x! > 1)
    }).to.throw(`输入的序列包含多个元素`)
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { single } from '../../src/enumerables/single'
import { List } from '../../src/list'

describe('./enumerables/single.ts', function () {
  it('存在 single 方法', function () {
    expect(single).not.null
    expect(single).not.undefined
    expect(typeof single).to.equal('function')
  })

  it('single(null) => throw', function () {
    expect(() => {
      single(null as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('single(undefined) => throw', function () {
    expect(() => {
      single(undefined as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('single([]) => throw', function () {
    expect(() => {
      single([])
    }).to.throw(`源序列为空`)
  })

  it('single([], x => x === 1) => throw', function () {
    expect(() => {
      single([], (x) => x === 1)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('single([1], x => x === 2) => throw', function () {
    expect(() => {
      single([1], (x) => x === 2)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('single([1]) => 1', function () {
    let value = single([1])
    expect(value).is.equal(1)
  })

  it('single([1, 2, 3]) => throw', function () {
    expect(() => {
      single([1, 2, 3])
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('single([1, 2, 3, 1]) => throw', function () {
    expect(() => {
      single([1, 2, 3, 1])
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('single([1, 2, 3, 3]) => throw', function () {
    expect(() => {
      single([1, 2, 3, 3])
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('single(new List([2, 3, 4])) => throw', function () {
    expect(() => {
      single(new List([2, 3, 4]))
    }).to.throw(`输入的序列包含多个元素`)
  })

  it('single([1, 2, 3], x => x > 2) => 3', function () {
    let value = single([1, 2, 3], (x) => x > 2)
    expect(value).is.equal(3)
  })

  it('single([1, 2, 3], x => x > 3) => 3', function () {
    expect(() => {
      single([1, 2, 3], (x) => x > 3)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('single([1, 2, 3], x => x > 1) => throw', function () {
    expect(() => {
      single([1, 2, 3], (x) => x > 1)
    }).to.throw(`输入的序列包含多个元素`)
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { last } from '../../src/enumerables/last'
import { List } from '../../src/list'

describe('./enumerables/last.ts', function() {
  it('存在 last 方法', function() {
    expect(last).not.null
    expect(last).not.undefined
    expect(typeof last).to.equal('function')
  })

  it('last(null) => throw', function() {
    expect(() => {
      last(null)
    }).to.throw(`参数 source 不可为空`)
  })

  it('last(undefined) => throw', function() {
    expect(() => {
      last(undefined)
    }).to.throw(`参数 source 不可为空`)
  })

  it('last([]) => throw', function() {
    expect(() => {
      last([])
    }).to.throw(`源序列为空`)
  })

  it('last([], x => x === 1) => throw', function() {
    expect(() => {
      last([], x => x === 1)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('last([1], x => x === 2) => throw', function() {
    expect(() => {
      last([1], x => x === 2)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('last([1]) => 1', function() {
    let value = last([1])
    expect(value).is.equal(1)
  })

  it('last([1, 2, 3]) => 3', function() {
    let value = last([1, 2, 3])
    expect(value).is.equal(3)
  })

  it('last(new List([2, 3, 4])) => 4', function() {
    let value = last(new List([2, 3, 4]))
    expect(value).is.equal(4)
  })

  it('last([1, 2, 3], x => x > 2) => 3', function() {
    let value = last([1, 2, 3], x => x > 2)
    expect(value).is.equal(3)
  })

  it('last([1, 2, 3], x => x > 3) => 3', function() {
    expect(() => {
      last([1, 2, 3], x => x > 3)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('last([1, 2, 3], x => x > 1) => 3', function() {
    let value = last([1, 2, 3], x => x > 1)
    expect(value).is.equal(3)
  })
})

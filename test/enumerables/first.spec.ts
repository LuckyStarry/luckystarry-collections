import { expect } from 'chai'
import { first } from '../../src/enumerables/first'
import { List } from '../../src/list'

describe('./enumerables/first.ts', function() {
  it('存在 first 方法', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(first).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(first).not.undefined
    expect(typeof first).to.equal('function')
  })

  it('first(null) => throw', function() {
    expect(() => {
      first(null)
    }).to.throw(`参数 source 不可为空`)
  })

  it('first(undefined) => throw', function() {
    expect(() => {
      first(undefined)
    }).to.throw(`参数 source 不可为空`)
  })

  it('first([]) => throw', function() {
    expect(() => {
      first([])
    }).to.throw(`源序列为空`)
  })

  it('first([], x => x === 1) => throw', function() {
    expect(() => {
      first([], x => x === 1)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('first([1], x => x === 2) => throw', function() {
    expect(() => {
      first([1], x => x === 2)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('first([1]) => 1', function() {
    let value = first([1])
    expect(value).is.equal(1)
  })

  it('first([1, 2, 3]) => 1', function() {
    let value = first([1, 2, 3])
    expect(value).is.equal(1)
  })

  it('first(new List([2, 3, 4])) => 2', function() {
    let value = first(new List([2, 3, 4]))
    expect(value).is.equal(2)
  })

  it('first([1, 2, 3], x => x > 2) => 3', function() {
    let value = first([1, 2, 3], x => x > 2)
    expect(value).is.equal(3)
  })

  it('first([1, 2, 3], x => x > 3) => 3', function() {
    expect(() => {
      first([1, 2, 3], x => x > 3)
    }).to.throw(`没有元素满足条件或源序列为空`)
  })

  it('first([1, 2, 3], x => x > 1) => 2', function() {
    let value = first([1, 2, 3], x => x > 1)
    expect(value).is.equal(2)
  })
})

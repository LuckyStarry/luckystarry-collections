/* tslint:disable */
import { expect } from 'chai'
import { List } from '../src'
import { Enumerable } from '../src/enumerable'

describe('./enumerable.ts', function () {
  it('存在 Class Enumerable', function () {
    expect(Enumerable).not.null
    expect(Enumerable).not.undefined
    expect(typeof Enumerable).to.equal('function')
  })

  it('Enumerable.Empty 可生成空的可枚举对象', function () {
    let empty = Enumerable.Empty<number>()
    expect(empty).not.null
    expect(empty).not.undefined
    expect(empty.Count()).is.equal(0)
  })

  it('Enumerable.Count 无参时返回队列长度', function () {
    let empty = Enumerable.Empty<number>()
    expect(empty.Count()).is.equal(0)
    let list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(list.Count()).is.equal(9)
  })

  it('Enumerable.Count 可传入过滤条件获取符合条件的队列长度', function () {
    let list = new List([1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(list.Count()).is.equal(9)
    expect(list.Count(() => false)).is.equal(0)
    expect(list.Count((x) => x < 3)).is.equal(2)
    expect(list.Count((x) => x > 9)).is.equal(0)
  })
})

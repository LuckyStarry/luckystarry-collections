/* tslint:disable */
import { expect } from 'chai'
import { max } from '../../src/enumerables/max'
import { List } from '../../src'

describe('./enumerables/max.ts', function() {
  it('存在 max 方法', function() {
    expect(max).not.null
    expect(max).not.undefined
    expect(typeof max).to.equal('function')
  })

  it('max(null) => throw', function() {
    expect(() => {
      max(null)
    }).to.throw(`参数 source 不可为空`)
  })

  it('max(undefined) => throw', function() {
    expect(() => {
      max(undefined)
    }).to.throw(`参数 source 不可为空`)
  })

  it('max([]) => null', function() {
    expect(max([])).is.null
  })

  it('max([1]) => 1', function() {
    expect(max([1])).is.equal(1)
  })

  it('max([1, 2]) => 2', function() {
    expect(max([1, 2])).is.equal(2)
  })

  it('max([1, 2, 3]) => 3', function() {
    expect(max([1, 2, 3])).is.equal(3)
  })

  it('max([1, 2, null, 3]) => 3', function() {
    expect(max([1, 2, null, 3])).is.equal(3)
  })

  it('max([null, null, null, null]) => null', function() {
    expect(max([null, null, null, null])).is.null
  })

  it('max([], x => x * 2) => null', function() {
    expect(max([], x => x * 2)).is.null
  })

  it('max([1], x => x * 2) => 2', function() {
    expect(max([1], x => x * 2)).is.equal(2)
  })

  it('max([1, 2], x => x * 2) => 4', function() {
    expect(max([1, 2], x => x * 2)).is.equal(4)
  })

  it('max([1, 2, 3], x => x * 2) => 6', function() {
    expect(max([1, 2, 3], x => x * 2)).is.equal(6)
  })

  it('max([1, 2, null, 3], x => x * 2) => 6', function() {
    expect(max([1, 2, null, 3], x => x * 2)).is.equal(6)
  })

  it('max([null, null, null, null], x => x * 2) => 0', function() {
    expect(max([null, null, null, null], x => x * 2)).is.equal(0)
  })

  it('max([{value : 1}, {value : 2}, {value : 3}], x => x.value * 3) => 9', function() {
    expect(
      max([{ value: 1 }, { value: 2 }, { value: 3 }], x => x.value * 3)
    ).is.equal(9)
  })

  it('max([{value : 1}, {value : 2}, {value : 3}]) => throw', function() {
    expect(() => max([{ value: 1 }, { value: 2 }, { value: 3 }])).to.throw(
      '数值类型以外的数组必须传入 selector'
    )
  })

  it('max(new List([1, 2, null, 3]), x => x * 2) => 6', function() {
    expect(max(new List([1, 2, null, 3]), x => x * 2)).is.equal(6)
  })

  it('max(new List([{value : 1}, {value : 2}, {value : 3}]), x => x.value * 3) => 9', function() {
    expect(
      max(
        new List([{ value: 1 }, { value: 2 }, { value: 3 }]),
        x => x.value * 3
      )
    ).is.equal(9)
  })
})

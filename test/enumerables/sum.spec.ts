/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { sum } from '../../src/enumerables/sum'

describe('./enumerables/sum.ts', function () {
  it('存在 sum 方法', function () {
    expect(sum).not.null
    expect(sum).not.undefined
    expect(typeof sum).to.equal('function')
  })

  it('sum(null) => throw', function () {
    expect(() => {
      sum(null as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('sum(undefined) => throw', function () {
    expect(() => {
      sum(undefined as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('sum([]) => null', function () {
    expect(sum([])).is.null
  })

  it('sum([1]) => 1', function () {
    expect(sum([1])).is.equal(1)
  })

  it('sum([1, 2]) => 3', function () {
    expect(sum([1, 2])).is.equal(3)
  })

  it('sum([1, 2, 3]) => 6', function () {
    expect(sum([1, 2, 3])).is.equal(6)
  })

  it('sum([1, 2, null, 3]) => 6', function () {
    expect(sum([1, 2, null, 3])).is.equal(6)
  })

  it('sum([null, null, null, null]) => null', function () {
    expect(sum([null, null, null, null])).is.null
  })

  it('sum([], x => x * 2) => null', function () {
    expect(sum([], (x) => x * 2)).is.null
  })

  it('sum([1], x => x * 2) => 2', function () {
    expect(sum([1], (x) => x * 2)).is.equal(2)
  })

  it('sum([1, 2], x => x * 2) => 6', function () {
    expect(sum([1, 2], (x) => x * 2)).is.equal(6)
  })

  it('sum([1, 2, 3], x => x * 2) => 12', function () {
    expect(sum([1, 2, 3], (x) => x * 2)).is.equal(12)
  })

  it('sum([1, 2, null, 3], x => x * 2) => 12', function () {
    expect(sum([1, 2, null, 3], (x) => x! * 2)).is.equal(12)
  })

  it('sum([null, null, null, null], x => x * 2) => 0', function () {
    expect(sum([null, null, null, null], (x) => x! * 2)).is.equal(0)
  })

  it('sum([{value : 1}, {value : 2}, {value : 3}], x => x.value * 3) => 18', function () {
    expect(sum([{ value: 1 }, { value: 2 }, { value: 3 }], (x) => x.value * 3)).is.equal(18)
  })

  it('sum([{value : 1}, {value : 2}, {value : 3}]) => throw', function () {
    expect(() => sum([{ value: 1 }, { value: 2 }, { value: 3 }])).to.throw('数值类型以外的数组必须传入 selector')
  })

  it('sum(new List([1, 2, null, 3]), x => x * 2) => 12', function () {
    expect(sum(new List([1, 2, null, 3]), (x) => x! * 2)).is.equal(12)
  })

  it('sum(new List([{value : 1}, {value : 2}, {value : 3}]), x => x.value * 3) => 18', function () {
    expect(sum(new List([{ value: 1 }, { value: 2 }, { value: 3 }]), (x) => x.value * 3)).is.equal(18)
  })
})

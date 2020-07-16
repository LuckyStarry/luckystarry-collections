/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { min } from '../../src/enumerables/min'

describe('./enumerables/min.ts', function () {
  it('存在 min 方法', function () {
    expect(min).not.null
    expect(min).not.undefined
    expect(typeof min).to.equal('function')
  })

  it('min(null) => throw', function () {
    expect(() => {
      min(null)
    }).to.throw(`参数 source 不可为空`)
  })

  it('min(undefined) => throw', function () {
    expect(() => {
      min(undefined)
    }).to.throw(`参数 source 不可为空`)
  })

  it('min([]) => null', function () {
    expect(min([])).is.null
  })

  it('min([1]) => 1', function () {
    expect(min([1])).is.equal(1)
  })

  it('min([1, 2]) => 1', function () {
    expect(min([1, 2])).is.equal(1)
  })

  it('min([1, 2, 3]) => 1', function () {
    expect(min([1, 2, 3])).is.equal(1)
  })

  it('min([1, 2, null, 3]) => 1', function () {
    expect(min([1, 2, null, 3])).is.equal(1)
  })

  it('min([null, null, null, null]) => null', function () {
    expect(min([null, null, null, null])).is.null
  })

  it('min([], x => x * 2) => null', function () {
    expect(min([], (x) => x * 2)).is.null
  })

  it('min([1], x => x * 2) => 2', function () {
    expect(min([1], (x) => x * 2)).is.equal(2)
  })

  it('min([1, 2], x => x * 2) => 2', function () {
    expect(min([1, 2], (x) => x * 2)).is.equal(2)
  })

  it('min([1, 2, 3], x => x * 2) => 2', function () {
    expect(min([1, 2, 3], (x) => x * 2)).is.equal(2)
  })

  it('min([1, 2, null, 3], x => x * 2) => 0', function () {
    expect(min([1, 2, null, 3], (x) => x * 2)).is.equal(0)
  })

  it('min([null, null, null, null], x => x * 2) => 0', function () {
    expect(min([null, null, null, null], (x) => x * 2)).is.equal(0)
  })

  it('min([{value : 1}, {value : 2}, {value : 3}], x => x.value * 3) => 3', function () {
    expect(min([{ value: 1 }, { value: 2 }, { value: 3 }], (x) => x.value * 3)).is.equal(3)
  })

  it('min([{value : 1}, {value : 2}, {value : 3}]) => throw', function () {
    expect(() => min([{ value: 1 }, { value: 2 }, { value: 3 }])).to.throw('数值类型以外的数组必须传入 selector')
  })

  it('min(new List([1, 2, null, 3]), x => x * 2) => 0', function () {
    expect(min(new List([1, 2, null, 3]), (x) => x * 2)).is.equal(0)
  })

  it('min(new List([{value : 1}, {value : 2}, {value : 3}]), x => x.value * 3) => 3', function () {
    expect(min(new List([{ value: 1 }, { value: 2 }, { value: 3 }]), (x) => x.value * 3)).is.equal(3)
  })
})

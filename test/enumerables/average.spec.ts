/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { average } from '../../src/enumerables/average'

describe('./enumerables/average.ts', function () {
  it('存在 average 方法', function () {
    expect(average).not.null
    expect(average).not.undefined
    expect(typeof average).to.equal('function')
  })

  it('average(null) => throw', function () {
    expect(() => {
      average(null as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('average(undefined) => throw', function () {
    expect(() => {
      average(undefined as any)
    }).to.throw(`参数 source 不可为空`)
  })

  it('average([]) => null', function () {
    expect(average([])).is.null
  })

  it('average([1]) => 1', function () {
    expect(average([1])).is.equal(1)
  })

  it('average([1, 2]) => 1.5', function () {
    expect(average([1, 2])).is.equal(1.5)
  })

  it('average([1, 2, 3]) => 2', function () {
    expect(average([1, 2, 3])).is.equal(2)
  })

  it('average([1, 2, null, 3]) => 1.5', function () {
    expect(average([1, 2, null, 3])).is.equal(1.5)
  })

  it('average([null, null, null, null]) => null', function () {
    expect(average([null, null, null, null])).is.null
  })

  it('average([], x => x * 2) => null', function () {
    expect(average([], (x) => x * 2)).is.null
  })

  it('average([1], x => x * 2) => 2', function () {
    expect(average([1], (x) => x * 2)).is.equal(2)
  })

  it('average([1, 2], x => x * 2) => 3', function () {
    expect(average([1, 2], (x) => x * 2)).is.equal(3)
  })

  it('average([1, 2, 3], x => x * 2) => 4', function () {
    expect(average([1, 2, 3], (x) => x * 2)).is.equal(4)
  })

  it('average([1, 2, null, 3], x => x * 2) => 3', function () {
    expect(average([1, 2, null, 3], (x) => x! * 2)).is.equal(3)
  })

  it('average([null, null, null, null], x => x * 2) => 0', function () {
    expect(average([null, null, null, null], (x) => x! * 2)).is.equal(0)
  })

  it('average([{value : 1}, {value : 2}, {value : 3}], x => x.value * 3) => 6', function () {
    expect(average([{ value: 1 }, { value: 2 }, { value: 3 }], (x) => x.value * 3)).is.equal(6)
  })

  it('average([{value : 1}, {value : 2}, {value : 3}]) => throw', function () {
    expect(() => average([{ value: 1 }, { value: 2 }, { value: 3 }])).to.throw('数值类型以外的数组必须传入 selector')
  })

  it('average(new List([1, 2, null, 3]), x => x * 2) => 3', function () {
    expect(average(new List([1, 2, null, 3]), (x) => x! * 2)).is.equal(3)
  })

  it('average(new List([{value : 1}, {value : 2}, {value : 3}]), x => x.value * 3) => 6', function () {
    expect(average(new List([{ value: 1 }, { value: 2 }, { value: 3 }]), (x) => x.value * 3)).is.equal(6)
  })
})

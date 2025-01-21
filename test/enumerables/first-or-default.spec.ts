/* tslint:disable */
import { expect } from 'chai'
import { firstOrDefault } from '../../src/enumerables/first-or-default'
import { List } from '../../src/list'

describe('./enumerables/first-or-default.ts', function () {
  it('存在 firstOrDefault 方法', function () {
    expect(firstOrDefault).not.null
    expect(firstOrDefault).not.undefined
    expect(typeof firstOrDefault).to.equal('function')
  })

  it('firstOrDefault(null, 1) => throw', function () {
    expect(() => {
      firstOrDefault(null as any, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('firstOrDefault(undefined, 1) => throw', function () {
    expect(() => {
      firstOrDefault(undefined as any, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('firstOrDefault([], 1) => 1', function () {
    let value = firstOrDefault([], 1)
    expect(value).is.equal(1)
  })

  it('firstOrDefault([], 2) => 2', function () {
    let value = firstOrDefault([], 2)
    expect(value).is.equal(2)
  })

  it('firstOrDefault([1], 2) => 1', function () {
    let value = firstOrDefault([1], 2)
    expect(value).is.equal(1)
  })

  it('firstOrDefault([1], 10) => 1', function () {
    let value = firstOrDefault([1], 10)
    expect(value).is.equal(1)
  })

  it('firstOrDefault([1, 2, 3], 10) => 1', function () {
    let value = firstOrDefault([1, 2, 3], 10)
    expect(value).is.equal(1)
  })

  it('firstOrDefault([1, 2, 3], null) => 1', function () {
    let value = firstOrDefault([1, 2, 3], null)
    expect(value).is.equal(1)
  })

  it('firstOrDefault(new List([1]), 10) => 1', function () {
    let value = firstOrDefault(new List([1]), 10)
    expect(value).is.equal(1)
  })

  it('firstOrDefault([1, 2, 3], null, x => x > 2) => 3', function () {
    let value = firstOrDefault([1, 2, 3], null, (x) => x! > 2)
    expect(value).is.equal(3)
  })

  it('firstOrDefault([1, 2, 3], null, x => x > 3) => 3', function () {
    let value = firstOrDefault([1, 2, 3], null, (x) => x! > 3)
    expect(value).is.null
  })

  it('firstOrDefault([1, 2, 3], null, x => x > 1) => 2', function () {
    let value = firstOrDefault([1, 2, 3], null, (x) => x! > 1)
    expect(value).is.equal(2)
  })
})

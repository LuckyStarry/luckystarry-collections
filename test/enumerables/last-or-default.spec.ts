/* tslint:disable */
import { expect } from 'chai'
import { lastOrDefault } from '../../src/enumerables/last-or-default'
import { List } from '../../src/list'

describe('./enumerables/last-or-default.ts', function() {
  it('存在 lastOrDefault 方法', function() {
    expect(lastOrDefault).not.null
    expect(lastOrDefault).not.undefined
    expect(typeof lastOrDefault).to.equal('function')
  })

  it('lastOrDefault(null, 1) => throw', function() {
    expect(() => {
      lastOrDefault(null, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('lastOrDefault(undefined, 1) => throw', function() {
    expect(() => {
      lastOrDefault(undefined, 1)
    }).to.throw(`参数 source 不可为空`)
  })

  it('lastOrDefault([], 1) => 1', function() {
    let value = lastOrDefault([], 1)
    expect(value).is.equal(1)
  })

  it('lastOrDefault([], 2) => 2', function() {
    let value = lastOrDefault([], 2)
    expect(value).is.equal(2)
  })

  it('lastOrDefault([1], 2) => 1', function() {
    let value = lastOrDefault([1], 2)
    expect(value).is.equal(1)
  })

  it('lastOrDefault([1], 10) => 1', function() {
    let value = lastOrDefault([1], 10)
    expect(value).is.equal(1)
  })

  it('lastOrDefault([1, 2, 3], 10) => 3', function() {
    let value = lastOrDefault([1, 2, 3], 10)
    expect(value).is.equal(3)
  })

  it('lastOrDefault([1, 2, 3], null) => 3', function() {
    let value = lastOrDefault([1, 2, 3], null)
    expect(value).is.equal(3)
  })

  it('lastOrDefault(new List([1]), 10) => 1', function() {
    let value = lastOrDefault(new List([1]), 10)
    expect(value).is.equal(1)
  })

  it('lastOrDefault([1, 2, 3], null, x => x > 2) => 3', function() {
    let value = lastOrDefault([1, 2, 3], null, x => x > 2)
    expect(value).is.equal(3)
  })

  it('lastOrDefault([1, 2, 3], null, x => x > 3) => 3', function() {
    let value = lastOrDefault([1, 2, 3], null, x => x > 3)
    expect(value).is.null
  })

  it('lastOrDefault([1, 2, 3], null, x => x > 1) => 3', function() {
    let value = lastOrDefault([1, 2, 3], null, x => x > 1)
    expect(value).is.equal(3)
  })
})

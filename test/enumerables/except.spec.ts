/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { except } from '../../src/enumerables/except'

describe('./enumerables/except.ts', function () {
  it('存在 except 方法', function () {
    expect(except).not.null
    expect(except).not.undefined
    expect(typeof except).to.equal('function')
  })

  it('except(null, []) => throw', function () {
    expect(() => {
      except(null as any, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('except(undefined, []) => throw', function () {
    expect(() => {
      except(undefined as any, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('except([], []) => throw', function () {
    expect(() => {
      except([], null as any)
    }).to.throw(`参数 second 不可为空`)
  })

  it('except([], undefined) => throw', function () {
    expect(() => {
      except([], undefined as any)
    }).to.throw(`参数 second 不可为空`)
  })

  it('except([], []) => Empty', function () {
    expect(except([], []).Any()).is.false
  })

  it('except([1], [2]) => [1]', function () {
    let excepted = except([1], [2])
    expect(excepted.Any()).is.true
    expect(excepted.Count()).is.equal(1)
    expect(excepted.ElementAt(0)).is.equal(1)
  })

  it('except([2], [1]) => [2]', function () {
    let excepted = except([2], [1])
    expect(excepted.Any()).is.true
    expect(excepted.Count()).is.equal(1)
    expect(excepted.ElementAt(0)).is.equal(2)
  })

  it('except([1, 2, 3, 4], [4, 5, 6, 6]) => [1, 2, 3]', function () {
    let excepted = except([1, 2, 3, 4], [4, 5, 6, 7])
    expect(excepted.Any()).is.true
    expect(excepted.Count()).is.equal(3)
    expect(excepted.ElementAt(0)).is.equal(1)
    expect(excepted.ElementAt(1)).is.equal(2)
    expect(excepted.ElementAt(2)).is.equal(3)
  })

  it('except([1, 2, 3, 4], new List([4, 5, 6, 7])) => [1, 2, 3]', function () {
    let excepted = except([1, 2, 3, 4], new List([4, 5, 6, 7]))
    expect(excepted.Any()).is.true
    expect(excepted.Count()).is.equal(3)
    expect(excepted.ElementAt(0)).is.equal(1)
    expect(excepted.ElementAt(1)).is.equal(2)
    expect(excepted.ElementAt(2)).is.equal(3)
  })
})

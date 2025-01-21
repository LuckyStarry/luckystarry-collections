/* tslint:disable */
import { expect } from 'chai'
import { select } from '../../src/enumerables/select'

describe('./enumerables/select.ts', function () {
  it('存在 select 方法', function () {
    expect(select).not.null
    expect(select).not.undefined
    expect(typeof select).to.equal('function')
  })

  it('select(null, x => x) => throw', function () {
    expect(() => {
      select(null as any, (x) => x)
    }).to.throw(`参数 source 不可为空`)
  })

  it('select(undefined, x => x) => throw', function () {
    expect(() => {
      select(undefined as any, (x) => x)
    }).to.throw(`参数 source 不可为空`)
  })

  it('select([], null) => throw', function () {
    expect(() => {
      select([], null as any)
    }).to.throw(`参数 selector 不可为空`)
  })

  it('select([], undefined) => throw', function () {
    expect(() => {
      select([], undefined as any)
    }).to.throw(`参数 selector 不可为空`)
  })

  it('select([], x => x) => []', function () {
    let results = select([], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Any()).is.false
  })

  it('select([1], x => x) => [1]', function () {
    let results = select([1], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(1)
    expect(results.ElementAt(0)).is.equal(1)
  })

  it('select([1, 2], x => x) => [1, 2]', function () {
    let results = select([1, 2], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(2)
    expect(results.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(1)).is.equal(2)
  })

  it('select([1, 2, 2, 3], x => x) => [1, 2, 2, 3]', function () {
    let results = select([1, 2, 2, 3], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(4)
    expect(results.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(1)).is.equal(2)
    expect(results.ElementAt(2)).is.equal(2)
    expect(results.ElementAt(3)).is.equal(3)
  })

  it('select([1, 2, 2, 3], x => x * 2) => [2, 4, 4, 6]', function () {
    let results = select([1, 2, 2, 3], (x) => x * 2)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(4)
    expect(results.ElementAt(0)).is.equal(2)
    expect(results.ElementAt(1)).is.equal(4)
    expect(results.ElementAt(2)).is.equal(4)
    expect(results.ElementAt(3)).is.equal(6)
  })

  it('select([{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}], x => x.value) => [2, 3, 2, 1]', function () {
    let list = [new Spec('1', 2), new Spec('2', 3), new Spec('3', 2), new Spec('2', 1)]
    let results = select(list, (x) => x.Value)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(4)
    expect(results.ElementAt(0)).is.equal(2)
    expect(results.ElementAt(1)).is.equal(3)
    expect(results.ElementAt(2)).is.equal(2)
    expect(results.ElementAt(3)).is.equal(1)
  })
})

class Spec {
  constructor(public Text: string, public Value: number) {}
}

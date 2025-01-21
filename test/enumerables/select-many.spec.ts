/* tslint:disable */
import { expect } from 'chai'
import { IEnumerable, List } from '../../src'
import { selectMany } from '../../src/enumerables/select-many'

describe('./enumerables/select-many.ts', function () {
  it('存在 selectMany 方法', function () {
    expect(selectMany).not.null
    expect(selectMany).not.undefined
    expect(typeof selectMany).to.equal('function')
  })

  it('selectMany(null, x => x) => throw', function () {
    expect(() => {
      selectMany(null as any, (x) => new List([x]))
    }).to.throw(`参数 source 不可为空`)
  })

  it('selectMany(undefined, x => x) => throw', function () {
    expect(() => {
      selectMany(undefined as any, (x) => new List([x]))
    }).to.throw(`参数 source 不可为空`)
  })

  it('selectMany([], null) => throw', function () {
    expect(() => {
      selectMany([], null as any)
    }).to.throw(`参数 collectionSelector 不可为空`)
  })

  it('selectMany([], undefined) => throw', function () {
    expect(() => {
      selectMany([], undefined as any)
    }).to.throw(`参数 collectionSelector 不可为空`)
  })

  it('selectMany([], x => x) => []', function () {
    let results = selectMany([], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Any()).is.false
  })

  it('selectMany([new List([1])], x => x) => [1]', function () {
    let results = selectMany([new List([1])], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(1)
    expect(results.ElementAt(0)).is.equal(1)
  })

  it('selectMany([new List([1]), new List([2])], x => x) => [1, 2]', function () {
    let results = selectMany([new List([1]), new List([2])], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(2)
    expect(results.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(1)).is.equal(2)
  })

  it('selectMany([new List([1, 3]), new List([2, 4])], x => x) => [1, 3, 2, 4]', function () {
    let results = selectMany([new List([1, 3]), new List([2, 4])], (x) => x)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(4)
    expect(results.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(1)).is.equal(3)
    expect(results.ElementAt(2)).is.equal(2)
    expect(results.ElementAt(3)).is.equal(4)
  })

  it('selectMany([{text:1, value:[1, 2]},{text:2, value:[2, 3]]},{text:3, value:[3, 2]]},{text:2, value:[2, 1]]}], x => x.Value, (x, c) => c) => [1, 2, 2, 3, 3, 2, 2, 1]', function () {
    let list = [new Spec('1', new List([1, 2])), new Spec('2', new List([2, 3])), new Spec('3', new List([3, 2])), new Spec('2', new List([2, 1]))]
    let results = selectMany(
      list,
      (x) => x.Value,
      (x, c) => c
    )
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(8)
    expect(results.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(1)).is.equal(2)
    expect(results.ElementAt(2)).is.equal(2)
    expect(results.ElementAt(3)).is.equal(3)
    expect(results.ElementAt(4)).is.equal(3)
    expect(results.ElementAt(5)).is.equal(2)
    expect(results.ElementAt(6)).is.equal(2)
    expect(results.ElementAt(7)).is.equal(1)
  })

  it('selectMany([{text:1, value:[1, 2]},{text:2, value:[2, 3]]},{text:3, value:[3, 2]]},{text:2, value:[2, 1]]}], x => x.Value, (x, c) => c * 2) => [2, 4, 4, 6, 6, 4, 4, 2]', function () {
    let list = [new Spec('1', new List([1, 2])), new Spec('2', new List([2, 3])), new Spec('3', new List([3, 2])), new Spec('2', new List([2, 1]))]
    let results = selectMany<Spec, number>(
      list,
      (x) => x.Value,
      (x, c) => c * 2
    )
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(8)
    expect(results.ElementAt(0)).is.equal(2)
    expect(results.ElementAt(1)).is.equal(4)
    expect(results.ElementAt(2)).is.equal(4)
    expect(results.ElementAt(3)).is.equal(6)
    expect(results.ElementAt(4)).is.equal(6)
    expect(results.ElementAt(5)).is.equal(4)
    expect(results.ElementAt(6)).is.equal(4)
    expect(results.ElementAt(7)).is.equal(2)
  })

  it('selectMany([{text:1, value:[1, 2]},{text:2, value:[]]},{text:3, value:[]]},{text:2, value:[2, 1]]}], x => x.Value, (x, c) => c * 3) => [3, 6， 6, 3]', function () {
    let list = [new Spec('1', new List([1, 2])), new Spec('2', null as any), new Spec('3', new List()), new Spec('2', new List([2, 1]))]
    let results = selectMany<Spec, number>(
      list,
      (x) => x.Value,
      (x, c) => c * 3
    )
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(4)
    expect(results.ElementAt(0)).is.equal(3)
    expect(results.ElementAt(1)).is.equal(6)
    expect(results.ElementAt(2)).is.equal(6)
    expect(results.ElementAt(3)).is.equal(3)
  })
})

class Spec {
  constructor(public Text: string, public Value: IEnumerable<number>) {}
}

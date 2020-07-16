/* tslint:disable */
import { expect } from 'chai'
import { List } from '../../src'
import { union } from '../../src/enumerables/union'
import { EqualityComparer } from '../../src/equality-comparer'

describe('./enumerables/union.ts', function () {
  it('存在 union 方法', function () {
    expect(union).not.null
    expect(union).not.undefined
    expect(typeof union).to.equal('function')
  })

  it('union(null, []) => throw', function () {
    expect(() => {
      union(null, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('union(undefined, []) => throw', function () {
    expect(() => {
      union(undefined, [])
    }).to.throw(`参数 first 不可为空`)
  })

  it('union([], []) => throw', function () {
    expect(() => {
      union([], null)
    }).to.throw(`参数 second 不可为空`)
  })

  it('union([], undefined) => throw', function () {
    expect(() => {
      union([], undefined)
    }).to.throw(`参数 second 不可为空`)
  })

  it('union([], []) => Empty', function () {
    expect(union([], []).Any()).is.false
  })

  it('union([1], [2]) => [1, 2]', function () {
    let unioned = union([1], [2])
    expect(unioned.Any()).is.true
    expect(unioned.Count()).is.equal(2)

    let list = unioned.ToList()
    expect(list.Count()).is.equal(2)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
  })

  it('union([2], [1]) => [2, 1]', function () {
    let unioned = union([2], [1])
    expect(unioned.Any()).is.true
    expect(unioned.Count()).is.equal(2)

    let list = unioned.ToList()
    expect(list.Count()).is.equal(2)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(1)
  })

  it('union([1, 2, 3, 4], [4, 5, 6, 6]) => [1, 2, 3, 4, 5, 6, 7]', function () {
    let unioned = union([1, 2, 3, 4], [4, 5, 6, 7])
    expect(unioned.Any()).is.true
    expect(unioned.Count()).is.equal(7)
    expect(unioned.ElementAt(0)).is.equal(1)
    expect(unioned.ElementAt(1)).is.equal(2)
    expect(unioned.ElementAt(2)).is.equal(3)
    expect(unioned.ElementAt(3)).is.equal(4)
    expect(unioned.ElementAt(4)).is.equal(5)
    expect(unioned.ElementAt(5)).is.equal(6)
    expect(unioned.ElementAt(6)).is.equal(7)
  })

  it('union([1, 2, 3, 4], new List([4, 5, 6, 7])) => [1, 2, 3, 4, 4, 5, 6, 7]', function () {
    let unioned = union([1, 2, 3, 4], new List([4, 5, 6, 7]))
    expect(unioned.Any()).is.true
    expect(unioned.Count()).is.equal(7)
    expect(unioned.ElementAt(0)).is.equal(1)
    expect(unioned.ElementAt(1)).is.equal(2)
    expect(unioned.ElementAt(2)).is.equal(3)
    expect(unioned.ElementAt(3)).is.equal(4)
    expect(unioned.ElementAt(4)).is.equal(5)
    expect(unioned.ElementAt(5)).is.equal(6)
    expect(unioned.ElementAt(6)).is.equal(7)
  })

  it('union([{text:1, value:2},{text:2, value:3}],[{text:1, value:2},{text:3, value:2}], (x, y) => x.text === y.text && x.value === y.value) => [{{text:1, value:2}, {text:1, value:2}}]', function () {
    let left = [new Spec('1', '2'), new Spec('2', '3')]
    let right = [new Spec('1', '2'), new Spec('3', '2')]
    let unioned = union(left, right, new EqualityImpl())
    expect(unioned.Count()).is.equal(3)
    expect(unioned.ElementAt(0).Text).is.equal('1')
    expect(unioned.ElementAt(0).Value).is.equal('2')
    expect(unioned.ElementAt(1).Text).is.equal('2')
    expect(unioned.ElementAt(1).Value).is.equal('3')
    expect(unioned.ElementAt(2).Text).is.equal('3')
    expect(unioned.ElementAt(2).Value).is.equal('2')
  })

  it('union([{text:1, value:2},{text:2, value:3}],[{text:1, value:2},{text:3, value:2}], (x, y) => x.text === y.text|value && x.value === y.text|value) => [{{text:1, value:2}, {text:1, value:2}}, {{text:2, value:3}, {text:3, value:2}}]', function () {
    let left = [new Spec('1', '2'), new Spec('2', '3')]
    let right = [new Spec('1', '2'), new Spec('3', '2')]
    let unioned = union(left, right, new EqualityImplPlus())
    expect(unioned.Count()).is.equal(2)
    expect(unioned.ElementAt(0).Text).is.equal('1')
    expect(unioned.ElementAt(0).Value).is.equal('2')
    expect(unioned.ElementAt(1).Text).is.equal('2')
    expect(unioned.ElementAt(1).Value).is.equal('3')
  })
})

class Spec {
  constructor(public Text: string, public Value: string) {}
}

class EqualityImpl extends EqualityComparer<Spec> {
  public Equals(x: Spec, y: Spec): boolean {
    return x.Text === y.Text && x.Value === y.Value
  }
}

class EqualityImplPlus extends EqualityComparer<Spec> {
  public Equals(x: Spec, y: Spec): boolean {
    return (x.Text === y.Text || x.Text === y.Value) && (x.Value === y.Value || x.Value === y.Text)
  }
}

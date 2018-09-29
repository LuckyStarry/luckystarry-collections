/* tslint:disable */
import { expect } from 'chai'
import { distinct } from '../../src/enumerables/distinct'
import { EqualityComparer } from '../../src/equality-comparer'
import { List } from '../../src'

describe('./enumerables/distinct.ts', function() {
  it('存在 distinct 方法', function() {
    expect(distinct).not.null
    expect(distinct).not.undefined
    expect(typeof distinct).to.equal('function')
  })

  it('distinct(null) => throw', function() {
    expect(() => {
      distinct(null)
    }).to.throw(`参数 source 不可为空`)
  })

  it('distinct(undefined) => throw', function() {
    expect(() => {
      distinct(undefined)
    }).to.throw(`参数 source 不可为空`)
  })

  it('distinct([]) => Empty', function() {
    expect(distinct([]).Any()).is.false
  })

  it('distinct([1, 2]) => [1, 2]', function() {
    let distincted = distinct([1, 2])
    expect(distincted.Any()).is.true
    expect(distincted.Count()).is.equal(2)

    let list = distincted.ToList()
    expect(list.Count()).is.equal(2)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
  })

  it('distinct([2, 1]) => [2, 1]', function() {
    let distincted = distinct([2, 1])
    expect(distincted.Any()).is.true
    expect(distincted.Count()).is.equal(2)

    let list = distincted.ToList()
    expect(list.Count()).is.equal(2)
    expect(list.Get(0)).is.equal(2)
    expect(list.Get(1)).is.equal(1)
  })

  it('distinct([1, 2, 3, 4, 4, 5, 6, 7]) => [1, 2, 3, 4, 5, 6, 7]', function() {
    let distincted = distinct([1, 2, 3, 4, 4, 5, 6, 7])
    expect(distincted.Any()).is.true
    expect(distincted.Count()).is.equal(7)

    let list = distincted.ToList()
    expect(list.Count()).is.equal(7)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(5)
    expect(list.Get(5)).is.equal(6)
    expect(list.Get(6)).is.equal(7)
  })

  it('distinct(new List([1, 2, 3, 4, 4, 5, 6, 7])) => [1, 2, 3, 4, 5, 6, 7]', function() {
    let distincted = distinct(new List([1, 2, 3, 4, 4, 5, 6, 7]))
    expect(distincted.Any()).is.true
    expect(distincted.Count()).is.equal(7)

    let list = distincted.ToList()
    expect(list.Count()).is.equal(7)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(5)
    expect(list.Get(5)).is.equal(6)
    expect(list.Get(6)).is.equal(7)
  })

  it('distinct([{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}], (x, y) => x.text === y.text && x.value === y.value) => [{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}]', function() {
    let list = [
      new Spec('1', '2'),
      new Spec('2', '3'),
      new Spec('3', '2'),
      new Spec('2', '1')
    ]
    let distincted = distinct(list, new EqualityImpl())
    expect(distincted.Count()).is.equal(4)
    expect(distincted.ElementAt(0).Text).is.equal('1')
    expect(distincted.ElementAt(0).Value).is.equal('2')
    expect(distincted.ElementAt(1).Text).is.equal('2')
    expect(distincted.ElementAt(1).Value).is.equal('3')
    expect(distincted.ElementAt(2).Text).is.equal('3')
    expect(distincted.ElementAt(2).Value).is.equal('2')
    expect(distincted.ElementAt(3).Text).is.equal('2')
    expect(distincted.ElementAt(3).Value).is.equal('1')
  })

  it('distinct([{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}], (x, y) => x.text === y.text|value && x.value === y.text|value) => [{text:1, value:2},{text:2, value:3}]', function() {
    let list = [
      new Spec('1', '2'),
      new Spec('2', '3'),
      new Spec('3', '2'),
      new Spec('2', '1')
    ]
    let distincted = distinct(list, new EqualityImplPlus())
    expect(distincted.Count()).is.equal(2)
    expect(distincted.ElementAt(0).Text).is.equal('1')
    expect(distincted.ElementAt(0).Value).is.equal('2')
    expect(distincted.ElementAt(1).Text).is.equal('2')
    expect(distincted.ElementAt(1).Value).is.equal('3')
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
    return (
      (x.Text === y.Text || x.Text === y.Value) &&
      (x.Value === y.Value || x.Value === y.Text)
    )
  }
}

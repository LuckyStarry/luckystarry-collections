/* tslint:disable */
import { expect } from 'chai'
import { groupBy } from '../../src/enumerables/group-by'
import { EqualityComparer } from '../../src/equality-comparer'

describe('./enumerables/group-by.ts', function () {
  it('存在 groupBy 方法', function () {
    expect(groupBy).not.null
    expect(groupBy).not.undefined
    expect(typeof groupBy).to.equal('function')
  })

  it('groupBy(null, k => k, e => e) => throw', function () {
    expect(() => {
      groupBy(
        null,
        (k) => k,
        (e) => e
      )
    }).to.throw(`参数 source 不可为空`)
  })

  it('groupBy(undefined, k => k, e => e) => throw', function () {
    expect(() => {
      groupBy(
        undefined,
        (k) => k,
        (e) => e
      )
    }).to.throw(`参数 source 不可为空`)
  })

  it('groupBy([], null, e => e) => throw', function () {
    expect(() => {
      groupBy([], null, (e) => e)
    }).to.throw(`参数 keySelector 不可为空`)
  })

  it('groupBy([], undefined, e => e) => throw', function () {
    expect(() => {
      groupBy([], undefined, (e) => e)
    }).to.throw(`参数 keySelector 不可为空`)
  })

  it('groupBy([], k => k) => throw', function () {
    let results = groupBy([], (k) => k)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(0)
  })

  it('groupBy([1], k => k) => [{Key:1, [1]}]', function () {
    let results = groupBy([1], (k) => k)
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(1)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Count()).is.equal(1)
  })

  it('groupBy([1, 2], k => k, e => e) => [{Key:1, [1]}, {Key:2, [2]}]', function () {
    let results = groupBy(
      [1, 2],
      (k) => k,
      (e) => e
    )
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(2)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Count()).is.equal(1)
    expect(results.ElementAt(1).Key).is.equal(2)
    expect(results.ElementAt(1).Count()).is.equal(1)
  })

  it('groupBy([1, 2, 3, 1], k => k, e => e) => [{Key:1, [1, 1]}, {Key:2, [2]}, {Key:3, [3]}]', function () {
    let results = groupBy(
      [1, 2, 3, 1],
      (k) => k,
      (e) => e
    )
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(3)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Items.Count()).is.equal(2)
    expect(results.ElementAt(0).Count()).is.equal(2)
    expect(results.ElementAt(0).ElementAt(0)).is.equal(1)
    expect(results.ElementAt(0).ElementAt(1)).is.equal(1)
    expect(results.ElementAt(1).Key).is.equal(2)
    expect(results.ElementAt(1).Count()).is.equal(1)
    expect(results.ElementAt(1).ElementAt(0)).is.equal(2)
    expect(results.ElementAt(2).Key).is.equal(3)
    expect(results.ElementAt(2).Count()).is.equal(1)
    expect(results.ElementAt(2).ElementAt(0)).is.equal(3)
  })

  it('groupBy([1, 2, 3, 1], k => k, e => e * 2) => [{Key:1, [2, 2]}, {Key:2, [4]}, {Key:3, [6]}]', function () {
    let results = groupBy(
      [1, 2, 3, 1],
      (k) => k,
      (e) => e * 2
    )
    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(3)
    expect(results.ElementAt(0).Key).is.equal(1)
    expect(results.ElementAt(0).Count()).is.equal(2)
    expect(results.ElementAt(0).ElementAt(0)).is.equal(2)
    expect(results.ElementAt(0).ElementAt(1)).is.equal(2)
    expect(results.ElementAt(1).Key).is.equal(2)
    expect(results.ElementAt(1).Count()).is.equal(1)
    expect(results.ElementAt(1).ElementAt(0)).is.equal(4)
    expect(results.ElementAt(2).Key).is.equal(3)
    expect(results.ElementAt(2).Count()).is.equal(1)
    expect(results.ElementAt(2).ElementAt(0)).is.equal(6)
  })

  it('groupBy([{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}], (x, y) => x.text === y.text && x.value === y.value) => [{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}]', function () {
    let list = [new Spec('1', '2'), new Spec('2', '3'), new Spec('3', '2'), new Spec('2', '1')]
    let groupByed = groupBy(
      list,
      (x) => x,
      (e) => e,
      new EqualityImpl()
    )
    expect(groupByed.Count()).is.equal(4)
    expect(groupByed.ElementAt(0).Key.Text).is.equal('1')
    expect(groupByed.ElementAt(0).Key.Value).is.equal('2')
    expect(groupByed.ElementAt(0).Count()).is.equal(1)
    expect(groupByed.ElementAt(0).ElementAt(0).Text).is.equal('1')
    expect(groupByed.ElementAt(0).ElementAt(0).Value).is.equal('2')
    expect(groupByed.ElementAt(1).Key.Text).is.equal('2')
    expect(groupByed.ElementAt(1).Key.Value).is.equal('3')
    expect(groupByed.ElementAt(1).Count()).is.equal(1)
    expect(groupByed.ElementAt(1).ElementAt(0).Text).is.equal('2')
    expect(groupByed.ElementAt(1).ElementAt(0).Value).is.equal('3')
    expect(groupByed.ElementAt(2).Key.Text).is.equal('3')
    expect(groupByed.ElementAt(2).Key.Value).is.equal('2')
    expect(groupByed.ElementAt(2).Count()).is.equal(1)
    expect(groupByed.ElementAt(2).ElementAt(0).Text).is.equal('3')
    expect(groupByed.ElementAt(2).ElementAt(0).Value).is.equal('2')
    expect(groupByed.ElementAt(3).Key.Text).is.equal('2')
    expect(groupByed.ElementAt(3).Key.Value).is.equal('1')
    expect(groupByed.ElementAt(3).Count()).is.equal(1)
    expect(groupByed.ElementAt(3).ElementAt(0).Text).is.equal('2')
    expect(groupByed.ElementAt(3).ElementAt(0).Value).is.equal('1')
  })

  it('groupBy([{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}], (x, y) => x.text === y.text|value && x.value === y.text|value) => [{text:1, value:2},{text:2, value:3}]', function () {
    let list = [new Spec('1', '2'), new Spec('2', '3'), new Spec('3', '2'), new Spec('2', '1')]
    let groupByed = groupBy(
      list,
      (x) => x,
      (e) => e,
      new EqualityImplPlus()
    )
    expect(groupByed.Count()).is.equal(2)
    expect(groupByed.ElementAt(0).Key.Text).is.equal('1')
    expect(groupByed.ElementAt(0).Key.Value).is.equal('2')
    expect(groupByed.ElementAt(0).Count()).is.equal(2)
    expect(groupByed.ElementAt(0).ElementAt(0).Text).is.equal('1')
    expect(groupByed.ElementAt(0).ElementAt(0).Value).is.equal('2')
    expect(groupByed.ElementAt(0).ElementAt(1).Text).is.equal('2')
    expect(groupByed.ElementAt(0).ElementAt(1).Value).is.equal('1')
    expect(groupByed.ElementAt(1).Key.Text).is.equal('2')
    expect(groupByed.ElementAt(1).Key.Value).is.equal('3')
    expect(groupByed.ElementAt(1).Count()).is.equal(2)
    expect(groupByed.ElementAt(1).ElementAt(0).Text).is.equal('2')
    expect(groupByed.ElementAt(1).ElementAt(0).Value).is.equal('3')
    expect(groupByed.ElementAt(1).ElementAt(1).Text).is.equal('3')
    expect(groupByed.ElementAt(1).ElementAt(1).Value).is.equal('2')
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

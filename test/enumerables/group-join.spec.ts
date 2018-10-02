/* tslint:disable */
import { expect } from 'chai'
import { groupJoin } from '../../src/enumerables/group-join'
import { EqualityComparer } from '../../src/equality-comparer'

describe('./enumerables/group-join.ts', function() {
  it('存在 groupJoin 方法', function() {
    expect(groupJoin).not.null
    expect(groupJoin).not.undefined
    expect(typeof groupJoin).to.equal('function')
  })

  it('groupJoin(null, [], o => o, i => i, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin(
        null,
        [],
        o => o,
        i => i,
        (o, is) => {
          return { o: o, is: is }
        }
      )
    }).to.throw(`参数 outer 不可为空`)
  })

  it('groupJoin(undefined, [], o => o, i => i, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin(
        undefined,
        [],
        o => o,
        i => i,
        (o, is) => {
          return { o: o, is: is }
        }
      )
    }).to.throw(`参数 outer 不可为空`)
  })

  it('groupJoin([], null, o => o, i => i, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin(
        [],
        null,
        o => o,
        i => i,
        (o, is) => {
          return { o: o, is: is }
        }
      )
    }).to.throw(`参数 inner 不可为空`)
  })

  it('groupJoin([], undefined, o => o, i => i, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin(
        [],
        undefined,
        o => o,
        i => i,
        (o, is) => {
          return { o: o, is: is }
        }
      )
    }).to.throw(`参数 inner 不可为空`)
  })

  it('groupJoin([], [], null, i => i, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin(
        [],
        [],
        null,
        i => i,
        (o, is) => {
          return { o: o, is: is }
        }
      )
    }).to.throw(`参数 outerKeySelector 不可为空`)
  })

  it('groupJoin([], [], undefined, i => i, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin(
        [],
        [],
        undefined,
        i => i,
        (o, is) => {
          return { o: o, is: is }
        }
      )
    }).to.throw(`参数 outerKeySelector 不可为空`)
  })

  it('groupJoin([], [], o => o, null, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin([], [], o => o, null, (o, is) => {
        return { o: o, is: is }
      })
    }).to.throw(`参数 innerKeySelector 不可为空`)
  })

  it('groupJoin([], [], o => o, undefined, (o, is) => { return { o: o, is: is } }) => throw', function() {
    expect(() => {
      groupJoin([], [], o => o, undefined, (o, is) => {
        return { o: o, is: is }
      })
    }).to.throw(`参数 innerKeySelector 不可为空`)
  })

  it('groupJoin([], [], o => o, i => i) => []', function() {
    let results = groupJoin([], [], o => o, i => i)

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Any()).is.false
  })

  it('groupJoin([], [1, 2, 3], o => o, i => i) => []', function() {
    let results = groupJoin([], [1, 2, 3], o => o, i => i)

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Any()).is.false
  })

  it('groupJoin([2], [1, 2, 3], o => o, i => i) => [{2, [2]}]', function() {
    let results = groupJoin([2], [1, 2, 3], o => o, i => i)

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(1)
    expect(results.ElementAt(0).Outer).is.equal(2)
    expect(results.ElementAt(0).Inners).is.not.null
    expect(results.ElementAt(0).Inners).is.not.undefined
    expect(results.ElementAt(0).Inners.Count()).is.equal(1)
    expect(results.ElementAt(0).Inners.ElementAt(0)).is.equal(2)
  })

  it('groupJoin([1, 1, 2], [1, 2, 3], o => o, i => i, (o, is) => { return { o: o, is: is } }) => [{1, [1, 1]}, {1, [1, 1]}, {2, [2]}]', function() {
    let results = groupJoin(
      [1, 1, 2],
      [1, 2, 3],
      o => o,
      i => i,
      (o, is) => {
        return { o: o, is: is }
      }
    )

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(3)
    expect(results.ElementAt(0).o).is.equal(1)
    expect(results.ElementAt(0).is).is.not.null
    expect(results.ElementAt(0).is).is.not.undefined
    expect(results.ElementAt(0).is.Count()).is.equal(1)
    expect(results.ElementAt(0).is.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(1).o).is.equal(1)
    expect(results.ElementAt(1).is).is.not.null
    expect(results.ElementAt(1).is).is.not.undefined
    expect(results.ElementAt(1).is.Count()).is.equal(1)
    expect(results.ElementAt(1).is.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(2).o).is.equal(2)
    expect(results.ElementAt(2).is).is.not.null
    expect(results.ElementAt(2).is).is.not.undefined
    expect(results.ElementAt(2).is.Count()).is.equal(1)
    expect(results.ElementAt(2).is.ElementAt(0)).is.equal(2)
  })

  it('groupJoin([1, 1, 2, 5], [1, 2, 3, 2, 2, 4], o => o, i => i, (o, is) => { return { o: o, is: is } }) => [{1, [1, 1]}, {1, [1, 1]}, {2, [2, 2, 2]}, {5, []}]', function() {
    let results = groupJoin(
      [1, 1, 2, 5],
      [1, 2, 3, 2, 2, 4],
      o => o,
      i => i,
      (o, is) => {
        return { o: o, is: is }
      }
    )

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(4)
    expect(results.ElementAt(0).o).is.equal(1)
    expect(results.ElementAt(0).is).is.not.null
    expect(results.ElementAt(0).is).is.not.undefined
    expect(results.ElementAt(0).is.Count()).is.equal(1)
    expect(results.ElementAt(0).is.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(1).o).is.equal(1)
    expect(results.ElementAt(1).is).is.not.null
    expect(results.ElementAt(1).is).is.not.undefined
    expect(results.ElementAt(1).is.Count()).is.equal(1)
    expect(results.ElementAt(1).is.ElementAt(0)).is.equal(1)
    expect(results.ElementAt(2).o).is.equal(2)
    expect(results.ElementAt(2).is).is.not.null
    expect(results.ElementAt(2).is).is.not.undefined
    expect(results.ElementAt(2).is.Count()).is.equal(3)
    expect(results.ElementAt(2).is.ElementAt(0)).is.equal(2)
    expect(results.ElementAt(2).is.ElementAt(1)).is.equal(2)
    expect(results.ElementAt(2).is.ElementAt(2)).is.equal(2)
    expect(results.ElementAt(3).o).is.equal(5)
    expect(results.ElementAt(3).is).is.not.null
    expect(results.ElementAt(3).is).is.not.undefined
    expect(results.ElementAt(3).is.Any()).is.false
  })

  it('groupJoin([{text:1, value:2},{text:2, value:3}],[{text:1, value:2},{text:3, value:2}], (x, y) => x.text === y.text && x.value === y.value) => [{text:1, value:2, [{{text:1, value:2}]},{text:2, value:3,[]}]', function() {
    let left = [new Spec('1', '2'), new Spec('2', '3')]
    let right = [new Spec('1', '2'), new Spec('3', '2')]
    let groupJoined = groupJoin(
      left,
      right,
      o => o,
      i => i,
      (o, is) => {
        return { o: o, is: is }
      },
      new EqualityImpl()
    )
    expect(groupJoined.Count()).is.equal(2)
    expect(groupJoined.ElementAt(0).o.Text).is.equal('1')
    expect(groupJoined.ElementAt(0).o.Value).is.equal('2')
    expect(groupJoined.ElementAt(0).is.Count()).is.equal(1)
    expect(groupJoined.ElementAt(0).is.ElementAt(0).Text).is.equal('1')
    expect(groupJoined.ElementAt(0).is.ElementAt(0).Value).is.equal('2')
    expect(groupJoined.ElementAt(1).o.Text).is.equal('2')
    expect(groupJoined.ElementAt(1).o.Value).is.equal('3')
    expect(groupJoined.ElementAt(1).is).is.not.null
    expect(groupJoined.ElementAt(1).is).is.not.undefined
    expect(groupJoined.ElementAt(1).is.Any()).is.false
  })

  it('groupJoin([{text:1, value:2},{text:2, value:3}],[{text:1, value:2},{text:3, value:2}], (x, y) => x.text === y.text|value && x.value === y.text|value) => [{text:1, value:2, [{{text:1, value:2}]},{text:2, value:3,[{text:3, value:2}]}]', function() {
    let left = [new Spec('1', '2'), new Spec('2', '3')]
    let right = [new Spec('1', '2'), new Spec('3', '2')]
    let groupJoined = groupJoin(
      left,
      right,
      o => o,
      i => i,
      (o, is) => {
        return { o: o, is: is }
      },
      new EqualityImplPlus()
    )
    expect(groupJoined.Count()).is.equal(2)
    expect(groupJoined.ElementAt(0).o.Text).is.equal('1')
    expect(groupJoined.ElementAt(0).o.Value).is.equal('2')
    expect(groupJoined.ElementAt(0).is.Count()).is.equal(1)
    expect(groupJoined.ElementAt(0).is.ElementAt(0).Text).is.equal('1')
    expect(groupJoined.ElementAt(0).is.ElementAt(0).Value).is.equal('2')
    expect(groupJoined.ElementAt(1).o.Text).is.equal('2')
    expect(groupJoined.ElementAt(1).o.Value).is.equal('3')
    expect(groupJoined.ElementAt(1).is.Count()).is.equal(1)
    expect(groupJoined.ElementAt(1).is.ElementAt(0).Text).is.equal('3')
    expect(groupJoined.ElementAt(1).is.ElementAt(0).Value).is.equal('2')
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

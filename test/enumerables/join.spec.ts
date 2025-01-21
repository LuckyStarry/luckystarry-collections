/* tslint:disable */
import { expect } from 'chai'
import { join } from '../../src/enumerables/join'
import { EqualityComparer } from '../../src/equality-comparer'

describe('./enumerables/join.ts', function () {
  it('存在 join 方法', function () {
    expect(join).not.null
    expect(join).not.undefined
    expect(typeof join).to.equal('function')
  })

  it('join(null, [], o => o, i => i, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        null as any,
        [],
        (o) => o,
        (i) => i,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 outer 不可为空`)
  })

  it('join(undefined, [], o => o, i => i, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        undefined as any,
        [],
        (o) => o,
        (i) => i,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 outer 不可为空`)
  })

  it('join([], null, o => o, i => i, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        [],
        null as any,
        (o) => o,
        (i) => i,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 inner 不可为空`)
  })

  it('join([], undefined, o => o, i => i, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        [],
        undefined as any,
        (o) => o,
        (i) => i,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 inner 不可为空`)
  })

  it('join([], [], null, i => i, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        [],
        [],
        null as any,
        (i) => i,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 outerKeySelector 不可为空`)
  })

  it('join([], [], undefined, i => i, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        [],
        [],
        undefined as any,
        (i) => i,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 outerKeySelector 不可为空`)
  })

  it('join([], [], o => o, null, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        [],
        [],
        (o) => o,
        null as any,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 innerKeySelector 不可为空`)
  })

  it('join([], [], o => o, undefined, (o, i) => { return { o: o, i: i } }) => throw', function () {
    expect(() => {
      join(
        [],
        [],
        (o) => o,
        undefined as any,
        (o, i) => {
          return { o: o, i: i }
        }
      )
    }).to.throw(`参数 innerKeySelector 不可为空`)
  })

  it('join([], [], o => o, i => i) => []', function () {
    let results = join(
      [],
      [],
      (o) => o,
      (i) => i
    )

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Any()).is.false
  })

  it('join([], [1, 2, 3], o => o, i => i) => []', function () {
    let results = join(
      [],
      [1, 2, 3],
      (o) => o,
      (i) => i
    )

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Any()).is.false
  })

  it('join([2], [1, 2, 3], o => o, i => i) => [{2, 2}]', function () {
    let results = join(
      [2],
      [1, 2, 3],
      (o) => o,
      (i) => i
    )

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(1)
    expect(results.ElementAt(0).Outer).is.equal(2)
    expect(results.ElementAt(0).Inner).is.equal(2)
  })

  it('join([1, 1, 2], [1, 2, 3], o => o, i => i, (o, i) => { return { o: o, i: i } }) => [{1, 1}, {1, 1}, {2, 2}]', function () {
    let results = join(
      [1, 1, 2],
      [1, 2, 3],
      (o) => o,
      (i) => i,
      (o, i) => {
        return { o: o, i: i }
      }
    )

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(3)
    expect(results.ElementAt(0).o).is.equal(1)
    expect(results.ElementAt(0).i).is.equal(1)
    expect(results.ElementAt(1).o).is.equal(1)
    expect(results.ElementAt(1).i).is.equal(1)
    expect(results.ElementAt(2).o).is.equal(2)
    expect(results.ElementAt(2).i).is.equal(2)
  })

  it('join([1, 1, 2, 5], [1, 2, 3, 2, 2, 4], o => o, i => i, (o, i) => { return { o: o, i: i } }) => [{1, 1}, {1, 1}, {2, 2}, {2, 2}, {2, 2}]', function () {
    let results = join(
      [1, 1, 2, 5],
      [1, 2, 3, 2, 2, 4],
      (o) => o,
      (i) => i,
      (o, i) => {
        return { o: o, i: i }
      }
    )

    expect(results).is.not.null
    expect(results).is.not.undefined
    expect(results.Count()).is.equal(5)
    expect(results.ElementAt(0).o).is.equal(1)
    expect(results.ElementAt(0).i).is.equal(1)
    expect(results.ElementAt(1).o).is.equal(1)
    expect(results.ElementAt(1).i).is.equal(1)
    expect(results.ElementAt(2).o).is.equal(2)
    expect(results.ElementAt(2).i).is.equal(2)
    expect(results.ElementAt(3).o).is.equal(2)
    expect(results.ElementAt(3).i).is.equal(2)
    expect(results.ElementAt(4).o).is.equal(2)
    expect(results.ElementAt(4).i).is.equal(2)
  })

  it('join([{text:1, value:2},{text:2, value:3}],[{text:1, value:2},{text:3, value:2}], (x, y) => x.text === y.text && x.value === y.value) => [{{text:1, value:2}, {text:1, value:2}}]', function () {
    let left = [new Spec('1', '2'), new Spec('2', '3')]
    let right = [new Spec('1', '2'), new Spec('3', '2')]
    let joined = join(
      left,
      right,
      (o) => o,
      (i) => i,
      (o, i) => {
        return { o: o, i: i }
      },
      new EqualityImpl()
    )
    expect(joined.Count()).is.equal(1)
    expect(joined.ElementAt(0).o.Text).is.equal('1')
    expect(joined.ElementAt(0).o.Value).is.equal('2')
    expect(joined.ElementAt(0).i.Text).is.equal('1')
    expect(joined.ElementAt(0).i.Value).is.equal('2')
  })

  it('join([{text:1, value:2},{text:2, value:3}],[{text:1, value:2},{text:3, value:2}], (x, y) => x.text === y.text|value && x.value === y.text|value) => [{{text:1, value:2}, {text:1, value:2}}, {{text:2, value:3}, {text:3, value:2}}]', function () {
    let left = [new Spec('1', '2'), new Spec('2', '3')]
    let right = [new Spec('1', '2'), new Spec('3', '2')]
    let joined = join(
      left,
      right,
      (o) => o,
      (i) => i,
      (o, i) => {
        return { o: o, i: i }
      },
      new EqualityImplPlus()
    )
    expect(joined.Count()).is.equal(2)
    expect(joined.ElementAt(0).o.Text).is.equal('1')
    expect(joined.ElementAt(0).o.Value).is.equal('2')
    expect(joined.ElementAt(0).i.Text).is.equal('1')
    expect(joined.ElementAt(0).i.Value).is.equal('2')
    expect(joined.ElementAt(1).o.Text).is.equal('2')
    expect(joined.ElementAt(1).o.Value).is.equal('3')
    expect(joined.ElementAt(1).i.Text).is.equal('3')
    expect(joined.ElementAt(1).i.Value).is.equal('2')
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

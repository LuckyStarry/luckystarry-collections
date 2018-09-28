/* tslint:disable */
import { expect } from 'chai'
import { reverse } from '../../src/enumerables/reverse'
import { List } from '../../src'

describe('./enumerables/reverse.ts', function() {
  it('存在 reverse 方法', function() {
    expect(reverse).not.null
    expect(reverse).not.undefined
    expect(typeof reverse).to.equal('function')
  })

  it('reverse(null) => throw', function() {
    expect(() => {
      reverse(null)
    }).to.throw(`参数 source 不可为空`)
  })

  it('reverse(undefined) => throw', function() {
    expect(() => {
      reverse(undefined)
    }).to.throw(`参数 source 不可为空`)
  })

  it('reverse([]) => Empty', function() {
    expect(reverse([]).Any()).is.false
  })

  it('reverse([1, 2]) => [2, 1]', function() {
    let reverseed = reverse([1, 2])
    expect(reverseed.Any()).is.true
    expect(reverseed.Count()).is.equal(2)
    expect(reverseed.ElementAt(0)).is.equal(2)
    expect(reverseed.ElementAt(1)).is.equal(1)
  })

  it('reverse([2, 1]) => [1, 2]', function() {
    let reverseed = reverse([2, 1])
    expect(reverseed.Any()).is.true
    expect(reverseed.Count()).is.equal(2)
    expect(reverseed.ElementAt(0)).is.equal(1)
    expect(reverseed.ElementAt(1)).is.equal(2)
  })

  it('reverse([1, 2, 3, 4, 4, 5, 6, 7]) => [7, 6, 5, 4, 4, 3, 2, 1]', function() {
    let reverseed = reverse([1, 2, 3, 4, 4, 5, 6, 7])
    expect(reverseed.Any()).is.true
    expect(reverseed.Count()).is.equal(8)

    expect(reverseed.ElementAt(0)).is.equal(7)
    expect(reverseed.ElementAt(1)).is.equal(6)
    expect(reverseed.ElementAt(2)).is.equal(5)
    expect(reverseed.ElementAt(3)).is.equal(4)
    expect(reverseed.ElementAt(4)).is.equal(4)
    expect(reverseed.ElementAt(5)).is.equal(3)
    expect(reverseed.ElementAt(6)).is.equal(2)
    expect(reverseed.ElementAt(7)).is.equal(1)
  })

  it('reverse(new List([1, 2, 3, 4, 4, 5, 6, 7])) => [7, 6, 5, 4, 4, 3, 2, 1]', function() {
    let reverseed = reverse(new List([1, 2, 3, 4, 4, 5, 6, 7]))
    expect(reverseed.Any()).is.true
    expect(reverseed.Count()).is.equal(8)

    expect(reverseed.ElementAt(0)).is.equal(7)
    expect(reverseed.ElementAt(1)).is.equal(6)
    expect(reverseed.ElementAt(2)).is.equal(5)
    expect(reverseed.ElementAt(3)).is.equal(4)
    expect(reverseed.ElementAt(4)).is.equal(4)
    expect(reverseed.ElementAt(5)).is.equal(3)
    expect(reverseed.ElementAt(6)).is.equal(2)
    expect(reverseed.ElementAt(7)).is.equal(1)
  })

  it('reverse([{text:1, value:2},{text:2, value:3},{text:3, value:2},{text:2, value:1}] => [{text:2, value:1},{text:3, value:2},{text:2, value:3},{text:1, value:2}]', function() {
    let list = [
      new Spec('1', '2'),
      new Spec('2', '3'),
      new Spec('3', '2'),
      new Spec('2', '1')
    ]
    let reversed = reverse(list)
    expect(reversed.Count()).is.equal(4)
    expect(reversed.ElementAt(0).Text).is.equal('2')
    expect(reversed.ElementAt(0).Value).is.equal('1')
    expect(reversed.ElementAt(1).Text).is.equal('3')
    expect(reversed.ElementAt(1).Value).is.equal('2')
    expect(reversed.ElementAt(2).Text).is.equal('2')
    expect(reversed.ElementAt(2).Value).is.equal('3')
    expect(reversed.ElementAt(3).Text).is.equal('1')
    expect(reversed.ElementAt(3).Value).is.equal('2')
  })
})

class Spec {
  constructor(public Text: string, public Value: string) {}
}

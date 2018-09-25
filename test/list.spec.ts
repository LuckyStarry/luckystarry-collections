import { expect } from 'chai'
import { List } from '../src/list'

describe('./list.ts', function() {
  it('存在 Class List', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(List).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(List).not.undefined
    expect(typeof List).to.equal('function')
  })

  it('List 可使用无参构造函数', function() {
    let list = new List()
    expect(list.Count()).is.equal(0)
  })

  it('List 可使用 Array 构造函数', function() {
    let original = [1, 2, 3, 4, 5]
    let list = new List(original)
    expect(list.Count()).is.equal(5)
    expect(list.Get(0)).is.equal(1)
    expect(list.Get(1)).is.equal(2)
    expect(list.Get(2)).is.equal(3)
    expect(list.Get(3)).is.equal(4)
    expect(list.Get(4)).is.equal(5)
  })

  it('List 可使用 IEnumerable 构造函数', function() {
    let original = new List([1, 2, 3, 4, 5])
    let list = new List(original)
    expect(list.Count()).is.equal(5)
    expect(list).is.not.equal(original)
    expect(list.Get(0)).is.equal(original.Get(0))
    expect(list.Get(1)).is.equal(original.Get(1))
    expect(list.Get(2)).is.equal(original.Get(2))
    expect(list.Get(3)).is.equal(original.Get(3))
    expect(list.Get(4)).is.equal(original.Get(4))
  })
})

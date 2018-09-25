import { expect } from 'chai'
import DEFAULT, { Enumerable, List } from '../src/index'

describe('./index.ts', function() {
  it('存在 默认导出', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(DEFAULT).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(DEFAULT).not.undefined
    expect(typeof DEFAULT).to.equal('function')
  })

  it('存在 Enumerable', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(Enumerable).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(Enumerable).not.undefined
    expect(typeof Enumerable).to.equal('function')
  })

  it('存在 List', function() {
    // tslint:disable-next-line:no-unused-expression
    expect(List).not.null
    // tslint:disable-next-line:no-unused-expression
    expect(List).not.undefined
    expect(typeof List).to.equal('function')
  })

  it('默认导出 与 Enumerable 为同一个对象', function() {
    expect(DEFAULT).to.equal(Enumerable)
  })
})

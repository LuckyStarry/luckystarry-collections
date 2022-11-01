/* tslint:disable */
import { expect } from 'chai'
import DEFAULT, { Enumerable, List, Dictionary, ReadOnlyCollection, ReadOnlyList } from '../src/index'

describe('./index.ts', function () {
  it('存在 默认导出', function () {
    expect(DEFAULT).not.null
    expect(DEFAULT).not.undefined
    expect(typeof DEFAULT).to.equal('function')
  })

  it('存在 Enumerable', function () {
    expect(Enumerable).not.null
    expect(Enumerable).not.undefined
    expect(typeof Enumerable).to.equal('function')
  })

  it('存在 List', function () {
    expect(List).not.null
    expect(List).not.undefined
    expect(typeof List).to.equal('function')
  })

  it('存在 Dictionary', function () {
    expect(Dictionary).not.null
    expect(Dictionary).not.undefined
    expect(typeof Dictionary).to.equal('function')
  })

  it('存在 ReadOnlyCollection', function () {
    expect(ReadOnlyCollection).not.null
    expect(ReadOnlyCollection).not.undefined
    expect(typeof ReadOnlyCollection).to.equal('function')
  })

  it('存在 ReadOnlyList', function () {
    expect(ReadOnlyList).not.null
    expect(ReadOnlyList).not.undefined
    expect(typeof ReadOnlyList).to.equal('function')
  })

  it('默认导出 与 Enumerable 为同一个对象', function () {
    expect(DEFAULT).to.equal(Enumerable)
  })
})

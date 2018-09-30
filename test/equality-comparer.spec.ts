/* tslint:disable */
import { expect } from 'chai'
import { EqualityComparer } from '../src/equality-comparer'

describe('./equality-comparer.ts', function() {
  it('存在 Class EqualityComparer', function() {
    expect(EqualityComparer).not.null
    expect(EqualityComparer).not.undefined
    expect(typeof EqualityComparer).to.equal('function')
  })

  it('EqualityComparer.Default() 不为空', function() {
    let comparer = EqualityComparer.Default()
    expect(comparer).not.null
    expect(comparer).not.undefined
    expect(comparer).is.instanceof(EqualityComparer)
  })

  it('EqualityComparer.GetHashCode(null) => 0', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode(null)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(0)
  })

  it('EqualityComparer.GetHashCode(undefined) => 0', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode(undefined)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(0)
  })

  it('EqualityComparer.GetHashCode(0) => 0', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode(0)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(0)
  })

  it('EqualityComparer.GetHashCode(-1) => -1', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode(-1)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(-1)
  })

  it('EqualityComparer.GetHashCode(12345) => 12345', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode(12345)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(12345)
  })

  it('EqualityComparer.GetHashCode(12345) => 12345', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode(12345)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(12345)
  })

  it('EqualityComparer.GetHashCode("") => 0', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode('')
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(0)
  })

  it('EqualityComparer.GetHashCode("1") => 49', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode('1')
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(49)
  })

  it('EqualityComparer.GetHashCode("12345") => 46792755', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode('12345')
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(46792755)
  })

  it('EqualityComparer.GetHashCode("12345") => 46792755', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode('12345')
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(46792755)
  })

  it('EqualityComparer.GetHashCode("abcde") => 92599395', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode('abcde')
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(92599395)
  })

  it('EqualityComparer.GetHashCode("abcdef") => -1424385949', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode('abcdef')
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(-1424385949)
  })

  it('EqualityComparer.GetHashCode("abcdefg") => -1206291356', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode('abcdefg')
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.equal(-1206291356)
  })

  it('EqualityComparer.GetHashCode({}) => instanceof Number', function() {
    let comparer = EqualityComparer.Default()
    let code = comparer.GetHashCode({})
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.not.equal(0)
    expect(typeof code).is.equal('number')
  })

  it('EqualityComparer.GetHashCode({}) => 同一个对象多次取值相等', function() {
    let comparer = EqualityComparer.Default()
    let obj = {}
    let code = comparer.GetHashCode(obj)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.not.equal(0)
    expect(typeof code).is.equal('number')
    expect(code).is.equal(comparer.GetHashCode(obj))
  })

  it('EqualityComparer.GetHashCode(x => x) => instanceof Number', function() {
    let comparer = EqualityComparer.Default()
    let obj = x => x
    let code = comparer.GetHashCode(obj)
    expect(code).not.null
    expect(code).not.undefined
    expect(code).is.not.equal(0)
    expect(typeof code).is.equal('number')
    expect(code).is.equal(comparer.GetHashCode(obj))
  })
})

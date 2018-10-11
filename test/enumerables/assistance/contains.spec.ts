/* tslint:disable */
import { expect } from 'chai'
import { contains } from '../../../src/enumerables/assistance/contains'

describe('./enumerables/assistance/contains.ts', function() {
  it('存在 contains 方法', function() {
    expect(contains).not.null
    expect(contains).not.undefined
    expect(typeof contains).to.equal('function')
  })

  it('contains(null, 1) => false', function() {
    expect(contains(null, 1)).is.false
  })

  it('contains(undefined, 1) => false', function() {
    expect(contains(undefined, 1)).is.false
  })

  it('contains([1], 1)) => true', function() {
    expect(contains([1], 1)).is.true
  })
})

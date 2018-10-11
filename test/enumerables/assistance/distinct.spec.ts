/* tslint:disable */
import { expect } from 'chai'
import { distinct } from '../../../src/enumerables/assistance/distinct'

describe('./enumerables/assistance/distinct.ts', function() {
  it('存在 distinct 方法', function() {
    expect(distinct).not.null
    expect(distinct).not.undefined
    expect(typeof distinct).to.equal('function')
  })

  it('distinct(null) => false', function() {
    expect(distinct(null)).is.null
  })

  it('distinct(undefined) => false', function() {
    expect(distinct(undefined)).is.undefined
  })

  it('distinct([1, 3])).count => 2', function() {
    expect(distinct([1, 3])).is.instanceof(Array)
    let count = 0
    for (let item of distinct([1, 3])) {
      count++
    }
    expect(count).is.equal(2)
  })
})

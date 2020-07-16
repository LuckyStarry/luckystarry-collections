/* tslint:disable */
import { expect } from 'chai'
import { intersect } from '../../../src/enumerables/assistance/intersect'

describe('./enumerables/assistance/intersect.ts', function () {
  it('存在 intersect 方法', function () {
    expect(intersect).not.null
    expect(intersect).not.undefined
    expect(typeof intersect).to.equal('function')
  })

  it('intersect(null, [1]) => null', function () {
    expect(intersect(null, [1])).is.null
  })

  it('intersect(undefined, [1]) => undefined', function () {
    expect(intersect(undefined, [1])).is.undefined
  })

  it('intersect([1, 2, 3], [2, 3, 4])) => [1]', function () {
    let list = intersect([1, 2, 3], [2, 3, 4])
    expect(list).is.instanceOf(Array)
  })
})

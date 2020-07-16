/* tslint:disable */
import { expect } from 'chai'
import { except } from '../../../src/enumerables/assistance/except'

describe('./enumerables/assistance/except.ts', function () {
  it('存在 except 方法', function () {
    expect(except).not.null
    expect(except).not.undefined
    expect(typeof except).to.equal('function')
  })

  it('except(null, [1]) => null', function () {
    expect(except(null, [1])).is.null
  })

  it('except(undefined, [1]) => undefined', function () {
    expect(except(undefined, [1])).is.undefined
  })

  it('except([1, 2, 3], [2, 3, 4])) => [1]', function () {
    let list = except([1, 2, 3], [2, 3, 4])
    expect(list).is.instanceOf(Array)
  })
})

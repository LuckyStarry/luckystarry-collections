/* tslint:disable */
import { expect } from 'chai'
import { group } from '../../../src/enumerables/assistance/group'

describe('./enumerables/assistance/group.ts', function() {
  it('存在 group 方法', function() {
    expect(group).not.null
    expect(group).not.undefined
    expect(typeof group).to.equal('function')
  })

  it('group(null, x => x, e => e) => null', function() {
    expect(group(null, x => x, e => e)).is.null
  })

  it('group(undefined, x => x, e => e) => undefined', function() {
    expect(group(undefined, x => x, e => e)).is.undefined
  })

  it('group([1, 2, 3, null, 5], x => x, e => e) => not null', function() {
    expect(group([1, 2, 3, null, 5], x => x, e => e)).is.not.null
  })

  it('group([1, 2, 3, undefined, 5], x => x, e => e) => not null', function() {
    expect(group([1, 2, 3, undefined, 5], x => x, e => e)).is.not.null
  })
})

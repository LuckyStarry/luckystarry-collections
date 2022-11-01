/* tslint:disable */
import { expect } from 'chai'
import { IsNull, IsUndefined } from '../../src/utils/index'

describe('./utils/index.ts', function () {
  it('存在 Function IsNull', function () {
    expect(IsNull).not.null
    expect(IsNull).not.undefined
    expect(typeof IsNull).to.equal('function')
  })

  it('存在 Function IsUndefined', function () {
    expect(IsUndefined).not.null
    expect(IsUndefined).not.undefined
    expect(typeof IsUndefined).to.equal('function')
  })

  it('IsNull() => false', function () {
    expect((IsNull as any)()).is.false
  })

  it('IsNull(undefined) => false', function () {
    expect(IsNull(undefined)).is.false
  })

  it('IsNull(0) => false', function () {
    expect(IsNull(0)).is.false
  })

  it('IsNull(1) => false', function () {
    expect(IsNull(1)).is.false
  })

  it("IsNull('') => false", function () {
    expect(IsNull('')).is.false
  })

  it("IsNull('foo') => false", function () {
    expect(IsNull('foo')).is.false
  })

  it('IsNull(null) => true', function () {
    expect(IsNull(null)).is.true
  })

  it('IsUndefined() => true', function () {
    expect((IsUndefined as any)()).is.true
  })

  it('IsUndefined(undefined) => true', function () {
    expect(IsUndefined(undefined)).is.true
  })

  it('IsUndefined(0) => false', function () {
    expect(IsUndefined(0)).is.false
  })

  it('IsUndefined(1) => false', function () {
    expect(IsUndefined(1)).is.false
  })

  it("IsUndefined('') => false", function () {
    expect(IsUndefined('')).is.false
  })

  it("IsUndefined('foo') => false", function () {
    expect(IsUndefined('foo')).is.false
  })

  it('IsUndefined(null) => false', function () {
    expect(IsUndefined(null)).is.false
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { ArgumentOutOfRangeException } from '../../src/exceptions/argument-out-of-range-exception'

describe('./exceptions/argument-out-of-range-exception.ts', function() {
  it('存在 Class ArgumentOutOfRangeException', function() {
    expect(ArgumentOutOfRangeException).not.null
    expect(ArgumentOutOfRangeException).not.undefined
    expect(typeof ArgumentOutOfRangeException).to.equal('function')
  })

  it('ArgumentOutOfRangeException 可使用无参构造函数', function() {
    expect(() => {
      throw new ArgumentOutOfRangeException()
    }).to.throw('数组下标越界')
  })

  it('ArgumentOutOfRangeException 可使用有参构造函数', function() {
    const paramName = '123456'
    const actualValue = 'AAAAA'
    const message = '789012'
    expect(() => {
      throw new ArgumentOutOfRangeException(paramName)
    }).to.throw(`参数 ${paramName} 的范围越界`)
    expect(() => {
      throw new ArgumentOutOfRangeException(paramName, actualValue)
    }).to.throw(`参数 ${paramName} 的范围越界 ${actualValue}`)
    expect(() => {
      throw new ArgumentOutOfRangeException(paramName, actualValue, message)
    }).to.throw(message)
  })

  it('ArgumentOutOfRangeException.ActualValue 正常', function() {
    const paramName = '123456'
    const actualValue = 'AAAAA'
    let exception = new ArgumentOutOfRangeException(paramName, actualValue)
    expect(exception.ActualValue).is.equal(actualValue)
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { ArgumentException } from '../../src/exceptions/argument-exception'

describe('./exceptions/argument-exception.ts', function () {
  it('存在 Class ArgumentException', function () {
    expect(ArgumentException).not.null
    expect(ArgumentException).not.undefined
    expect(typeof ArgumentException).to.equal('function')
  })

  it('ArgumentException 可使用无参构造函数', function () {
    expect(() => {
      throw new ArgumentException()
    }).to.throw('参数存在异常')
  })

  it('ArgumentException 可使用有参构造函数', function () {
    const paramName = '123456'
    const message = '789012'
    expect(() => {
      throw new ArgumentException(paramName)
    }).to.throw(`参数 ${paramName} 存在异常`)
    expect(() => {
      throw new ArgumentException(paramName, message)
    }).to.throw(message)
  })

  it('ArgumentException.ParamName 正常', function () {
    const paramName = '123456'
    let exception = new ArgumentException(paramName)
    expect(exception.ParamName).is.equal(paramName)
  })
})

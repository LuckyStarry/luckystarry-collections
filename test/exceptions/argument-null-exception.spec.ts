/* tslint:disable */
import { expect } from 'chai'
import { ArgumentNullException } from '../../src/exceptions/argument-null-exception'

describe('./exceptions/argument-null-exception.ts', function() {
  it('存在 Class ArgumentNullException', function() {
    expect(ArgumentNullException).not.null
    expect(ArgumentNullException).not.undefined
    expect(typeof ArgumentNullException).to.equal('function')
  })

  it('ArgumentNullException 可使用无参构造函数', function() {
    expect(() => {
      throw new ArgumentNullException()
    }).to.throw('参数不可为空')
  })

  it('ArgumentNullException 可使用有参构造函数', function() {
    const paramName = '123456'
    const message = '789012'
    expect(() => {
      throw new ArgumentNullException(paramName)
    }).to.throw(`参数 ${paramName} 不可为空`)
    expect(() => {
      throw new ArgumentNullException(paramName, message)
    }).to.throw(message)
  })
})

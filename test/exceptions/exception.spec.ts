/* tslint:disable */
import { expect } from 'chai'
import { Exception } from '../../src/exceptions/exception'

describe('./exceptions/exception.ts', function() {
  it('存在 Class Exception', function() {
    expect(Exception).not.null
    expect(Exception).not.undefined
    expect(typeof Exception).to.equal('function')
  })

  it('Exception 可使用无参构造函数', function() {
    expect(() => {
      throw new Exception()
    }).to.throw('程序出现异常')
  })

  it('Exception 可使用有参构造函数', function() {
    const message = '123456'
    expect(() => {
      throw new Exception(message)
    }).to.throw(message)
  })

  it('Exception.Message 正常', function() {
    const message = '123456'
    let exception = new Exception(message)
    expect(exception.Message).is.equal(message)
  })
})

/* tslint:disable */
import { expect } from 'chai'
import { KeyNotFoundException } from '../../src/exceptions/key-not-found-exception'

describe('./exceptions/key-not-found-exception.ts', function () {
  it('存在 Class KeyNotFoundException', function () {
    expect(KeyNotFoundException).not.null
    expect(KeyNotFoundException).not.undefined
    expect(typeof KeyNotFoundException).to.equal('function')
  })

  it('KeyNotFoundException 可使用无参构造函数', function () {
    expect(() => {
      throw new KeyNotFoundException()
    }).to.throw('不存在的Key')
  })

  it('KeyNotFoundException 可使用有参构造函数', function () {
    const message = '789012'
    expect(() => {
      throw new KeyNotFoundException(message)
    }).to.throw(message)
  })
})

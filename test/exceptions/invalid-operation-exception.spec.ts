/* tslint:disable */
import { expect } from 'chai'
import { InvalidOperationException } from '../../src/exceptions/invalid-operation-exception'

describe('./exceptions/invalid-operation-exception.ts', function () {
  it('存在 Class InvalidOperationException', function () {
    expect(InvalidOperationException).not.null
    expect(InvalidOperationException).not.undefined
    expect(typeof InvalidOperationException).to.equal('function')
  })

  it('InvalidOperationException 可使用无参构造函数', function () {
    expect(() => {
      throw new InvalidOperationException()
    }).to.throw('操作无效')
  })

  it('InvalidOperationException 可使用有参构造函数', function () {
    const message = '789012'
    expect(() => {
      throw new InvalidOperationException(message)
    }).to.throw(message)
  })
})

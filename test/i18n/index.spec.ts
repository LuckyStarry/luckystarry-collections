import { expect } from 'chai'
import { I18n, messages } from '../../src/i18n'

describe('./i18n/index.ts', function () {
  it('存在 I18n 类', function () {
    expect(I18n).not.null
    expect(I18n).not.undefined
  })

  it('存在 messages 对象', function () {
    expect(messages).not.null
    expect(messages).not.undefined
  })
})

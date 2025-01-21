import { expect } from 'chai'
import { I18n } from '../../src/i18n'

describe('./i18n/i18n.ts', function () {
  it('存在 I18n 类', function () {
    expect(I18n).not.null
    expect(I18n).not.undefined
  })

  it('默认使用中文消息', function () {
    expect(I18n.t('errors.program.exception')).to.equal('程序出现异常')
  })

  it('可以切换到英文', function () {
    I18n.setLocale('en_US')
    expect(I18n.t('errors.program.exception')).to.equal('Program exception occurred')
    // 测试完恢复默认值
    I18n.setLocale('zh_CN')
  })

  it('支持参数替换', function () {
    expect(I18n.t('errors.params.required', 'name')).to.equal('name 不可为空')
  })

  it('支持多参数替换', function () {
    expect(I18n.t('errors.params.out_of_range_with_value', 'count', 5)).to.equal('参数 count 的范围越界 5')
  })

  it('可以设置新的消息', function () {
    const originalMessages = I18n['messages']
    const newMessages = {
      zh_CN: {
        test: {
          message: '测试消息'
        }
      }
    }
    I18n.setMessages(newMessages)
    expect(I18n.t('test.message')).to.equal('测试消息')
    // 测试完恢复原始消息
    I18n.setMessages(originalMessages)
  })

  it('参数不存在时保留原始占位符', function () {
    expect(I18n.t('errors.params.required')).to.equal('{0} 不可为空')
  })

  it('消息键不存在时返回 key', function () {
    expect(I18n.t('not.exist.key')).to.equal('not.exist.key')
  })

  it('当前语言不存在时返回 key', function () {
    I18n.setLocale('fr_FR')
    expect(I18n.t('errors.program.exception')).to.equal('errors.program.exception')
    // 测试完恢复默认值
    I18n.setLocale('zh_CN')
  })

  it('消息键为空时返回空字符串', function () {
    expect(I18n.t('')).to.equal('')
  })

  it('消息键为 undefined 时返回空字符串', function () {
    expect(I18n.t(undefined as any)).to.equal('')
  })

  it('参数为 null 时显示为 null', function () {
    expect(I18n.t('errors.params.out_of_range_with_value', 'count', null)).to.equal('参数 count 的范围越界 null')
  })

  it('参数为 undefined 时保留占位符', function () {
    expect(I18n.t('errors.params.out_of_range_with_value', 'count', undefined)).to.equal('参数 count 的范围越界 {1}')
  })

  it('参数为 boolean true 时显示为 true', function () {
    expect(I18n.t('errors.params.out_of_range_with_value', 'count', true)).to.equal('参数 count 的范围越界 true')
  })

  it('参数为 boolean false 时显示为 false', function () {
    expect(I18n.t('errors.params.out_of_range_with_value', 'count', false)).to.equal('参数 count 的范围越界 false')
  })
})

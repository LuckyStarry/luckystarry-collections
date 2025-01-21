// src/i18n/i18n.ts
import { messages } from './messages'

export class I18n {
  private static currentLocale: string = 'zh_CN'
  private static messages: any = messages

  public static setLocale(locale: string) {
    this.currentLocale = locale
  }

  public static setMessages(messages: any) {
    this.messages = messages
  }

  public static t(key: string, ...args: any[]): string {
    const message = this.getMessage(key)
    if (message === undefined) {
      return key || ''
    }
    return this.format(message, args)
  }

  private static getMessage(key: string): string {
    const keys = (key || '').split('.')
    let result = this.messages[this.currentLocale]
    if (result === undefined) {
      return undefined
    }
    for (const k of keys) {
      result = result[k]
      if (result === undefined) {
        return undefined
      }
    }
    return result
  }

  private static format(message: string, args: any[]): string {
    return message.replace(/\{(\d+)\}/g, (match, index) => {
      const value = args[index]
      if (typeof value === 'undefined') {
        return match
      }
      if (value === null) {
        return 'null'
      }
      if (typeof value === 'boolean') {
        return value ? 'true' : 'false'
      }
      return value
    })
  }
}

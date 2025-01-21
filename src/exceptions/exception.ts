import { I18n } from '../i18n'

export class Exception implements Error {
  name: string
  message: string
  stack?: string

  public constructor(message?: string) {
    this.message = message || I18n.t('errors.program.exception')
  }

  public get Message(): string {
    return this.message
  }
}

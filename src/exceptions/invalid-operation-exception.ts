import { Exception } from './exception'
import { I18n } from '../i18n'

export class InvalidOperationException extends Exception {
  /* istanbul ignore next */
  public constructor(message?: string) {
    super(message || I18n.t('errors.operation.invalid'))
  }
}

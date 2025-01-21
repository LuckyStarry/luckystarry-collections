import { ArgumentException } from './argument-exception'
import { I18n } from '../i18n'

export class ArgumentNullException extends ArgumentException {
  /* istanbul ignore next */
  public constructor(paramName?: string, message?: string) {
    super(paramName, message || composite(paramName))
  }
}

function composite(paramName?: string): string {
  if (paramName) {
    return I18n.t('errors.params.null', paramName)
  }
  return I18n.t('errors.params.null_without_name')
}

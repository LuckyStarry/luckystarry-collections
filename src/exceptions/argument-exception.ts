import { Exception } from './exception'
import { I18n } from '../i18n'

export class ArgumentException extends Exception {
  private paramName: string
  /* istanbul ignore next */
  public constructor(paramName?: string, message?: string) {
    super(message || composite(paramName))
    this.paramName = paramName
  }

  public get ParamName(): string {
    return this.paramName
  }
}

function composite(paramName?: string): string {
  if (paramName) {
    return I18n.t('errors.params.invalid_with_name', paramName)
  }
  return I18n.t('errors.params.invalid_without_name')
}

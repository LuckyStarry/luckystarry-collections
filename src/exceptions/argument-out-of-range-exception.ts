import { ArgumentException } from './argument-exception'
import { I18n } from '../i18n'

export class ArgumentOutOfRangeException extends ArgumentException {
  private actualValue: any
  /* istanbul ignore next */
  public constructor(paramName?: string, actualValue?: any, message?: string) {
    super(paramName, message || composite(paramName, actualValue))
    this.actualValue = actualValue
  }

  public get ActualValue(): any {
    return this.actualValue
  }
}

function composite(paramName?: string, actualValue?: any): string {
  if (paramName) {
    if (actualValue !== undefined) {
      return I18n.t('errors.params.out_of_range_with_value', paramName, actualValue)
    }
    return I18n.t('errors.params.out_of_range', paramName)
  }
  return I18n.t('errors.array.index_out_of_range')
}

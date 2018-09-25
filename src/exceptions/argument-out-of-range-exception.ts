import { ArgumentException } from './argument-exception'

export class ArgumentOutOfRangeException extends ArgumentException {
  private actualValue: any

  public constructor(paramName?: string, actualValue?: any, message?: string) {
    super(paramName, composite(paramName, actualValue, message))
  }

  public get ActualValue(): any {
    return this.actualValue
  }
}

function composite(
  paramName?: string,
  actualValue?: any,
  message?: string
): string {
  if (message) {
    return message
  }
  if (paramName) {
    if (actualValue !== undefined) {
      return `参数 ${paramName} 的范围越界 ${actualValue}`
    }
  }
  return '数组下标越界'
}

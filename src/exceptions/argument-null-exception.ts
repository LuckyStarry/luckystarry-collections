import { ArgumentException } from './argument-exception'

export class ArgumentNullException extends ArgumentException {
  public constructor(paramName?: string, message?: string) {
    super(paramName, composite(paramName, message))
  }
}

function composite(paramName?: string, message?: string): string {
  if (message) {
    return message
  }
  if (paramName) {
    return `参数 ${paramName} 不可为空`
  }
  return '参数不可为空'
}

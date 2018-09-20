export class ArgumentOutOfRangeException extends Error {
  public constructor(paramName?: string, actualValue?: any, message?: string) {
    super(composite(paramName, actualValue, message))
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

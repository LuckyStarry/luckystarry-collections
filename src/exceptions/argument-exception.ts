export class ArgumentException extends Error {
  private paramName: string

  public constructor(paramName?: string, message?: string) {
    super(composite(paramName, message))

    this.paramName = paramName
  }

  public get ParamName(): string {
    return this.paramName
  }
}

function composite(paramName?: string, message?: string): string {
  if (message) {
    return message
  }
  if (paramName) {
    return `参数 ${paramName} 存在异常`
  }
  return '参数存在异常'
}

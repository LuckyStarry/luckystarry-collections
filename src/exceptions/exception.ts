export class Exception implements Error {
  name: string
  message: string
  stack?: string

  public constructor(message?: string) {
    this.message = message || '程序出现异常'
  }

  public get Message(): string {
    return this.message
  }
}

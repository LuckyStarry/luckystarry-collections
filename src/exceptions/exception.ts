export class Exception extends Error {
  public constructor(message?: string) {
    super(message || '程序出现异常')
  }

  public get Message(): string {
    return this.message
  }
}

import { Exception } from './exception'

export class InvalidOperationException extends Exception {
  public constructor(message?: string) {
    super(message || '操作无效')
  }
}

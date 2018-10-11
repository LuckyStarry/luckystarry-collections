import { Exception } from './exception'

export class KeyNotFoundException extends Exception {
  /* istanbul ignore next */
  public constructor(message?: string) {
    super(message || '不存在的Key')
  }
}

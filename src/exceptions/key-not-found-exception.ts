import { Exception } from './exception'

export class KeyNotFoundException extends Exception {
  public constructor() {
    super('不存在的Key')
  }
}

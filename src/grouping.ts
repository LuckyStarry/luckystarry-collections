import { IEnumerable } from './enumerable'
import { InternalEnumerable } from './enumerables/internal-enumerable'

export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
  readonly Key: TKey
}

export class Grouping<TKey, TElement> extends InternalEnumerable<TElement>
  implements IGrouping<TKey, TElement> {
  private key: TKey
  private source: IEnumerable<TElement>

  public constructor(key: TKey, source: IEnumerable<TElement>) {
    super([])
    this.key = key
    this.source = source
  }

  public get Key(): TKey {
    return this.key
  }

  public [Symbol.iterator](): IterableIterator<TElement> {
    return this.source[Symbol.iterator]()
  }
}

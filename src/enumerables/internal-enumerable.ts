import { EnumerableExtensions } from '../enumerable-extensions'

export class InternalEnumerable<TSource> extends EnumerableExtensions<TSource> {
  private iteratable: { [Symbol.iterator](): IterableIterator<TSource> }
  public constructor(iteratable: {
    [Symbol.iterator](): IterableIterator<TSource>
  }) {
    super()
    this.iteratable = iteratable
  }

  public *[Symbol.iterator](): IterableIterator<TSource> {
    for (let item of this.iteratable) {
      yield item
    }
  }
}

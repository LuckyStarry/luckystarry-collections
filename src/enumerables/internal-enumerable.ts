import { EnumerableImpl } from '../enumerable-impl'

export class InternalEnumerable<TSource> extends EnumerableImpl<TSource> {
  private iteratable: Iterable<TSource>
  public constructor(iteratable: Iterable<TSource>) {
    super()
    this.iteratable = iteratable
  }

  public *[Symbol.iterator](): IterableIterator<TSource> {
    yield* this.iteratable
  }
}

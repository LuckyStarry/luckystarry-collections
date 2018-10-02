import { IEnumerable } from '../enumerable'
import { throws } from '../utils'
import { EnumerableContainer } from './enumerable-container'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import * as assistance from './assistance'

export function union<TSource>(
  first: Iterable<TSource>,
  second: Iterable<TSource>,
  comparer?: IEqualityComparer<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('first', first)
  throws.ThrowIfNull('second', second)
  comparer = comparer || EqualityComparer.Default()
  return new EnumerableContainer(
    assistance.distinct(assistance.concat(first, second), (x, y) =>
      comparer.Equals(x, y)
    )
  )
}

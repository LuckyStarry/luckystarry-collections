import { IEnumerable, Enumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import { throws } from '../utils'
import * as assistance from './assistance'

export function union<TSource>(
  first: Iterable<TSource>,
  second: Iterable<TSource>,
  comparer?: IEqualityComparer<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('first', first)
  throws.ThrowIfNull('second', second)
  comparer = comparer || EqualityComparer.Default()
  return Enumerable.AsEnumerable(
    assistance.distinct(assistance.concat(first, second), (x, y) =>
      comparer.Equals(x, y)
    )
  )
}

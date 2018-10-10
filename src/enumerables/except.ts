import { IEnumerable, Enumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import * as utils from '../utils'
import * as assistance from './assistance'

export function except<TSource>(
  first: Iterable<TSource>,
  second: Iterable<TSource>,
  comparer?: IEqualityComparer<TSource>
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('first', first)
  utils.throws.ThrowIfNull('second', second)
  comparer = comparer || EqualityComparer.Default()
  return Enumerable.AsEnumerable(
    assistance.except(
      assistance.distinct(first, (x, y) => comparer.Equals(x, y)),
      assistance.distinct(second, (x, y) => comparer.Equals(x, y)),
      (x, y) => comparer.Equals(x, y)
    )
  )
}

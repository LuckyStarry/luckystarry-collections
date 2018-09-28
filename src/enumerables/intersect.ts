import { IEnumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import { InternalEnumerable } from './internal-enumerable'
import * as utils from '../utils'
import * as assistance from './assistance'

export function intersect<TSource>(
  first: Iterable<TSource>,
  second: Iterable<TSource>,
  comparer?: IEqualityComparer<TSource>
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('first', first)
  utils.throws.ThrowIfNull('second', second)
  comparer = comparer || EqualityComparer.Default()
  return new InternalEnumerable(
    assistance.intersect(
      assistance.distinct(first, (x, y) => comparer.Equal(x, y)),
      assistance.distinct(second, (x, y) => comparer.Equal(x, y)),
      (x, y) => comparer.Equal(x, y)
    )
  )
}

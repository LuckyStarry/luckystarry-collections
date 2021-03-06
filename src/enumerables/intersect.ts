import { Enumerable, IEnumerable } from '../enumerable'
import { EqualityComparer, IEqualityComparer } from '../equality-comparer'
import * as utils from '../utils'
import * as assistance from './assistance'

export function intersect<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('first', first)
  utils.throws.ThrowIfNull('second', second)
  comparer = comparer || EqualityComparer.Default()
  return Enumerable.AsEnumerable(
    assistance.intersect(
      assistance.distinct(first, (x, y) => comparer.Equals(x, y)),
      assistance.distinct(second, (x, y) => comparer.Equals(x, y)),
      (x, y) => comparer.Equals(x, y)
    )
  )
}

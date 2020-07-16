import { Enumerable, IEnumerable } from '../enumerable'
import { EqualityComparer, IEqualityComparer } from '../equality-comparer'
import * as utils from '../utils'
import * as assistance from './assistance'

export function distinct<TSource>(source: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  if (Enumerable.Any(source)) {
    comparer = comparer || EqualityComparer.Default()
    return Enumerable.AsEnumerable(assistance.distinct(source, (x, y) => comparer.Equals(x, y)))
  }
  return Enumerable.Empty()
}

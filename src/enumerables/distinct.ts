import { IEnumerable, Enumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import { InternalEnumerable } from './internal-enumerable'
import * as utils from '../utils'
import * as assistance from './assistance'

export function distinct<TSource>(
  source: Iterable<TSource>,
  comparer?: IEqualityComparer<TSource>
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  if (Enumerable.Any(source)) {
    comparer = comparer || EqualityComparer.Default()
    return new InternalEnumerable(
      assistance.distinct(source, (x, y) => comparer.Equal(x, y))
    )
  }
  return Enumerable.Empty()
}

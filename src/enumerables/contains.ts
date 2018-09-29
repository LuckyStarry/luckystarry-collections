import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import * as utils from '../utils'
import * as assistance from './assistance'

export function contains<TSource>(
  source: Iterable<TSource>,
  value: TSource,
  comparer?: IEqualityComparer<TSource>
): boolean {
  utils.throws.ThrowIfNull('source', source)
  comparer = comparer || EqualityComparer.Default()
  return assistance.contains(source, value, (x, y) => comparer.Equals(x, y))
}

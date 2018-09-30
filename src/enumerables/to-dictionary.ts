import { IDictionary, Dictionary } from '../dictionary'
import { IEqualityComparer } from '../equality-comparer'
import * as utils from '../utils'

export function toDictionary<TSource, TKey, TElement = TSource>(
  source: Iterable<TSource>,
  keySelector: (item: TSource) => TKey,
  elementSelector?: (item: TSource) => TElement,
  comparer?: IEqualityComparer<TKey>
): IDictionary<TKey, TElement> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('keySelector', keySelector)
  return new Dictionary()
}

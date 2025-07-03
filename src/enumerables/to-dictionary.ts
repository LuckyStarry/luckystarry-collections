import { Dictionary } from '../dictionary'
import { EqualityComparer, IEqualityComparer } from '../equality-comparer'
import * as utils from '../utils'

export function toDictionary<TSource, TKey, TElement = TSource>(
  source: Iterable<TSource>,
  keySelector: (item: TSource) => TKey,
  elementSelector?: (item: TSource) => TElement,
  comparer?: IEqualityComparer<TKey>
): Dictionary<TKey, TElement> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('keySelector', keySelector)
  const _elementSelector: any = elementSelector || ((x) => x)
  comparer = comparer || EqualityComparer.Default()
  const dictionary = new Dictionary<TKey, TElement>(null, comparer)
  for (const item of source) {
    const key = keySelector(item)
    const value = _elementSelector(item)
    dictionary.Add(key, value)
  }
  return dictionary
}

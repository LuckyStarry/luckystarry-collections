import { Dictionary } from '../dictionary'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import * as utils from '../utils'

export function toDictionary<TSource, TKey, TElement = TSource>(
  source: Iterable<TSource>,
  keySelector: (item: TSource) => TKey,
  elementSelector?: (item: TSource) => TElement,
  comparer?: IEqualityComparer<TKey>
): Dictionary<TKey, TElement> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('keySelector', keySelector)
  let _elementSelector: any = elementSelector || (x => x)
  comparer = comparer || EqualityComparer.Default()
  let dictionary = new Dictionary<TKey, TElement>(null, comparer)
  for (let item of source) {
    let key = keySelector(item)
    let value = _elementSelector(item)
    dictionary.Add(key, value)
  }
  return dictionary
}

import { Enumerable, IEnumerable } from '../enumerable'
import { EqualityComparer, IEqualityComparer } from '../equality-comparer'
import { Grouping, IGrouping } from '../grouping'
import * as utils from '../utils'
import * as assistance from './assistance'

export function groupBy<TSource, TKey, TElement = TSource>(
  source: Iterable<TSource>,
  keySelector: (item: TSource) => TKey,
  elementSelector?: (item: TSource) => TElement,
  comparer?: IEqualityComparer<TKey>
): IEnumerable<IGrouping<TKey, TElement>> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('keySelector', keySelector)
  const _elementSelector: any = elementSelector || ((x) => x)
  comparer = comparer || EqualityComparer.Default()
  return Enumerable.AsEnumerable(
    assistance
      .group<TSource, TKey, TElement>(source, keySelector, _elementSelector, (x, y) => comparer.Equals(x, y))
      .map((g) => new Grouping(g.Key, Enumerable.AsEnumerable(g.List)))
  )
}

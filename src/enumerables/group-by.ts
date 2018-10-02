import { IEnumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import { IGrouping, Grouping } from '../grouping'
import { EnumerableContainer } from './enumerable-container'
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
  let _elementSelector: any = elementSelector || (x => x)
  comparer = comparer || EqualityComparer.Default()
  return new EnumerableContainer(
    assistance
      .group<TSource, TKey, TElement>(
        source,
        keySelector,
        _elementSelector,
        (x, y) => comparer.Equals(x, y)
      )
      .map(g => new Grouping(g.Key, new EnumerableContainer(g.List)))
  )
}

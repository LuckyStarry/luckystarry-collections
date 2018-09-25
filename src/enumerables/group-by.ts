import { IEnumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import { IGrouping, Grouping } from '../grouping'
import { InternalEnumerable } from 'enumerables/internal-enumerable'
import * as utils from '../utils'
import * as assistance from './assistance'

export function groupBy<TSource, TKey, TElement = TSource>(
  source: IEnumerable<TSource>,
  keySelector: (item: TSource) => TKey,
  elementSelector: (item: TSource) => TElement,
  comparer?: IEqualityComparer<TKey>
): IEnumerable<IGrouping<TKey, TElement>> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('keySelector', keySelector)
  utils.throws.ThrowIfNull('elementSelector', elementSelector)
  comparer = comparer || EqualityComparer.Default()
  return new InternalEnumerable(
    assistance
      .group(source, keySelector, elementSelector, (x, y) =>
        comparer.Equal(x, y)
      )
      .map(g => new Grouping(g.Key, new InternalEnumerable(g.List)))
  )
}

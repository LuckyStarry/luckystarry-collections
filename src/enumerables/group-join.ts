import { IEnumerable, Enumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import { InternalEnumerable } from './internal-enumerable'
import { Grouping, IGrouping } from '../grouping'
import * as utils from '../utils'

export function groupJoin<TOuter, TInner, TKey, TResult>(
  outer: IEnumerable<TOuter>,
  inner: IEnumerable<TInner>,
  outerKeySelector: (item: TOuter) => TKey,
  innerKeySelector: (item: TInner) => TKey,
  resultSelector: (item: TOuter, inners: IEnumerable<TInner>) => TResult,
  comparer?: IEqualityComparer<TKey>
): IEnumerable<TResult> {
  utils.throws.ThrowIfNull('outer', outer)
  utils.throws.ThrowIfNull('inner', inner)
  utils.throws.ThrowIfNull('outerKeySelector', outerKeySelector)
  utils.throws.ThrowIfNull('innerKeySelector', innerKeySelector)
  utils.throws.ThrowIfNull('resultSelector', resultSelector)
  comparer = comparer || EqualityComparer.Default()
  let outerKeys = outer.Select(item => outerKeySelector(item)).ToList()
  let groupedInner = inner
    .Where(item => outerKeys.Contains(innerKeySelector(item), comparer))
    .GroupBy(item => innerKeySelector(item), g => g, comparer)
    .ToList()
  return new InternalEnumerable(
    join(outer, outerKeySelector, groupedInner, resultSelector, comparer)
  )
}

function* join<TOuter, TInner, TKey, TResult>(
  outer: IEnumerable<TOuter>,
  outerKeySelector: (item: TOuter) => TKey,
  groupedInner: IEnumerable<IGrouping<TKey, TInner>>,
  resultSelector: (item: TOuter, inners: IEnumerable<TInner>) => TResult,
  comparer?: IEqualityComparer<TKey>
) {
  for (let item of outer) {
    let key = outerKeySelector(item)
    let inners: IEnumerable<TInner> = groupedInner.FirstOrDefault(null, g =>
      comparer.Equal(g.Key, key)
    )
    if (!inners) {
      inners = Enumerable.Empty<TInner>()
    } else {
      inners = inners.ToList()
    }
    yield resultSelector(item, inners)
  }
}

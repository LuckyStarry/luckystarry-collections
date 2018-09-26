import { IEnumerable, Enumerable } from '../enumerable'
import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import { InternalEnumerable } from './internal-enumerable'
import { IGrouping } from '../grouping'
import * as utils from '../utils'

export function groupJoin<TOuter, TInner, TKey, TResult>(
  outer: Iterable<TOuter>,
  inner: Iterable<TInner>,
  outerKeySelector: (item: TOuter) => TKey,
  innerKeySelector: (item: TInner) => TKey,
  resultSelector: (item: TOuter, inners: Iterable<TInner>) => TResult,
  comparer?: IEqualityComparer<TKey>
): Iterable<TResult> {
  utils.throws.ThrowIfNull('outer', outer)
  utils.throws.ThrowIfNull('inner', inner)
  utils.throws.ThrowIfNull('outerKeySelector', outerKeySelector)
  utils.throws.ThrowIfNull('innerKeySelector', innerKeySelector)
  utils.throws.ThrowIfNull('resultSelector', resultSelector)
  comparer = comparer || EqualityComparer.Default()
  let outerKeys = Enumerable.AsEnumerable(outer)
    .Select(item => outerKeySelector(item))
    .ToList()
  let groupedInner = Enumerable.AsEnumerable(inner)
    .Where(item => outerKeys.Contains(innerKeySelector(item), comparer))
    .GroupBy(item => innerKeySelector(item), g => g, comparer)
    .ToList()
  return new InternalEnumerable(
    join(outer, outerKeySelector, groupedInner, resultSelector, comparer)
  )
}

function* join<TOuter, TInner, TKey, TResult>(
  outer: Iterable<TOuter>,
  outerKeySelector: (item: TOuter) => TKey,
  groupedInner: Iterable<IGrouping<TKey, TInner>>,
  resultSelector: (item: TOuter, inners: IEnumerable<TInner>) => TResult,
  comparer?: IEqualityComparer<TKey>
) {
  for (let item of outer) {
    let key = outerKeySelector(item)
    let inners: IEnumerable<TInner> = Enumerable.AsEnumerable(
      groupedInner
    ).FirstOrDefault(null, g => comparer.Equal(g.Key, key))
    if (!inners) {
      inners = Enumerable.Empty<TInner>()
    } else {
      inners = inners.ToList()
    }
    yield resultSelector(item, inners)
  }
}

import { Enumerable, IEnumerable } from '../enumerable'
import { EqualityComparer, IEqualityComparer } from '../equality-comparer'
import { IGrouping } from '../grouping'
import * as utils from '../utils'

export function groupJoin<TOuter, TInner, TKey, TResult = { Outer: TOuter; Inners: IEnumerable<TInner> }>(
  outer: Iterable<TOuter>,
  inner: Iterable<TInner>,
  outerKeySelector: (item: TOuter) => TKey,
  innerKeySelector: (item: TInner) => TKey,
  resultSelector?: (item: TOuter, inners: IEnumerable<TInner>) => TResult,
  comparer?: IEqualityComparer<TKey>
): IEnumerable<TResult> {
  utils.throws.ThrowIfNull('outer', outer)
  utils.throws.ThrowIfNull('inner', inner)
  utils.throws.ThrowIfNull('outerKeySelector', outerKeySelector)
  utils.throws.ThrowIfNull('innerKeySelector', innerKeySelector)
  const _resultSelector: any =
    resultSelector ||
    ((o, is) => {
      return { Outer: o, Inners: is }
    })
  comparer = comparer || EqualityComparer.Default()
  const outerKeys = Enumerable.ToList(Enumerable.Select(outer, (item) => outerKeySelector(item)))
  const groupedInner = Enumerable.ToList(
    Enumerable.GroupBy(
      Enumerable.Where(inner, (item) => Enumerable.Contains(outerKeys, innerKeySelector(item), comparer)),
      (item) => innerKeySelector(item),
      (g) => g,
      comparer
    )
  )
  return Enumerable.AsEnumerable(join<TOuter, TInner, TKey, TResult>(outer, outerKeySelector, groupedInner, _resultSelector, comparer))
}

function* join<TOuter, TInner, TKey, TResult>(
  outer: Iterable<TOuter>,
  outerKeySelector: (item: TOuter) => TKey,
  groupedInner: Iterable<IGrouping<TKey, TInner>>,
  resultSelector: (item: TOuter, inners: IEnumerable<TInner>) => TResult,
  comparer?: IEqualityComparer<TKey>
) {
  for (const item of outer) {
    const key = outerKeySelector(item)
    let inners: IEnumerable<TInner> = Enumerable.FirstOrDefault(groupedInner, null, (g) => comparer.Equals(g.Key, key))
    if (!inners) {
      inners = Enumerable.Empty<TInner>()
    } else {
      inners = Enumerable.ToList(inners)
    }
    yield resultSelector(item, inners)
  }
}

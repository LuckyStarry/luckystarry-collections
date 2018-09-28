import { Enumerable, IEnumerable } from './enumerable'
import { IEqualityComparer } from './equality-comparer'
import { IList } from './list'
import { IGrouping } from './grouping'

export abstract class EnumerableImpl<TSource> implements IEnumerable<TSource> {
  public abstract [Symbol.iterator](): IterableIterator<TSource>

  public All(predicate: (item: TSource) => boolean): boolean {
    return Enumerable.All(this, predicate)
  }

  public Any(predicate?: (item: TSource) => boolean): boolean {
    return Enumerable.Any(this, predicate)
  }

  public AsEnumerable(): IEnumerable<TSource> {
    return Enumerable.AsEnumerable(this)
  }

  public Average(selector?: (item: TSource) => number): number | null {
    return Enumerable.Average(this, selector)
  }

  public Concat(second: IEnumerable<TSource>): IEnumerable<TSource> {
    return Enumerable.Concat(this, second)
  }

  public Contains(
    value: TSource,
    comparer?: IEqualityComparer<TSource>
  ): boolean {
    return Enumerable.Contains(this, value, comparer)
  }

  public Count(predicate?: (item: TSource) => boolean): number {
    return Enumerable.Count(this, predicate)
  }

  public DefaultIfEmpty(
    defaultValue?: IEnumerable<TSource>
  ): IEnumerable<TSource> {
    return Enumerable.DefaultIfEmpty(this, defaultValue)
  }

  public Distinct(comparer?: IEqualityComparer<TSource>): IEnumerable<TSource> {
    return Enumerable.Distinct(this, comparer)
  }

  public ElementAt(index: number): TSource {
    return Enumerable.ElementAt(this, index)
  }

  public ElementAtOrDefault(defaultValue: TSource, index: number): TSource {
    return Enumerable.ElementAtOrDefault(this, defaultValue, index)
  }

  public Except(
    second: IEnumerable<TSource>,
    comparer?: IEqualityComparer<TSource>
  ): IEnumerable<TSource> {
    return Enumerable.Except(this, second, comparer)
  }

  public First(predicate?: (item: TSource) => boolean): TSource {
    return Enumerable.First(this, predicate)
  }

  public FirstOrDefault(
    defaultValue: TSource,
    predicate?: (item: TSource) => boolean
  ): TSource {
    return Enumerable.FirstOrDefault(this, defaultValue, predicate)
  }

  public GroupBy<TKey, TElement = TSource>(
    keySelector: (item: TSource) => TKey,
    elementSelector: (item: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>> {
    return Enumerable.GroupBy(this, keySelector, elementSelector, comparer)
  }

  public GroupJoin<TInner, TKey, TResult>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TSource) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector: (item: TSource, inners: IEnumerable<TInner>) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult> {
    return Enumerable.GroupJoin(
      this,
      inner,
      outerKeySelector,
      innerKeySelector,
      resultSelector,
      comparer
    )
  }

  public Intersect(
    second: IEnumerable<TSource>,
    comparer?: IEqualityComparer<TSource>
  ): IEnumerable<TSource> {
    return Enumerable.Intersect(this, second, comparer)
  }

  public Join<TInner, TKey, TResult>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TSource) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector: (item: TSource, inners: TInner) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult> {
    return Enumerable.Join(
      this,
      inner,
      outerKeySelector,
      innerKeySelector,
      resultSelector,
      comparer
    )
  }

  public Select<TResult>(
    selector: (item: TSource, index?: number) => TResult
  ): IEnumerable<TResult> {
    return Enumerable.Select(this, selector)
  }

  public ToList(): IList<TSource> {
    return Enumerable.ToList(this)
  }

  public Where(
    predicate: (item: TSource, index?: number) => boolean
  ): IEnumerable<TSource> {
    return Enumerable.Where(this, predicate)
  }
}

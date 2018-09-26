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

  public Contains(
    value: TSource,
    comparer?: IEqualityComparer<TSource>
  ): boolean {
    return Enumerable.Contains(this, value, comparer)
  }

  public Count(predicate?: (item: TSource) => boolean): number {
    return Enumerable.Count(this, predicate)
  }

  public ElementAt(index: number): TSource {
    return Enumerable.ElementAt(this, index)
  }

  public GroupBy<TKey, TElement = TSource>(
    keySelector: (item: TSource) => TKey,
    elementSelector: (item: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>> {
    return Enumerable.GroupBy(this, keySelector, elementSelector, comparer)
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

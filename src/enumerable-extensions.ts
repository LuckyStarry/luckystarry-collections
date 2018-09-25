import { Enumerable, IEnumerable } from './enumerable'
import { IEqualityComparer } from './equality-comparer'
import { IList } from './list'
import { IGrouping } from './grouping'

export interface IEnumerableExtensions<T> {
  Contains(value: T, comparer?: IEqualityComparer<T>): boolean
  Count(predicate?: (item: T) => boolean): number
  GroupBy<TKey, TElement = T>(
    keySelector: (item: T) => TKey,
    elementSelector: (item: T) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>>
  First(predicate?: (item: T) => boolean): T
  FirstOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T
  Select<TResult>(
    selector: (item: T, index?: number) => TResult
  ): IEnumerable<TResult>
  ToList(): IList<T>
  Where(predicate: (item: T, index?: number) => boolean): IEnumerable<T>
}

export abstract class EnumerableExtensions<T>
  implements IEnumerableExtensions<T> {
  public abstract [Symbol.iterator](): IterableIterator<T>

  public Contains(value: T, comparer?: IEqualityComparer<T>): boolean {
    return Enumerable.Contains(this, value, comparer)
  }

  public Count(predicate?: (item: T) => boolean): number {
    return Enumerable.Count(this, predicate)
  }

  public GroupBy<TKey, TElement = T>(
    keySelector: (item: T) => TKey,
    elementSelector: (item: T) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>> {
    return Enumerable.GroupBy(this, keySelector, elementSelector, comparer)
  }

  public First(predicate?: (item: T) => boolean): T {
    return Enumerable.First(this, predicate)
  }

  public FirstOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T {
    return Enumerable.FirstOrDefault(this, defaultValue, predicate)
  }

  public Select<TResult>(
    selector: (item: T, index?: number) => TResult
  ): IEnumerable<TResult> {
    return Enumerable.Select(this, selector)
  }

  public ToList(): IList<T> {
    return Enumerable.ToList(this)
  }

  public Where(
    predicate: (item: T, index?: number) => boolean
  ): IEnumerable<T> {
    return Enumerable.Where(this, predicate)
  }
}

import * as enumerables from './enumerables'
import { IEqualityComparer } from './equality-comparer'
import { IGrouping } from './grouping'
import { IList } from './list'

export interface IEnumerable<TSource> {
  [Symbol.iterator](): IterableIterator<TSource>

  All(predicate: (item: TSource) => boolean): boolean
  Any(predicate?: (item: TSource) => boolean): boolean
  Contains(value: TSource, comparer?: IEqualityComparer<TSource>): boolean
  Count(predicate?: (item: TSource) => boolean): number
  ElementAt(index: number): TSource
  GroupBy<TKey, TElement = TSource>(
    keySelector: (item: TSource) => TKey,
    elementSelector: (item: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>>
  First(predicate?: (item: TSource) => boolean): TSource
  FirstOrDefault(
    defaultValue: TSource,
    predicate?: (item: TSource) => boolean
  ): TSource
  Select<TResult>(
    selector: (item: TSource, index?: number) => TResult
  ): IEnumerable<TResult>
  ToList(): IList<TSource>
  Where(
    predicate: (item: TSource, index?: number) => boolean
  ): IEnumerable<TSource>
}

export class Enumerable {
  public static All = enumerables.all
  public static Any = enumerables.any
  public static Average = enumerables.average
  public static Concat = enumerables.concat
  public static Contains = enumerables.contains
  public static Count = enumerables.count
  public static DefaultIfEmpty = enumerables.defaultIfEmpty
  public static Distinct = enumerables.distinct
  public static ElementAt = enumerables.elementAt
  public static ElementAtOrDefault = enumerables.elementAtOrDefault
  public static Empty = enumerables.empty
  public static Except = enumerables.except
  public static First = enumerables.first
  public static FirstOrDefault = enumerables.firstOrDefault
  public static GroupBy = enumerables.groupBy
  public static GroupJoin = enumerables.groupJoin
  public static Select = enumerables.select
  public static Sum = enumerables.sum
  public static ToList = enumerables.toList
  public static Where = enumerables.where
  public static AsEnumerable = enumerables.asEnumerable
}

import * as enumerables from './enumerables'
import { IEqualityComparer } from './equality-comparer'
import { IGrouping } from './grouping'
import { IList } from './list'

export interface IEnumerable<TSource> extends Iterable<TSource> {
  [Symbol.iterator](): IterableIterator<TSource>

  All(predicate: (item: TSource) => boolean): boolean
  Any(predicate?: (item: TSource) => boolean): boolean
  AsEnumerable(): IEnumerable<TSource>
  Average(selector?: (item: TSource) => number): number | null
  Concat(second: IEnumerable<TSource>): IEnumerable<TSource>
  Contains(value: TSource, comparer?: IEqualityComparer<TSource>): boolean
  Count(predicate?: (item: TSource) => boolean): number
  DefaultIfEmpty(defaultValue?: IEnumerable<TSource>): IEnumerable<TSource>
  Distinct(comparer?: IEqualityComparer<TSource>): IEnumerable<TSource>
  ElementAt(index: number): TSource
  ElementAtOrDefault(defaultValue: TSource, index: number): TSource
  Except(
    second: IEnumerable<TSource>,
    comparer?: IEqualityComparer<TSource>
  ): IEnumerable<TSource>
  First(predicate?: (item: TSource) => boolean): TSource
  FirstOrDefault(
    defaultValue: TSource,
    predicate?: (item: TSource) => boolean
  ): TSource
  GroupBy<TKey, TElement = TSource>(
    keySelector: (item: TSource) => TKey,
    elementSelector: (item: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>>
  GroupJoin<TInner, TKey, TResult>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TSource) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector: (item: TSource, inners: IEnumerable<TInner>) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult>
  Intersect(
    second: IEnumerable<TSource>,
    comparer?: IEqualityComparer<TSource>
  ): IEnumerable<TSource>
  Join<TInner, TKey, TResult>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TSource) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector: (item: TSource, inners: TInner) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult>
  Select<TResult>(
    selector: (item: TSource, index?: number) => TResult
  ): IEnumerable<TResult>
  ToList(): IList<TSource>
  Where(
    predicate: (item: TSource, index?: number) => boolean
  ): IEnumerable<TSource>
}

export class Enumerable {
  public static AsEnumerable = enumerables.asEnumerable
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
  public static Intersect = enumerables.intersect
  public static Join = enumerables.join
  public static Select = enumerables.select
  public static Sum = enumerables.sum
  public static ToList = enumerables.toList
  public static Where = enumerables.where
}

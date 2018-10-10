import './array'
import * as enumerables from './enumerables'
import { IEqualityComparer } from './equality-comparer'
import { IGrouping } from './grouping'
import { List } from './list'
import { Dictionary } from './dictionary'

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
    elementSelector?: (item: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>>
  GroupJoin<
    TInner,
    TKey,
    TResult = { Outer: TSource; Inners: IEnumerable<TInner> }
  >(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TSource) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector?: (item: TSource, inners: IEnumerable<TInner>) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult>
  Intersect(
    second: IEnumerable<TSource>,
    comparer?: IEqualityComparer<TSource>
  ): IEnumerable<TSource>
  Join<TInner, TKey, TResult = { Outer: TSource; Inner: TInner }>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TSource) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector?: (item: TSource, inners: TInner) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult>
  Last(predicate?: (item: TSource) => boolean): TSource
  LastOrDefault(
    defaultValue: TSource,
    predicate?: (item: TSource) => boolean
  ): TSource
  Max(selector?: (item: TSource) => number): number | null
  Min(selector?: (item: TSource) => number): number | null
  Reverse(): IEnumerable<TSource>
  Select<TResult>(
    selector: (item: TSource, index?: number) => TResult
  ): IEnumerable<TResult>
  SelectMany<TCollection, TResult = TCollection>(
    collectionSelector: (
      item: TSource,
      index?: number
    ) => IEnumerable<TCollection>,
    resultSelector?: (item: TSource, collection: TCollection) => TResult
  ): IEnumerable<TResult>
  SequenceEqual(
    second: Iterable<TSource>,
    comparer?: IEqualityComparer<TSource>
  ): boolean
  Single(predicate?: (item: TSource) => boolean): TSource
  SingleOrDefault(
    defaultValue: TSource,
    predicate?: (item: TSource) => boolean
  ): TSource
  Skip(count: number): IEnumerable<TSource>
  SkipWhile(
    predicate: (item: TSource, index?: number) => boolean
  ): IEnumerable<TSource>
  Sum(selector?: (item: TSource) => number): number | null
  Take(count: number): IEnumerable<TSource>
  TakeWhile(
    predicate: (item: TSource, index?: number) => boolean
  ): IEnumerable<TSource>
  ToArray(): Array<TSource>
  ToDictionary<TKey, TElement = TSource>(
    keySelector: (item: TSource) => TKey,
    elementSelector?: (item: TSource) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): Dictionary<TKey, TElement>
  ToList(): List<TSource>
  Union(
    second: Iterable<TSource>,
    comparer?: IEqualityComparer<TSource>
  ): IEnumerable<TSource>
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
  public static Last = enumerables.last
  public static LastOrDefault = enumerables.lastOrDefault
  public static Max = enumerables.max
  public static Min = enumerables.min
  public static Reverse = enumerables.reverse
  public static Select = enumerables.select
  public static SelectMany = enumerables.selectMany
  public static SequenceEqual = enumerables.sequenceEqual
  public static Single = enumerables.single
  public static SingleOrDefault = enumerables.singleOrDefault
  public static Skip = enumerables.skip
  public static SkipWhile = enumerables.skipWhile
  public static Sum = enumerables.sum
  public static Take = enumerables.take
  public static TakeWhile = enumerables.takeWhile
  public static ToArray = enumerables.toArray
  public static ToDictionary = enumerables.toDictionary
  public static ToList = enumerables.toList
  public static Union = enumerables.union
  public static Where = enumerables.where
}

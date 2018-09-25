import { IEnumerableExtensions } from './enumerable-extensions'
import * as enumerables from './enumerables'

export interface IEnumerable<TSource> extends IEnumerableExtensions<TSource> {
  [Symbol.iterator](): IterableIterator<TSource>
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
}

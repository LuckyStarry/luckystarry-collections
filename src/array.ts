import { Enumerable, IEnumerable } from './enumerable'
import { IEqualityComparer } from './equality-comparer'
import { IGrouping } from './grouping'
import { Dictionary } from './dictionary'
import { List } from './list'

Array.prototype.All = function<T>(predicate: (item: T) => boolean): boolean {
  return Enumerable.All(this, predicate)
}

Array.prototype.Any = function<T>(predicate?: (item: T) => boolean): boolean {
  return Enumerable.Any(this, predicate)
}

Array.prototype.AsEnumerable = function<T>(): IEnumerable<T> {
  return Enumerable.AsEnumerable(this)
}

Array.prototype.Average = function<T>(
  selector?: (item: T) => number
): number | null {
  return Enumerable.Average(this, selector)
}

Array.prototype.Concat = function<T>(second: IEnumerable<T>): IEnumerable<T> {
  return Enumerable.Concat(this, second)
}

Array.prototype.Contains = function<T>(
  value: T,
  comparer?: IEqualityComparer<T>
): boolean {
  return Enumerable.Contains(this, value, comparer)
}

Array.prototype.Count = function<T>(predicate?: (item: T) => boolean): number {
  return Enumerable.Count(this, predicate)
}

Array.prototype.DefaultIfEmpty = function<T>(
  defaultValue?: IEnumerable<T>
): IEnumerable<T> {
  return Enumerable.DefaultIfEmpty(this, defaultValue)
}

Array.prototype.Distinct = function<T>(
  comparer?: IEqualityComparer<T>
): IEnumerable<T> {
  return Enumerable.Distinct(this, comparer)
}

Array.prototype.ElementAt = function<T>(index: number): T {
  return Enumerable.ElementAt(this, index)
}

Array.prototype.ElementAtOrDefault = function<T>(
  defaultValue: T,
  index: number
): T {
  return Enumerable.ElementAtOrDefault(this, defaultValue, index)
}

Array.prototype.Except = function<T>(
  second: IEnumerable<T>,
  comparer?: IEqualityComparer<T>
): IEnumerable<T> {
  return Enumerable.Except(this, second, comparer)
}

Array.prototype.First = function<T>(predicate?: (item: T) => boolean): T {
  return Enumerable.First(this, predicate)
}

Array.prototype.FirstOrDefault = function<T>(
  defaultValue: T,
  predicate?: (item: T) => boolean
): T {
  return Enumerable.FirstOrDefault(this, defaultValue, predicate)
}

Array.prototype.GroupBy = function<T, TKey, TElement = T>(
  keySelector: (item: T) => TKey,
  elementSelector?: (item: T) => TElement,
  comparer?: IEqualityComparer<TKey>
): IEnumerable<IGrouping<TKey, TElement>> {
  return Enumerable.GroupBy(this, keySelector, elementSelector, comparer)
}

Array.prototype.GroupJoin = function<
  T,
  TInner,
  TKey,
  TResult = { Outer: T; Inners: IEnumerable<TInner> }
>(
  inner: IEnumerable<TInner>,
  outerKeySelector: (item: T) => TKey,
  innerKeySelector: (item: TInner) => TKey,
  resultSelector?: (item: T, inners: IEnumerable<TInner>) => TResult,
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

Array.prototype.Intersect = function<T>(
  second: IEnumerable<T>,
  comparer?: IEqualityComparer<T>
): IEnumerable<T> {
  return Enumerable.Intersect(this, second, comparer)
}

Array.prototype.Join = function<
  T,
  TInner,
  TKey,
  TResult = { Outer: T; Inner: TInner }
>(
  inner: IEnumerable<TInner>,
  outerKeySelector: (item: T) => TKey,
  innerKeySelector: (item: TInner) => TKey,
  resultSelector?: (item: T, inners: TInner) => TResult,
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

Array.prototype.Last = function<T>(predicate?: (item: T) => boolean): T {
  return Enumerable.Last(this, predicate)
}

Array.prototype.LastOrDefault = function<T>(
  defaultValue: T,
  predicate?: (item: T) => boolean
): T {
  return Enumerable.LastOrDefault(this, defaultValue, predicate)
}

Array.prototype.Max = function<T>(
  selector?: (item: T) => number
): number | null {
  return Enumerable.Max(this, selector)
}

Array.prototype.Min = function<T>(
  selector?: (item: T) => number
): number | null {
  return Enumerable.Min(this, selector)
}

Array.prototype.Reverse = function<T>(): IEnumerable<T> {
  return Enumerable.Reverse(this)
}

Array.prototype.Select = function<T, TResult>(
  selector: (item: T, index?: number) => TResult
): IEnumerable<TResult> {
  return Enumerable.Select(this, selector)
}

Array.prototype.SelectMany = function<T, TCollection, TResult = TCollection>(
  collectionSelector: (item: T, index?: number) => IEnumerable<TCollection>,
  resultSelector?: (item: T, collection: TCollection) => TResult
): IEnumerable<TResult> {
  return Enumerable.SelectMany(this, collectionSelector, resultSelector)
}

Array.prototype.SequenceEqual = function<T>(
  second: Iterable<T>,
  comparer?: IEqualityComparer<T>
): boolean {
  return Enumerable.SequenceEqual(this, second, comparer)
}

Array.prototype.Single = function<T>(predicate?: (item: T) => boolean): T {
  return Enumerable.Single(this, predicate)
}

Array.prototype.SingleOrDefault = function<T>(
  defaultValue: T,
  predicate?: (item: T) => boolean
): T {
  return Enumerable.SingleOrDefault(this, defaultValue, predicate)
}

Array.prototype.Skip = function<T>(count: number): IEnumerable<T> {
  return Enumerable.Skip(this, count)
}

Array.prototype.SkipWhile = function<T>(
  predicate: (item: T, index?: number) => boolean
): IEnumerable<T> {
  return Enumerable.SkipWhile(this, predicate)
}

Array.prototype.Sum = function<T>(
  selector?: (item: T) => number
): number | null {
  return Enumerable.Sum(this, selector)
}

Array.prototype.Take = function<T>(count: number): IEnumerable<T> {
  return Enumerable.Take(this, count)
}

Array.prototype.TakeWhile = function<T>(
  predicate: (item: T, index?: number) => boolean
): IEnumerable<T> {
  return Enumerable.TakeWhile(this, predicate)
}

Array.prototype.ToArray = function<T>(): Array<T> {
  return Enumerable.ToArray(this)
}

Array.prototype.ToDictionary = function<T, TKey, TElement = T>(
  keySelector: (item: T) => TKey,
  elementSelector?: (item: T) => TElement,
  comparer?: IEqualityComparer<TKey>
): Dictionary<TKey, TElement> {
  return Enumerable.ToDictionary(this, keySelector, elementSelector, comparer)
}

Array.prototype.ToList = function<T>(): List<T> {
  return Enumerable.ToList(this)
}

Array.prototype.Union = function<T>(
  second: Iterable<T>,
  comparer?: IEqualityComparer<T>
): IEnumerable<T> {
  return Enumerable.Union(this, second, comparer)
}

Array.prototype.Where = function<T>(
  predicate: (item: T, index?: number) => boolean
): IEnumerable<T> {
  return Enumerable.Where(this, predicate)
}

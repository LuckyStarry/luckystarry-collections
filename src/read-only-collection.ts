import { Dictionary } from './dictionary'
import { Enumerable, IEnumerable } from './enumerable'
import { IEqualityComparer } from './equality-comparer'
import { InvalidOperationException } from './exceptions'
import { IGrouping } from './grouping'
import { IList, List } from './list'
import { throws } from './utils'

export interface IReadOnlyCollection<T> extends IEnumerable<T> {}

export class ReadOnlyCollection<T> implements IReadOnlyCollection<T>, IList<T> {
  private list: IList<T>

  public constructor(list: IList<T>) {
    throws.ThrowIfNull('list', list)
    this.list = list
  }

  public get Length(): number {
    return this.list.Length
  }

  public get IsReadOnly(): boolean {
    return true
  }

  public Set(index: number, item: T): void {
    throw new InvalidOperationException('不可向只读列表中写入数据')
  }

  public Get(index: number): T {
    return this.list.Get(index)
  }

  public Add(item: T): void {
    throw new InvalidOperationException('不可向只读列表中写入数据')
  }

  public Clear(): void {
    throw new InvalidOperationException('不可清空只读列表')
  }

  public CopyTo(array: T[], arrayIndex: number): void {
    this.list.CopyTo(array, arrayIndex)
  }

  public IndexOf(item: T): number {
    return this.list.IndexOf(item)
  }

  public Insert(index: number, item: T): void {
    throw new InvalidOperationException('不可向只读列表中写入数据')
  }

  public Remove(item: T): boolean {
    throw new InvalidOperationException('不可从只读列表中删除数据')
  }

  public RemoveAt(index: number): void {
    throw new InvalidOperationException('不可从只读列表中删除数据')
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.list[Symbol.iterator]()
  }

  public All(predicate: (item: T) => boolean): boolean {
    return Enumerable.All(this, predicate)
  }

  public Any(predicate?: (item: T) => boolean): boolean {
    return Enumerable.Any(this, predicate)
  }

  public AsEnumerable(): IEnumerable<T> {
    return Enumerable.AsEnumerable(this)
  }

  public Average(selector?: (item: T) => number): number | null {
    return Enumerable.Average(this, selector)
  }

  public Concat(second: IEnumerable<T>): IEnumerable<T> {
    return Enumerable.Concat(this, second)
  }

  public Contains(value: T, comparer?: IEqualityComparer<T>): boolean {
    return Enumerable.Contains(this, value, comparer)
  }

  public Count(predicate?: (item: T) => boolean): number {
    return Enumerable.Count(this, predicate)
  }

  public DefaultIfEmpty(defaultValue?: IEnumerable<T>): IEnumerable<T> {
    return Enumerable.DefaultIfEmpty(this, defaultValue)
  }

  public Distinct(comparer?: IEqualityComparer<T>): IEnumerable<T> {
    return Enumerable.Distinct(this, comparer)
  }

  public ElementAt(index: number): T {
    return Enumerable.ElementAt(this, index)
  }

  public ElementAtOrDefault(defaultValue: T, index: number): T {
    return Enumerable.ElementAtOrDefault(this, defaultValue, index)
  }

  public Except(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
    return Enumerable.Except(this, second, comparer)
  }

  public First(predicate?: (item: T) => boolean): T {
    return Enumerable.First(this, predicate)
  }

  public FirstOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T {
    return Enumerable.FirstOrDefault(this, defaultValue, predicate)
  }

  public GroupBy<TKey, TElement = T>(
    keySelector: (item: T) => TKey,
    elementSelector?: (item: T) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TElement>> {
    return Enumerable.GroupBy(this, keySelector, elementSelector, comparer)
  }

  public GroupJoin<TInner, TKey, TResult = { Outer: T; Inners: IEnumerable<TInner> }>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: T) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector?: (item: T, inners: IEnumerable<TInner>) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult> {
    return Enumerable.GroupJoin(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer)
  }

  public Intersect(second: IEnumerable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
    return Enumerable.Intersect(this, second, comparer)
  }

  public Join<TInner, TKey, TResult = { Outer: T; Inner: TInner }>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: T) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector?: (item: T, inners: TInner) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult> {
    return Enumerable.Join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer)
  }

  public Last(predicate?: (item: T) => boolean): T {
    return Enumerable.Last(this, predicate)
  }

  public LastOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T {
    return Enumerable.LastOrDefault(this, defaultValue, predicate)
  }

  public Max(selector?: (item: T) => number): number | null {
    return Enumerable.Max(this, selector)
  }

  public Min(selector?: (item: T) => number): number | null {
    return Enumerable.Min(this, selector)
  }

  public Reverse(): IEnumerable<T> {
    return Enumerable.Reverse(this)
  }

  public Select<TResult>(selector: (item: T, index?: number) => TResult): IEnumerable<TResult> {
    return Enumerable.Select(this, selector)
  }

  public SelectMany<TCollection, TResult = TCollection>(
    collectionSelector: (item: T, index?: number) => IEnumerable<TCollection>,
    resultSelector?: (item: T, collection: TCollection) => TResult
  ): IEnumerable<TResult> {
    return Enumerable.SelectMany(this, collectionSelector, resultSelector)
  }

  public SequenceEqual(second: Iterable<T>, comparer?: IEqualityComparer<T>): boolean {
    return Enumerable.SequenceEqual(this, second, comparer)
  }

  public Single(predicate?: (item: T) => boolean): T {
    return Enumerable.Single(this, predicate)
  }

  public SingleOrDefault(defaultValue: T, predicate?: (item: T) => boolean): T {
    return Enumerable.SingleOrDefault(this, defaultValue, predicate)
  }

  public Skip(count: number): IEnumerable<T> {
    return Enumerable.Skip(this, count)
  }

  public SkipWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T> {
    return Enumerable.SkipWhile(this, predicate)
  }

  public Sum(selector?: (item: T) => number): number | null {
    return Enumerable.Sum(this, selector)
  }

  public Take(count: number): IEnumerable<T> {
    return Enumerable.Take(this, count)
  }

  public TakeWhile(predicate: (item: T, index?: number) => boolean): IEnumerable<T> {
    return Enumerable.TakeWhile(this, predicate)
  }

  public ToArray(): Array<T> {
    return Enumerable.ToArray(this)
  }

  public ToDictionary<TKey, TElement = T>(
    keySelector: (item: T) => TKey,
    elementSelector?: (item: T) => TElement,
    comparer?: IEqualityComparer<TKey>
  ): Dictionary<TKey, TElement> {
    return Enumerable.ToDictionary(this, keySelector, elementSelector, comparer)
  }

  public ToList(): List<T> {
    return Enumerable.ToList(this)
  }

  public Union(second: Iterable<T>, comparer?: IEqualityComparer<T>): IEnumerable<T> {
    return Enumerable.Union(this, second, comparer)
  }

  public Where(predicate: (item: T, index?: number) => boolean): IEnumerable<T> {
    return Enumerable.Where(this, predicate)
  }
}

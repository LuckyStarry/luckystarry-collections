import { Dictionary } from './dictionary'
import { Enumerable, IEnumerable } from './enumerable'
import { IEqualityComparer } from './equality-comparer'
import { List } from './list'

export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
  readonly Key: TKey
  readonly Items: IEnumerable<TElement>
}

export class Grouping<TKey, TElement> implements IGrouping<TKey, TElement> {
  private key: TKey
  private source: IEnumerable<TElement>

  public constructor(key: TKey, source: IEnumerable<TElement>) {
    this.key = key
    this.source = source
  }

  public get Key(): TKey {
    return this.key
  }

  public get Items(): IEnumerable<TElement> {
    return this.source
  }

  public [Symbol.iterator](): IterableIterator<TElement> {
    return this.source[Symbol.iterator]()
  }

  public All(predicate: (item: TElement) => boolean): boolean {
    return Enumerable.All(this, predicate)
  }

  public Any(predicate?: (item: TElement) => boolean): boolean {
    return Enumerable.Any(this, predicate)
  }

  public AsEnumerable(): IEnumerable<TElement> {
    return Enumerable.AsEnumerable(this.source)
  }

  public Average(selector?: (item: TElement) => number): number | null {
    return Enumerable.Average(this, selector)
  }

  public Concat(second: IEnumerable<TElement>): IEnumerable<TElement> {
    return Enumerable.Concat(this, second)
  }

  public Contains(value: TElement, comparer?: IEqualityComparer<TElement>): boolean {
    return Enumerable.Contains(this, value, comparer)
  }

  public Count(predicate?: (item: TElement) => boolean): number {
    return Enumerable.Count(this, predicate)
  }

  public DefaultIfEmpty(defaultValue?: IEnumerable<TElement>): IEnumerable<TElement> {
    return Enumerable.DefaultIfEmpty(this, defaultValue)
  }

  public Distinct(comparer?: IEqualityComparer<TElement>): IEnumerable<TElement> {
    return Enumerable.Distinct(this, comparer)
  }

  public ElementAt(index: number): TElement {
    return Enumerable.ElementAt(this, index)
  }

  public ElementAtOrDefault(defaultValue: TElement, index: number): TElement {
    return Enumerable.ElementAtOrDefault(this, defaultValue, index)
  }

  public Except(second: IEnumerable<TElement>, comparer?: IEqualityComparer<TElement>): IEnumerable<TElement> {
    return Enumerable.Except(this, second, comparer)
  }

  public First(predicate?: (item: TElement) => boolean): TElement {
    return Enumerable.First(this, predicate)
  }

  public FirstOrDefault(defaultValue: TElement, predicate?: (item: TElement) => boolean): TElement {
    return Enumerable.FirstOrDefault(this, defaultValue, predicate)
  }

  public GroupBy<TKey, TGroupElement = TElement>(
    keySelector: (item: TElement) => TKey,
    elementSelector?: (item: TElement) => TGroupElement,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<IGrouping<TKey, TGroupElement>> {
    return Enumerable.GroupBy(this, keySelector, elementSelector, comparer)
  }

  public GroupJoin<TInner, TKey, TResult = { Outer: TElement; Inners: IEnumerable<TInner> }>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TElement) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector?: (item: TElement, inners: IEnumerable<TInner>) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult> {
    return Enumerable.GroupJoin(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer)
  }

  public Intersect(second: IEnumerable<TElement>, comparer?: IEqualityComparer<TElement>): IEnumerable<TElement> {
    return Enumerable.Intersect(this, second, comparer)
  }

  public Join<TInner, TKey, TResult = { Outer: TElement; Inner: TInner }>(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: TElement) => TKey,
    innerKeySelector: (item: TInner) => TKey,
    resultSelector?: (item: TElement, inners: TInner) => TResult,
    comparer?: IEqualityComparer<TKey>
  ): IEnumerable<TResult> {
    return Enumerable.Join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer)
  }

  public Last(predicate?: (item: TElement) => boolean): TElement {
    return Enumerable.Last(this, predicate)
  }

  public LastOrDefault(defaultValue: TElement, predicate?: (item: TElement) => boolean): TElement {
    return Enumerable.LastOrDefault(this, defaultValue, predicate)
  }

  public Max(selector?: (item: TElement) => number): number | null {
    return Enumerable.Max(this, selector)
  }

  public Min(selector?: (item: TElement) => number): number | null {
    return Enumerable.Min(this, selector)
  }

  public Reverse(): IEnumerable<TElement> {
    return Enumerable.Reverse(this)
  }

  public Select<TResult>(selector: (item: TElement, index?: number) => TResult): IEnumerable<TResult> {
    return Enumerable.Select(this, selector)
  }

  public SelectMany<TCollection, TResult = TCollection>(
    collectionSelector: (item: TElement, index?: number) => IEnumerable<TCollection>,
    resultSelector?: (item: TElement, collection: TCollection) => TResult
  ): IEnumerable<TResult> {
    return Enumerable.SelectMany(this, collectionSelector, resultSelector)
  }

  public SequenceEqual(second: Iterable<TElement>, comparer?: IEqualityComparer<TElement>): boolean {
    return Enumerable.SequenceEqual(this, second, comparer)
  }

  public Single(predicate?: (item: TElement) => boolean): TElement {
    return Enumerable.Single(this, predicate)
  }

  public SingleOrDefault(defaultValue: TElement, predicate?: (item: TElement) => boolean): TElement {
    return Enumerable.SingleOrDefault(this, defaultValue, predicate)
  }

  public Skip(count: number): IEnumerable<TElement> {
    return Enumerable.Skip(this, count)
  }

  public SkipWhile(predicate: (item: TElement, index?: number) => boolean): IEnumerable<TElement> {
    return Enumerable.SkipWhile(this, predicate)
  }

  public Sum(selector?: (item: TElement) => number): number | null {
    return Enumerable.Sum(this, selector)
  }

  public Take(count: number): IEnumerable<TElement> {
    return Enumerable.Take(this, count)
  }

  public TakeWhile(predicate: (item: TElement, index?: number) => boolean): IEnumerable<TElement> {
    return Enumerable.TakeWhile(this, predicate)
  }

  public ToArray(): Array<TElement> {
    return Enumerable.ToArray(this)
  }

  public ToDictionary<TKey, TDictionaryElement = TElement>(
    keySelector: (item: TElement) => TKey,
    elementSelector?: (item: TElement) => TDictionaryElement,
    comparer?: IEqualityComparer<TKey>
  ): Dictionary<TKey, TDictionaryElement> {
    return Enumerable.ToDictionary(this, keySelector, elementSelector, comparer)
  }

  public ToList(): List<TElement> {
    return Enumerable.ToList(this)
  }

  public Union(second: Iterable<TElement>, comparer?: IEqualityComparer<TElement>): IEnumerable<TElement> {
    return Enumerable.Union(this, second, comparer)
  }

  public Where(predicate: (item: TElement, index?: number) => boolean): IEnumerable<TElement> {
    return Enumerable.Where(this, predicate)
  }
}

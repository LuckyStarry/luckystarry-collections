import { IEnumerable, Enumerable } from './enumerable'
import { IEqualityComparer, EqualityComparer } from './equality-comparer'
import {
  ArgumentException,
  KeyNotFoundException,
  ArgumentOutOfRangeException
} from './exceptions'
import { KeyValuePair } from './key-value-pair'
import { IGrouping } from './grouping'
import { IList } from './list'
import * as utils from './utils'

export interface IDictionary<TKey, TValue>
  extends IEnumerable<KeyValuePair<TKey, TValue>> {
  Add(key: TKey, value: TValue): void
  Clear(): void
  Set(key: TKey, value: TValue): void
  Get(key: TKey): TValue

  ContainsKey(key: TKey): boolean
  Remove(key: TKey): boolean
  TryGetValue(key: TKey): [boolean, TValue]
}

export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue> {
  private freeList: number = -1
  private freeCount: number = 0
  private version: number = 0
  private count: number = 0
  private buckets: number[]
  private entries: Entry<TKey, TValue>[]
  private comparer: IEqualityComparer<TKey>

  public constructor(
    dictionary?:
      | Iterable<KeyValuePair<TKey, TValue>>
      | Iterable<[TKey, TValue]>
      | number,
    comparer?: IEqualityComparer<TKey>
  ) {
    this.comparer = comparer || EqualityComparer.Default()
    if (dictionary) {
      if (typeof dictionary === 'number') {
        let capacity = dictionary
        if (capacity < 0) {
          throw new ArgumentOutOfRangeException(
            'capacity',
            capacity,
            'capacity 小于 0'
          )
        }
        this.Initialize(capacity)
      } else {
        for (let item of dictionary) {
          if (item instanceof KeyValuePair) {
            this.Set(item.Key, item.Value)
          } else {
            this.Set(item[0], item[1])
          }
        }
      }
    }
  }

  private Initialize(capacity: number): number {
    let size = HashHelpers.GetPrime(capacity)

    let buckets = new Array<number>(size)
    let entries = new Array<Entry<TKey, TValue>>(size)
    for (let i = 0; i < size; i++) {
      buckets[i] = -1
      entries[i] = new Entry()
    }
    this.buckets = buckets
    this.entries = entries
    this.freeList = -1

    return size
  }

  public Add(key: TKey, value: TValue): void {
    this.TryInsert(key, value, InsertionBehavior.ThrowOnExisting)
  }

  public Set(key: TKey, value: TValue): void {
    this.TryInsert(key, value, InsertionBehavior.OverwriteExisting)
  }

  public Get(key: TKey): TValue {
    let i = this.FindEntry(key)
    if (i >= 0) {
      let entries = this.entries
      return entries[i].value
    }
    throw new KeyNotFoundException()
  }

  public ContainsKey(key: TKey): boolean {
    return this.FindEntry(key) >= 0
  }

  public Clear(): void {
    if (this.count > 0) {
      let buckets = this.buckets
      let entries = this.entries
      for (let i = 0; i < buckets.length; i++) {
        buckets[i] = -1
      }
      for (let i = 0; i < entries.length; i++) {
        entries[i] = new Entry()
      }
      this.freeList = -1
      this.count = 0
      this.freeCount = 0
      this.version++
    }
  }

  public Remove(key: TKey): boolean {
    utils.throws.ThrowIfNull('key', key)

    let buckets = this.buckets
    let entries = this.entries
    let comparer = this.comparer

    if (buckets) {
      let hashCode = comparer.GetHashCode(key) & 0x7fffffff
      let bucket = hashCode % buckets.length
      let last = -1
      for (let i = buckets[bucket]; i >= 0; last = i, i = entries[i].next) {
        if (
          entries[i].hashCode === hashCode &&
          comparer.Equals(entries[i].key, key)
        ) {
          if (last < 0) {
            buckets[bucket] = entries[i].next
          } else {
            entries[last].next = entries[i].next
          }
          entries[i].hashCode = -1
          entries[i].next = this.freeList
          entries[i].key = undefined
          entries[i].value = undefined
          this.freeList = i
          this.freeCount++
          this.version++
          return true
        }
      }
    }
    return false
  }

  public TryGetValue(key: TKey): [boolean, TValue] {
    let i = this.FindEntry(key)
    if (i >= 0) {
      let entries = this.entries
      let value = entries[i].value
      return [true, value]
    }
    return [false, undefined]
  }

  private FindEntry(key: TKey): number {
    utils.throws.ThrowIfNull('key', key)
    let buckets = this.buckets
    let entries = this.entries
    let comparer = this.comparer
    if (buckets) {
      let hashCode = comparer.GetHashCode(key) & 0x7fffffff
      for (
        let i = buckets[hashCode % buckets.length];
        i >= 0;
        i = entries[i].next
      ) {
        if (
          entries[i].hashCode === hashCode &&
          comparer.Equals(entries[i].key, key)
        ) {
          return i
        }
      }
    }
    return -1
  }

  private TryInsert(
    key: TKey,
    value: TValue,
    behavior: InsertionBehavior
  ): boolean {
    utils.throws.ThrowIfNull('key', key)
    if (!this.buckets) {
      this.Initialize(0)
    }
    let buckets = this.buckets
    let entries = this.entries
    let comparer = this.comparer
    let hashCode = comparer.GetHashCode(key) & 0x7fffffff
    let targetBucket = hashCode % this.buckets.length
    for (let i = buckets[targetBucket]; i >= 0; i = entries[i].next) {
      if (
        entries[i].hashCode === hashCode &&
        comparer.Equals(entries[i].key, key)
      ) {
        if (behavior === InsertionBehavior.ThrowOnExisting) {
          throw new ArgumentException('key', '已经存在相同的Key')
        }
        entries[i].value = value
        this.version++
        return true
      }
    }
    let index = 0
    if (this.freeCount > 0) {
      index = this.freeList
      this.freeList = entries[index].next
      this.freeCount--
    } else {
      if (this.count === entries.length) {
        this.Resize()
        entries = this.entries
        buckets = this.buckets
        targetBucket = hashCode % buckets.length
      }
      index = this.count
      this.count++
    }

    entries[index].hashCode = hashCode
    entries[index].next = buckets[targetBucket]
    entries[index].key = key
    entries[index].value = value
    buckets[targetBucket] = index
    this.version++
  }

  private Resize(): void {
    let newSize = HashHelpers.GetPrime(this.count * 2)
    let newBuckets = new Array()
    for (let i = 0; i < newSize; i++) {
      newBuckets[i] = -1
    }
    let newEntries = new Array<Entry<TKey, TValue>>()
    let entries = this.entries
    for (let i = 0; i < newSize; i++) {
      if (i < this.count) {
        newEntries[i] = entries[i]
      } else {
        newEntries[i] = new Entry()
      }
    }
    for (let i = 0; i < this.count; i++) {
      let bucket = newEntries[i].hashCode % newSize
      newEntries[i].next = newBuckets[bucket]
      newBuckets[bucket] = i
    }
    this.buckets = newBuckets
    this.entries = newEntries
  }

  public *[Symbol.iterator](): IterableIterator<KeyValuePair<TKey, TValue>> {
    if (this.entries) {
      for (let item of this.entries) {
        if (item.key !== undefined) {
          yield new KeyValuePair(item.key, item.value)
        }
      }
    }
  }

  public All(
    predicate: (item: KeyValuePair<TKey, TValue>) => boolean
  ): boolean {
    return Enumerable.All(this, predicate)
  }

  public Any(
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): boolean {
    return Enumerable.Any(this, predicate)
  }

  public AsEnumerable(): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.AsEnumerable(this)
  }

  public Average(
    selector?: (item: KeyValuePair<TKey, TValue>) => number
  ): number | null {
    return Enumerable.Average(this, selector)
  }

  public Concat(
    second: IEnumerable<KeyValuePair<TKey, TValue>>
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Concat(this, second)
  }

  public Contains(
    value: KeyValuePair<TKey, TValue>,
    comparer?: IEqualityComparer<KeyValuePair<TKey, TValue>>
  ): boolean {
    return Enumerable.Contains(this, value, comparer)
  }

  public Count(
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): number {
    if (predicate) {
      return Enumerable.Count(this, predicate)
    } else {
      return this.count - this.freeCount
    }
  }

  public DefaultIfEmpty(
    defaultValue?: IEnumerable<KeyValuePair<TKey, TValue>>
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.DefaultIfEmpty(this, defaultValue)
  }

  public Distinct(
    comparer?: IEqualityComparer<KeyValuePair<TKey, TValue>>
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Distinct(this, comparer)
  }

  public ElementAt(index: number): KeyValuePair<TKey, TValue> {
    return Enumerable.ElementAt(this, index)
  }

  public ElementAtOrDefault(
    defaultValue: KeyValuePair<TKey, TValue>,
    index: number
  ): KeyValuePair<TKey, TValue> {
    return Enumerable.ElementAtOrDefault(this, defaultValue, index)
  }

  public Except(
    second: IEnumerable<KeyValuePair<TKey, TValue>>,
    comparer?: IEqualityComparer<KeyValuePair<TKey, TValue>>
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Except(this, second, comparer)
  }

  public First(
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): KeyValuePair<TKey, TValue> {
    return Enumerable.First(this, predicate)
  }

  public FirstOrDefault(
    defaultValue: KeyValuePair<TKey, TValue>,
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): KeyValuePair<TKey, TValue> {
    return Enumerable.FirstOrDefault(this, defaultValue, predicate)
  }

  public GroupBy<TGroupKey, TElement = KeyValuePair<TKey, TValue>>(
    keySelector: (item: KeyValuePair<TKey, TValue>) => TGroupKey,
    elementSelector?: (item: KeyValuePair<TKey, TValue>) => TElement,
    comparer?: IEqualityComparer<TGroupKey>
  ): IEnumerable<IGrouping<TGroupKey, TElement>> {
    return Enumerable.GroupBy(this, keySelector, elementSelector, comparer)
  }

  public GroupJoin<
    TInner,
    TGroupKey,
    TResult = { Outer: KeyValuePair<TKey, TValue>; Inners: IEnumerable<TInner> }
  >(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: KeyValuePair<TKey, TValue>) => TGroupKey,
    innerKeySelector: (item: TInner) => TGroupKey,
    resultSelector?: (
      item: KeyValuePair<TKey, TValue>,
      inners: IEnumerable<TInner>
    ) => TResult,
    comparer?: IEqualityComparer<TGroupKey>
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
    second: IEnumerable<KeyValuePair<TKey, TValue>>,
    comparer?: IEqualityComparer<KeyValuePair<TKey, TValue>>
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Intersect(this, second, comparer)
  }

  public Join<
    TInner,
    TGroupKey,
    TResult = { Outer: KeyValuePair<TKey, TValue>; Inner: TInner }
  >(
    inner: IEnumerable<TInner>,
    outerKeySelector: (item: KeyValuePair<TKey, TValue>) => TGroupKey,
    innerKeySelector: (item: TInner) => TGroupKey,
    resultSelector?: (
      item: KeyValuePair<TKey, TValue>,
      inners: TInner
    ) => TResult,
    comparer?: IEqualityComparer<TGroupKey>
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

  public Last(
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): KeyValuePair<TKey, TValue> {
    return Enumerable.Last(this, predicate)
  }

  public LastOrDefault(
    defaultValue: KeyValuePair<TKey, TValue>,
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): KeyValuePair<TKey, TValue> {
    return Enumerable.LastOrDefault(this, defaultValue, predicate)
  }

  public Max(
    selector?: (item: KeyValuePair<TKey, TValue>) => number
  ): number | null {
    return Enumerable.Max(this, selector)
  }

  public Min(
    selector?: (item: KeyValuePair<TKey, TValue>) => number
  ): number | null {
    return Enumerable.Min(this, selector)
  }

  public Reverse(): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Reverse(this)
  }

  public Select<TResult>(
    selector: (item: KeyValuePair<TKey, TValue>, index?: number) => TResult
  ): IEnumerable<TResult> {
    return Enumerable.Select(this, selector)
  }

  public SelectMany<TCollection, TResult = TCollection>(
    collectionSelector: (
      item: KeyValuePair<TKey, TValue>,
      index?: number
    ) => IEnumerable<TCollection>,
    resultSelector?: (
      item: KeyValuePair<TKey, TValue>,
      collection: TCollection
    ) => TResult
  ): IEnumerable<TResult> {
    return Enumerable.SelectMany(this, collectionSelector, resultSelector)
  }

  public SequenceEqual(
    second: Iterable<KeyValuePair<TKey, TValue>>,
    comparer?: IEqualityComparer<KeyValuePair<TKey, TValue>>
  ): boolean {
    return Enumerable.SequenceEqual(this, second, comparer)
  }

  public Single(
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): KeyValuePair<TKey, TValue> {
    return Enumerable.Single(this, predicate)
  }

  public SingleOrDefault(
    defaultValue: KeyValuePair<TKey, TValue>,
    predicate?: (item: KeyValuePair<TKey, TValue>) => boolean
  ): KeyValuePair<TKey, TValue> {
    return Enumerable.SingleOrDefault(this, defaultValue, predicate)
  }

  public Skip(count: number): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Skip(this, count)
  }

  public SkipWhile(
    predicate: (item: KeyValuePair<TKey, TValue>, index?: number) => boolean
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.SkipWhile(this, predicate)
  }

  public Sum(
    selector?: (item: KeyValuePair<TKey, TValue>) => number
  ): number | null {
    return Enumerable.Sum(this, selector)
  }

  public Take(count: number): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Take(this, count)
  }

  public TakeWhile(
    predicate: (item: KeyValuePair<TKey, TValue>, index?: number) => boolean
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.TakeWhile(this, predicate)
  }

  public ToArray(): Array<KeyValuePair<TKey, TValue>> {
    return Enumerable.ToArray(this)
  }

  public ToList(): IList<KeyValuePair<TKey, TValue>> {
    return Enumerable.ToList(this)
  }

  public Where(
    predicate: (item: KeyValuePair<TKey, TValue>, index?: number) => boolean
  ): IEnumerable<KeyValuePair<TKey, TValue>> {
    return Enumerable.Where(this, predicate)
  }
}

class Entry<TKey, TValue> {
  public hashCode: number
  public next: number
  public key: TKey
  public value: TValue

  public constructor() {
    this.hashCode = 0
    this.next = -1
    this.key = undefined
    this.value = undefined
  }
}

enum InsertionBehavior {
  None = 0,
  OverwriteExisting = 1,
  ThrowOnExisting = 2
}

class HashHelpers {
  public static readonly HashPrime = 101

  public static IsPrime(candidate: number): boolean {
    if ((candidate & 1) !== 0) {
      let limit = parseInt(Math.sqrt(candidate).toFixed(0), 10)
      for (let divisor = 3; divisor <= limit; divisor += 2) {
        if (candidate % divisor === 0) {
          return false
        }
      }
      return true
    }
    return candidate === 2
  }

  public static GetPrime(min: number): number {
    for (let i = 0; i < PRIMES.length; i++) {
      let prime = PRIMES[i]
      if (prime >= min) {
        return prime
      }
    }
    for (let i = min | 1; i < 2147483647; i += 2) {
      if (HashHelpers.IsPrime(i) && (i - 1) % HashHelpers.HashPrime !== 0) {
        return i
      }
    }
    return min
  }
}

const PRIMES = [
  3,
  7,
  11,
  17,
  23,
  29,
  37,
  47,
  59,
  71,
  89,
  107,
  131,
  163,
  197,
  239,
  293,
  353,
  431,
  521,
  631,
  761,
  919,
  1103,
  1327,
  1597,
  1931,
  2333,
  2801,
  3371,
  4049,
  4861,
  5839,
  7013,
  8419,
  10103,
  12143,
  14591,
  17519,
  21023,
  25229,
  30293,
  36353,
  43627,
  52361,
  62851,
  75431,
  90523,
  108631,
  130363,
  156437,
  187751,
  225307,
  270371,
  324449,
  389357,
  467237,
  560689,
  672827,
  807403,
  968897,
  1162687,
  1395263,
  1674319,
  2009191,
  2411033,
  2893249,
  3471899,
  4166287,
  4999559,
  5999471,
  7199369
]

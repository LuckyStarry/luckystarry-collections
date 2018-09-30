import { IEnumerable } from './enumerable'
import { IEqualityComparer, EqualityComparer } from './equality-comparer'
import { ArgumentException, KeyNotFoundException } from './exceptions'
import { EnumerableImpl } from './enumerable-impl'
import * as utils from './utils'

export interface IDictionary<TKey, TValue> extends IEnumerable<[TKey, TValue]> {
  Add(key: TKey, value: TValue): void
  Clear(): void
  Set(key: TKey, value: TValue): void
  Get(key: TKey): TValue

  ContainsKey(key: TKey): boolean
  Remove(key: TKey): boolean
  TryGetValue(key: TKey): [boolean, TValue]
}

export class Dictionary<TKey, TValue> extends EnumerableImpl<[TKey, TValue]>
  implements IDictionary<TKey, TValue> {
  private freeList: number = -1
  private freeCount: number = 0
  private version: number = 0
  private count: number = 0
  private buckets: number[]
  private entries: Entry<TKey, TValue>[]
  private comparer: IEqualityComparer<TKey>

  public constructor(
    dictionary?: Iterable<[TKey, TValue]>,
    comparer?: IEqualityComparer<TKey>
  ) {
    super()
    this.comparer = comparer || EqualityComparer.Default()
    if (dictionary) {
      for (let [k, v] of dictionary) {
        this.Set(k, v)
      }
    }
  }

  private Initialize(capacity: number): number {
    let size = utils.HashHelpers.GetPrime(capacity)

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
    let newSize = utils.HashHelpers.GetPrime(this.count * 2)
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

  public *[Symbol.iterator](): IterableIterator<[TKey, TValue]> {
    let i = 0
    for (let item of this.entries) {
      if (i++ < this.count) {
        yield [item.key, item.value]
      }
    }
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

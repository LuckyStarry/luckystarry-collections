import { IEnumerable } from './enumerable'
import { ICollection } from './collection'
import { ArgumentOutOfRangeException } from './exceptions'

export interface IList<T> extends IEnumerable<T>, ICollection<T> {
  Set(index: number, item: T): void
  Get(index: number): T

  IndexOf(item: T): number
  Insert(index: number, item: T): void
  RemoveAt(index: number): void
}

export class List<T> implements IList<T> {
  private items: Array<T> = []

  public constructor(collection?: IEnumerable<T>) {
    this.AddRange(collection)
  }

  public get Count(): number {
    return this.items.length
  }

  public get IsReadOnly(): boolean {
    return false
  }

  public Set(index: number, item: T): void {
    if (index < 0 || index >= this.Count) {
      throw new ArgumentOutOfRangeException('index', index)
    }
    this.items[index] = item
  }

  public Get(index: number): T {
    if (index < 0 || index >= this.Count) {
      throw new ArgumentOutOfRangeException('index', index)
    }
    return this.items[index]
  }

  public Add(item: T): void {
    this.items.push(item)
  }

  public AddRange(collection: IEnumerable<T>) {
    if (collection) {
      for (let item of collection) {
        this.Add(item)
      }
    }
  }

  public Clear(): void {
    this.items = []
  }

  public Contains(item: T): boolean {
    return this.IndexOf(item) >= 0
  }

  public CopyTo(array: T[], arrayIndex: number): void {
    let i = 0
    for (let item of this) {
      array[i++ + arrayIndex] = item
    }
  }

  public IndexOf(item: T): number {
    return this.items.findIndex(x => x === item)
  }

  public Insert(index: number, item: T): void {
    if (index < 0 || index >= this.Count) {
      throw new ArgumentOutOfRangeException('index', index)
    }
    this.items.splice(index, 0, item)
  }

  public Remove(item: T): boolean {
    let index = this.IndexOf(item)
    if (index >= 0) {
      this.RemoveAt(index)
      return true
    }
    return false
  }

  public RemoveAt(index: number): void {
    if (index < 0 || index >= this.Count) {
      throw new ArgumentOutOfRangeException('index', index)
    }
    this.items.splice(index, 1)
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    for (let item of this.items) {
      yield item
    }
  }
}

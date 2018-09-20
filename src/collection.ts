import { IEnumerable } from './enumerable'

export interface ICollection<T> extends IEnumerable<T> {
  readonly Count: number
  readonly IsReadOnly: boolean

  Add(item: T): void
  Clear(): void
  Contains(item: T): boolean
  CopyTo(array: Array<T>, arrayIndex: number): void
  Remove(item: T): boolean
}

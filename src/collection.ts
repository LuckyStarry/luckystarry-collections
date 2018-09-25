import { IEnumerable } from './enumerable'

export interface ICollection<T> extends IEnumerable<T> {
  readonly Length: number
  readonly IsReadOnly: boolean

  Add(item: T): void
  Clear(): void
  CopyTo(array: Array<T>, arrayIndex: number): void
  Remove(item: T): boolean
}

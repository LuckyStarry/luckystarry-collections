import { IEnumerable } from './enumerable'
import { IList } from './list'
import { IReadOnlyCollection, ReadOnlyCollection } from './read-only-collection'

export interface IReadOnlyList<T> extends IEnumerable<T>, IReadOnlyCollection<T> {}

export class ReadOnlyList<T> extends ReadOnlyCollection<T> {
  public constructor(list: IList<T>) {
    super(list)
  }
}

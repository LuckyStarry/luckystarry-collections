import { IEnumerable } from '../enumerable'
import { IList, List } from '../list'

export function toList<TSource>(source: IEnumerable<TSource>): IList<TSource> {
  return new List(source)
}

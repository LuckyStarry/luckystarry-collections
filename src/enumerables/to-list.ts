import { IList, List } from '../list'

export function toList<TSource>(source: Iterable<TSource>): IList<TSource> {
  return new List(source)
}

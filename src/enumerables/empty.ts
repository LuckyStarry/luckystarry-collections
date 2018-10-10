import { IEnumerable } from '../enumerable'

export function empty<TSource>(): IEnumerable<TSource> {
  return []
}

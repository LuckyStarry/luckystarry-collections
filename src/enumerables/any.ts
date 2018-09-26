import { IEnumerable } from '../enumerable'
import { throws } from '../utils'

export function any<TSource>(
  source: IEnumerable<TSource> | Iterable<TSource>,
  predicate?: (item: TSource) => boolean
): boolean {
  throws.ThrowIfNull('source', source)
  predicate = predicate || (() => true)
  for (let item of source) {
    if (predicate(item)) {
      return true
    }
  }
  return false
}

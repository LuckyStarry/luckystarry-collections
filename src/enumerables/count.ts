import { throws } from '../utils'

export function count<TSource>(source: Iterable<TSource>, predicate?: (item: TSource) => boolean): number {
  throws.ThrowIfNull('source', source)
  predicate = predicate || (() => true)
  let count = 0
  for (const item of source) {
    if (predicate(item)) {
      count++
    }
  }
  return count
}

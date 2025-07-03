import { throws } from '../utils'

export function any<TSource>(source: Iterable<TSource>, predicate?: (item: TSource) => boolean): boolean {
  throws.ThrowIfNull('source', source)
  predicate = predicate || (() => true)
  for (const item of source) {
    if (predicate(item)) {
      return true
    }
  }
  return false
}

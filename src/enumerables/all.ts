import { Enumerable } from '../enumerable'
import { throws } from '../utils'

export function all<TSource>(
  source: Iterable<TSource>,
  predicate: (item: TSource) => boolean
): boolean {
  throws.ThrowIfNull('source', source)
  throws.ThrowIfNull('predicate', predicate)

  for (let item of source) {
    if (!predicate(item)) {
      return false
    }
  }
  return Enumerable.Any(source)
}

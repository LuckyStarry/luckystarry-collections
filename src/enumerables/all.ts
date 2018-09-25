import { IEnumerable, Enumerable } from '../enumerable'
import { throws } from '../utils'

export function all<TSource>(
  source: IEnumerable<TSource>,
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

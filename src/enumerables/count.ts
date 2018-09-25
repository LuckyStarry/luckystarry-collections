import { IEnumerable } from '../enumerable'
import { throws } from '../utils'

export function count<TSource>(
  source: IEnumerable<TSource>,
  predicate?: (item: TSource) => boolean
): number {
  throws.ThrowIfNull('source', source)
  predicate = predicate || (() => true)
  let count = 0
  for (let item of source) {
    if (predicate(item)) {
      count++
    }
  }
  return count
}

import { IEnumerable } from '../enumerable'
import * as utils from '../utils'

export function firstOrDefault<TSource>(
  source: IEnumerable<TSource>,
  defaultValue: TSource,
  predicate?: (item: TSource) => boolean
): TSource {
  utils.throws.ThrowIfNull('source', source)
  for (let item of source) {
    if (predicate) {
      if (predicate(item)) {
        return item
      } else {
        return item
      }
    }
  }
  return defaultValue
}

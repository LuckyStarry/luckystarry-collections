import * as utils from '../utils'

export function firstOrDefault<TSource>(source: Iterable<TSource>, defaultValue: TSource, predicate?: (item: TSource) => boolean): TSource {
  utils.throws.ThrowIfNull('source', source)
  for (const item of source) {
    if (predicate) {
      if (predicate(item)) {
        return item
      }
      continue
    }
    return item
  }
  return defaultValue
}

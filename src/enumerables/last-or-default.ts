import * as utils from '../utils'

export function lastOrDefault<TSource>(source: Iterable<TSource>, defaultValue: TSource, predicate?: (item: TSource) => boolean): TSource {
  utils.throws.ThrowIfNull('source', source)
  let found = false
  let target: TSource
  for (let item of source) {
    if (predicate) {
      if (predicate(item)) {
        target = item
        found = true
      }
    } else {
      target = item
      found = true
    }
  }
  if (found) {
    return target
  }
  return defaultValue
}

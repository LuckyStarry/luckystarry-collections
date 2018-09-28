import * as utils from '../utils'

export function last<TSource>(
  source: Iterable<TSource>,
  predicate?: (item: TSource) => boolean
): TSource {
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
  if (predicate) {
    utils.throws.ThrowInvalidOperation('没有元素满足条件或源序列为空')
  } else {
    utils.throws.ThrowInvalidOperation('源序列为空')
  }
}

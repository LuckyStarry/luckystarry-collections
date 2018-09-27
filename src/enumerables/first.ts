import * as utils from '../utils'

export function first<TSource>(
  source: Iterable<TSource>,
  predicate?: (item: TSource) => boolean
): TSource {
  utils.throws.ThrowIfNull('source', source)
  for (let item of source) {
    if (predicate) {
      if (predicate(item)) {
        return item
      }
      continue
    }
    return item
  }
  if (predicate) {
    utils.throws.ThrowInvalidOperation('没有元素满足条件或源序列为空')
  } else {
    utils.throws.ThrowInvalidOperation('源序列为空')
  }
}

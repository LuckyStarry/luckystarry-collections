import * as utils from '../utils'

export function single<TSource>(
  source: Iterable<TSource>,
  predicate?: (item: TSource) => boolean
): TSource {
  utils.throws.ThrowIfNull('source', source)
  let found = false
  let target: TSource
  for (let item of source) {
    if (predicate) {
      if (predicate(item)) {
        if (found) {
          utils.throws.ThrowInvalidOperation('输入的序列包含多个元素')
        }
        target = item
        found = true
      }
    } else {
      if (found) {
        utils.throws.ThrowInvalidOperation('输入的序列包含多个元素')
      }
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

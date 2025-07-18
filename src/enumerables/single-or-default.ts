import * as utils from '../utils'
import { I18n } from '../i18n'

export function singleOrDefault<TSource>(source: Iterable<TSource>, defaultValue: TSource, predicate?: (item: TSource) => boolean): TSource {
  utils.throws.ThrowIfNull('source', source)
  let found = false
  let target: TSource
  for (const item of source) {
    if (predicate) {
      if (predicate(item)) {
        if (found) {
          throw utils.throws.ThrowInvalidOperation(I18n.t('errors.array.multiple_elements'))
        }
        target = item
        found = true
      }
    } else {
      if (found) {
        throw utils.throws.ThrowInvalidOperation(I18n.t('errors.array.multiple_elements'))
      }
      target = item
      found = true
    }
  }
  if (found) {
    return target
  }
  return defaultValue
}

import * as utils from '../utils'
import { I18n } from '../i18n'

export function first<TSource>(source: Iterable<TSource>, predicate?: (item: TSource) => boolean): TSource {
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
    throw utils.throws.ThrowInvalidOperation(I18n.t('errors.array.no_match'))
  } else {
    throw utils.throws.ThrowInvalidOperation(I18n.t('errors.array.empty'))
  }
}

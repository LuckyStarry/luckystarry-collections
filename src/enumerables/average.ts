import { Enumerable } from '../enumerable'
import { ArgumentNullException } from '../exceptions'
import { IsNullOrUndefined, throws } from '../utils'
import { I18n } from '../i18n'

export function average<TSource>(source: Iterable<TSource>, selector?: (item: TSource) => number): number | null {
  throws.ThrowIfNull('source', source)
  if (!Enumerable.Any(source)) {
    return null
  }
  selector =
    selector ||
    ((x) => {
      if (IsNullOrUndefined(x)) {
        return null
      }
      if (typeof x === 'number') {
        return x
      } else {
        throw new ArgumentNullException('selector', I18n.t('errors.array.selector_required'))
      }
    })
  let sum = 0
  let count = 0
  let allNull = true
  for (const item of source) {
    const value = selector(item)
    if (!IsNullOrUndefined(value)) {
      allNull = false
      sum += value
    }
    count++
  }
  if (allNull) {
    return null
  }
  return sum / count
}

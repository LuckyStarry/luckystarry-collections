import { ArgumentNullException } from '../exceptions'
import * as utils from '../utils'
import { I18n } from '../i18n'

export function sum<TSource>(source: Iterable<TSource>, selector?: (item: TSource) => number): number | null {
  utils.throws.ThrowIfNull('source', source)
  selector =
    selector ||
    ((x) => {
      if (utils.IsNullOrUndefined(x)) {
        return null
      }
      if (typeof x === 'number') {
        return x
      } else {
        throw new ArgumentNullException('selector', I18n.t('errors.array.selector_required'))
      }
    })
  let sum = 0
  let allNull = true
  for (let item of source) {
    let value = selector(item)
    if (!utils.IsNullOrUndefined(value)) {
      allNull = false
      sum += value
    }
  }
  if (allNull) {
    return null
  }
  return sum
}

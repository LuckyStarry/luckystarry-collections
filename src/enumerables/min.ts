import { ArgumentNullException } from '../exceptions'
import * as utils from '../utils'
import { I18n } from '../i18n'

export function min<TSource>(source: Iterable<TSource>, selector?: (item: TSource) => number): number | null {
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
  let found = false
  let target: number
  for (let item of source) {
    let value = selector(item)
    if (!utils.IsNullOrUndefined(value)) {
      if (!found) {
        target = value
        found = true
      } else {
        if (value < target) {
          target = value
        }
      }
    }
  }
  if (found) {
    return target
  }
  return null
}

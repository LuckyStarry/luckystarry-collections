import { ArgumentNullException } from '../exceptions'
import * as utils from '../utils'

export function max<TSource>(
  source: Iterable<TSource>,
  selector?: (item: TSource) => number
): number | null {
  utils.throws.ThrowIfNull('source', source)
  selector =
    selector ||
    (x => {
      if (utils.IsNullOrUndefined(x)) {
        return null
      }
      if (typeof x === 'number') {
        return x
      } else {
        throw new ArgumentNullException(
          'selector',
          '数值类型以外的数组必须传入 selector'
        )
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
        if (value > target) {
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

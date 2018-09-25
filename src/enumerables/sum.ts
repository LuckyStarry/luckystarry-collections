import { IEnumerable } from '../enumerable'
import { ArgumentNullException } from '../exceptions'
import * as utils from '../utils'

export function sum<TSource>(
  source: IEnumerable<TSource>,
  selector?: (item: TSource) => number
): number | null {
  utils.throws.ThrowIfNull('source', source)
  selector =
    selector ||
    (x => {
      if (typeof x === 'number') {
        return x
      } else {
        throw new ArgumentNullException(
          'selector',
          '数值类型以外的数组必须传入 selector'
        )
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

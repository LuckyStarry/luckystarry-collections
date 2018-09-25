import { IEnumerable, Enumerable } from '../enumerable'
import { throws, IsNullOrUndefined } from '../utils'
import { ArgumentNullException } from '../exceptions'

export function average<TSource>(
  source: IEnumerable<TSource>,
  selector?: (item: TSource) => number
): number | null {
  throws.ThrowIfNull('source', source)
  if (!Enumerable.Any(source)) {
    return null
  }
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
  let count = 0
  let allNull = true
  for (let item of source) {
    let value = selector(item)
    if (!IsNullOrUndefined(value)) {
      allNull = false
      sum += value
    }
    count++
  }
  if (count) {
    if (allNull) {
      return null
    }
    return sum / count
  } else {
    return null
  }
}

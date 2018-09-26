import { ArgumentOutOfRangeException } from '../exceptions'
import * as utils from '../utils'

export function elementAt<TSource>(
  source: Iterable<TSource>,
  index: number
): TSource {
  utils.throws.ThrowIfNull('source', source)
  if (index < 0) {
    throw new ArgumentOutOfRangeException('index', index)
  }
  let i = 0
  for (let item of source) {
    if (i === index) {
      return item
    }
    i++
  }
  throw new ArgumentOutOfRangeException('index', index)
}

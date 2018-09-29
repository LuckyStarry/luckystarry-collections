import { IEnumerable } from '../enumerable'
import { InternalEnumerable } from './internal-enumerable'
import * as utils from '../utils'

export function take<TSource>(
  source: Iterable<TSource>,
  count: number
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  return new InternalEnumerable([...process(source, count)])
}

function* process<TSource>(
  source: Iterable<TSource>,
  count: number
): Iterable<TSource> {
  let i = 1
  for (let item of source) {
    if (i++ > count) {
      break
    }
    yield item
  }
}

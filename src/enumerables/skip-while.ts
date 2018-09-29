import { IEnumerable } from '../enumerable'
import { InternalEnumerable } from './internal-enumerable'
import * as utils from '../utils'

export function skipWhile<TSource>(
  source: Iterable<TSource>,
  predicate: (item: TSource, index?: number) => boolean
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('predicate', predicate)
  return new InternalEnumerable([...process(source, predicate)])
}

function* process<TSource>(
  source: Iterable<TSource>,
  predicate: (item: TSource, index?: number) => boolean
): Iterable<TSource> {
  let i = 0
  let skip = true
  for (let item of source) {
    if (skip) {
      if (predicate(item, i++)) {
        skip = false
      } else {
        continue
      }
    }
    yield item
  }
}

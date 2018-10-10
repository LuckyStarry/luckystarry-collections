import { IEnumerable, Enumerable } from '../enumerable'
import * as utils from '../utils'

export function skipWhile<TSource>(
  source: Iterable<TSource>,
  predicate: (item: TSource, index?: number) => boolean
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('predicate', predicate)
  return Enumerable.AsEnumerable(process(source, predicate))
}

function* process<TSource>(
  source: Iterable<TSource>,
  predicate: (item: TSource, index?: number) => boolean
): Iterable<TSource> {
  let i = 0
  let skip = false
  for (let item of source) {
    if (!skip) {
      if (predicate(item, i++)) {
        continue
      }
      skip = true
    }
    yield item
  }
}

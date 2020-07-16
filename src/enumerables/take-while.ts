import { Enumerable, IEnumerable } from '../enumerable'
import * as utils from '../utils'

export function takeWhile<TSource>(source: Iterable<TSource>, predicate: (item: TSource, index?: number) => boolean): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('predicate', predicate)
  return Enumerable.AsEnumerable(process(source, predicate))
}

function* process<TSource>(source: Iterable<TSource>, predicate: (item: TSource, index?: number) => boolean): Iterable<TSource> {
  let i = 0
  for (let item of source) {
    if (predicate(item, i++)) {
      yield item
    } else {
      break
    }
  }
}

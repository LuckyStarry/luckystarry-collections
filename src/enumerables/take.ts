import { Enumerable, IEnumerable } from '../enumerable'
import * as utils from '../utils'

export function take<TSource>(source: Iterable<TSource>, count: number): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  return Enumerable.AsEnumerable(process(source, count))
}

function* process<TSource>(source: Iterable<TSource>, count: number): Iterable<TSource> {
  let i = 1
  for (const item of source) {
    if (i++ > count) {
      break
    }
    yield item
  }
}

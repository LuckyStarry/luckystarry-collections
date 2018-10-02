import { IEnumerable } from '../enumerable'
import { EnumerableContainer } from './enumerable-container'
import * as utils from '../utils'

export function skip<TSource>(
  source: Iterable<TSource>,
  count: number
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  return new EnumerableContainer([...process(source, count)])
}

function* process<TSource>(
  source: Iterable<TSource>,
  count: number
): Iterable<TSource> {
  let i = 1
  for (let item of source) {
    if (i++ > count) {
      yield item
    }
  }
}

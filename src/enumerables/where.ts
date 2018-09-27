import { IEnumerable } from '../enumerable'
import { InternalEnumerable } from './internal-enumerable'
import * as utils from '../utils'

export function where<TSource>(
  source: IEnumerable<TSource>,
  predicate: (item: TSource, index?: number) => boolean
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  utils.throws.ThrowIfNull('predicate', predicate)
  return new InternalEnumerable([...filter(source, predicate)])
}

function* filter<TSource>(
  source: IEnumerable<TSource>,
  predicate: (item: TSource, index?: number) => boolean
): {
  [Symbol.iterator](): IterableIterator<TSource>
} {
  let index = 0
  for (let item of source) {
    if (predicate(item, index++)) {
      yield item
    }
  }
}

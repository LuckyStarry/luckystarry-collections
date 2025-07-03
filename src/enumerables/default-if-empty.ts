import { Enumerable, IEnumerable } from '../enumerable'
import * as utils from '../utils'

export function defaultIfEmpty<TSource>(source: Iterable<TSource>, defaultValue?: IEnumerable<TSource>): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  const list = [...source]
  if (list.length) {
    return list
  }
  return defaultValue || Enumerable.Empty<TSource>()
}

import { IEnumerable, Enumerable } from '../enumerable'
import * as utils from '../utils'

export function defaultIfEmpty<TSource>(
  source: Iterable<TSource>,
  defaultValue?: IEnumerable<TSource>
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  let list = [...source]
  if (list.length) {
    return list
  }
  return defaultValue || Enumerable.Empty<TSource>()
}

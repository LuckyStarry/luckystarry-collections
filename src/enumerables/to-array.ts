import * as utils from '../utils'
export function toArray<TSource>(source: Iterable<TSource>): Array<TSource> {
  utils.throws.ThrowIfNull('source', source)
  return [...source]
}

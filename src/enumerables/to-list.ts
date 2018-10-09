import { List } from '../list'
import * as utils from '../utils'

export function toList<TSource>(source: Iterable<TSource>): List<TSource> {
  utils.throws.ThrowIfNull('source', source)
  return new List(source)
}

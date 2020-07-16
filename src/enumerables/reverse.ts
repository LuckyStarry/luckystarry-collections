import { Enumerable, IEnumerable } from '../enumerable'
import { throws } from '../utils'

export function reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource> {
  throws.ThrowIfNull('source', source)
  return Enumerable.AsEnumerable([...source].reverse())
}

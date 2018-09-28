import { IEnumerable } from '../enumerable'
import { throws } from '../utils'
import { InternalEnumerable } from './internal-enumerable'

export function reverse<TSource>(
  source: Iterable<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('source', source)
  return new InternalEnumerable([...source].reverse())
}

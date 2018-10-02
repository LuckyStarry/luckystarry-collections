import { IEnumerable } from '../enumerable'
import { EnumerableContainer } from './enumerable-container'
import { throws } from '../utils'

export function reverse<TSource>(
  source: Iterable<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('source', source)
  return new EnumerableContainer([...source].reverse())
}

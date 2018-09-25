import { IEnumerable } from '../enumerable'
import { throws } from '../utils'
import { InternalEnumerable } from './internal-enumerable'

export function concat<TSource>(
  first: IEnumerable<TSource>,
  second: IEnumerable<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('first', first)
  throws.ThrowIfNull('second', second)
  return new InternalEnumerable(concat(first, second))
}

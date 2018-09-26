import { IEnumerable } from '../enumerable'
import { throws } from '../utils'
import { InternalEnumerable } from './internal-enumerable'
import * as assistance from './assistance'

export function concat<TSource>(
  first: Iterable<TSource>,
  second: Iterable<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('first', first)
  throws.ThrowIfNull('second', second)
  return new InternalEnumerable(assistance.concat(first, second))
}

import { IEnumerable } from '../enumerable'
import { throws } from '../utils'
import { InternalEnumerable } from './internal-enumerable'
import * as assistance from './assistance'

export function concat<TSource>(
  first: IEnumerable<TSource> | Iterable<TSource>,
  second: IEnumerable<TSource> | Iterable<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('first', first)
  throws.ThrowIfNull('second', second)
  return new InternalEnumerable(assistance.concat(first, second))
}

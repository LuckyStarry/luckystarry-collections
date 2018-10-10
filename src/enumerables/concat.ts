import { IEnumerable, Enumerable } from '../enumerable'
import { throws } from '../utils'
import * as assistance from './assistance'

export function concat<TSource>(
  first: Iterable<TSource>,
  second: Iterable<TSource>
): IEnumerable<TSource> {
  throws.ThrowIfNull('first', first)
  throws.ThrowIfNull('second', second)
  return Enumerable.AsEnumerable(assistance.concat(first, second))
}

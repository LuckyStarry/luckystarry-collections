import { IEnumerable } from '../enumerable'
import { InternalEnumerable } from './internal-enumerable'

export function empty<TSource>(): IEnumerable<TSource> {
  return new InternalEnumerable([])
}

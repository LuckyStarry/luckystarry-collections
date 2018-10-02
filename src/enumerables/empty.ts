import { IEnumerable } from '../enumerable'
import { EnumerableContainer } from './enumerable-container'

export function empty<TSource>(): IEnumerable<TSource> {
  return new EnumerableContainer([])
}

import { IEnumerable } from '../enumerable'

export function isEnumerable<TSource>(
  source: any
): source is IEnumerable<TSource> {
  return 'All' in source && 'Any' in source
}

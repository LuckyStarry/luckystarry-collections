import { IEnumerable } from '../enumerable'
import { isEnumerable } from './is-enumerable'
import { InternalEnumerable } from './internal-enumerable'

export function asEnumerable<TSource>(
  source: IEnumerable<TSource> | Iterable<TSource>
): IEnumerable<TSource> {
  if (isEnumerable(source)) {
    return source
  } else {
    return new InternalEnumerable(source)
  }
}

import { IEnumerable, Enumerable } from '../enumerable'
import { InternalEnumerable } from './internal-enumerable'
import { isEnumerable } from './is-enumerable'
import * as utils from '../utils'

export function defaultIfEmpty<TSource>(
  source: IEnumerable<TSource> | Iterable<TSource>,
  defaultValue?: IEnumerable<TSource>
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  if (Enumerable.Any(source)) {
    if (isEnumerable(source)) {
      return source
    } else {
      return new InternalEnumerable(source)
    }
  } else {
    return defaultValue || Enumerable.Empty<TSource>()
  }
}

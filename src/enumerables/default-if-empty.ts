import { IEnumerable, Enumerable } from '../enumerable'
import { isEnumerable } from './is-enumerable'
import * as utils from '../utils'

export function defaultIfEmpty<TSource>(
  source: Iterable<TSource>,
  defaultValue?: IEnumerable<TSource>
): IEnumerable<TSource> {
  utils.throws.ThrowIfNull('source', source)
  if (Enumerable.Any(source)) {
    if (isEnumerable<TSource>(source)) {
      return source
    }
    return Enumerable.AsEnumerable(source)
  } else {
    return defaultValue || Enumerable.Empty<TSource>()
  }
}

import { IEnumerable, Enumerable } from '../enumerable'
import { throws } from '../utils'

export function defaultIfEmpty<TSource>(
  source: IEnumerable<TSource>,
  defaultValue?: IEnumerable<TSource>
) {
  throws.ThrowIfNull('source', source)
  if (Enumerable.Any(source)) {
    return source
  } else {
    return defaultValue || Enumerable.Empty<TSource>()
  }
}

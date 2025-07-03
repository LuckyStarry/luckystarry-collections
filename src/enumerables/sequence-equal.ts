import { EqualityComparer, IEqualityComparer } from '../equality-comparer'
import * as utils from '../utils'

export function sequenceEqual<TSource>(first: Iterable<TSource>, second: Iterable<TSource>, comparer?: IEqualityComparer<TSource>): boolean {
  utils.throws.ThrowIfNull('first', first)
  utils.throws.ThrowIfNull('second', second)
  comparer = comparer || EqualityComparer.Default()
  const left = first[Symbol.iterator]()
  const right = second[Symbol.iterator]()
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const x = left.next()
    const y = right.next()
    if (x.done) {
      return y.done
    } else if (y.done) {
      return false
    }
    if (!comparer.Equals(x.value, y.value)) {
      return false
    }
  }
}

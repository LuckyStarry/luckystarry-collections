import { IEqualityComparer, EqualityComparer } from '../equality-comparer'
import * as utils from '../utils'

export function sequenceEqual<TSource>(
  first: Iterable<TSource>,
  second: Iterable<TSource>,
  comparer?: IEqualityComparer<TSource>
): boolean {
  utils.throws.ThrowIfNull('first', first)
  utils.throws.ThrowIfNull('second', second)
  comparer = comparer || EqualityComparer.Default()
  let left = first[Symbol.iterator]()
  let right = second[Symbol.iterator]()
  while (true) {
    let x = left.next()
    let y = right.next()
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

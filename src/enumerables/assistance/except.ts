import { contains } from './contains'

export function except<T>(
  first: {
    [Symbol.iterator](): IterableIterator<T>
  },
  second: {
    [Symbol.iterator](): IterableIterator<T>
  },
  compare?: (x: T, y: T) => boolean
): {
  [Symbol.iterator](): IterableIterator<T>
} {
  if (first && second) {
    compare = compare || ((x, y) => x === y)
    let [target, ...sub] = first
    if (contains(second, target, compare)) {
      return except(sub, second, compare)
    } else {
      return [target, ...except(sub, second, compare)]
    }
  }
  return first
}

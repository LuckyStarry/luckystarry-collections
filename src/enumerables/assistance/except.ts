import { contains } from './contains'

export function except<T>(
  first: Iterable<T>,
  second: Iterable<T>,
  compare?: (x: T, y: T) => boolean
): Iterable<T> {
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

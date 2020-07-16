import { contains } from './contains'

export function except<T>(first: Iterable<T>, second: Iterable<T>, compare?: (x: T, y: T) => boolean): Iterable<T> {
  if (first && second) {
    compare = compare || ((x, y) => x === y)
    return [...process(first, second, compare)]
  }
  return first
}

function* process<T>(first: Iterable<T>, second: Iterable<T>, compare: (x: T, y: T) => boolean): Iterable<T> {
  for (let item of first) {
    if (contains(second, item, compare)) {
      continue
    }
    yield item
  }
}

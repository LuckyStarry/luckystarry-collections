export function* concat<T>(
  first: {
    [Symbol.iterator](): IterableIterator<T>
  },
  second: {
    [Symbol.iterator](): IterableIterator<T>
  }
): {
  [Symbol.iterator](): IterableIterator<T>
} {
  for (let item of first) {
    yield item
  }
  for (let item of second) {
    yield item
  }
}
